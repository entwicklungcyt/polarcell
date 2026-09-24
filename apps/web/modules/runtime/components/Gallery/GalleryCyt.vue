<template>
  <div :class="['max-w-[600px] mx-auto h-full flex scroll-smooth relative xl:gap-[20px] xl:max-w-[100%]', galleryDirClass, galleryGapClass]" data-testid="gallery">
    <div
      ref="mainBox"
      class="after:block after:pt-[100%] flex-1 relative overflow-hidden w-full relative sm:rounded-[10px]"
      data-testid="gallery-images"
    >
      <Swiper
        :modules="mainModules"
        :centered-slides="true"
        :space-between="20"
        :centered-slides-bounds="false"
        :slides-per-view="1"
        :loop="true"
        :keyboard="{ enabled: true }"
        :thumbs="{ swiper: thumbsSwiper || null }"
        class="!absolute top-0 left-0 w-full h-full bg-white rounded-[10px]"
        :class="{ 'cursor-grab': hasMoreImages }"
        @swiper="onMainInit"
        @slide-change="onMainSlideChange"
      >
        <SwiperSlide v-for="(image, index) in images" :key="`main-${index}`" class="flex items-center justify-center bg-black/[0.03]">
          <ZoomableImage
            :images="images"
            :image="image"
            :index="index"
            :class="'h-0 pb-[100%] relative [&_img]:mix-blend-multiply'"
            :active-index="activeIndex"
            :is-first-image="index === 0"
            :disable-zoom="($isPreview && disableActions) || configuration.thumbnails.enableHoverZoom === false"
          />
        </SwiperSlide>
        <template v-if="hasMoreImages">
          <button
            v-if="showNav && mainSwiper"
            :disabled="atStart"
            :class="prevThumbBtnClass"
            aria-label="Previous"
            @click="mainSwiper?.slidePrev()"
          >
            <SfIconChevronLeft class="w-[40px] h-[40px] group-hover:fill-primary-500" />
          </button>
          <button
            v-if="showNav && mainSwiper"
            :disabled="atEnd"
            :class="nextThumbBtnClass"
            aria-label="Next"
            @click="mainSwiper?.slideNext()"
          >
            <SfIconChevronRight class="w-[40px] h-[40px] group-hover:fill-primary-500" />
          </button>
        </template>
      </Swiper>
    </div>

    <div v-if="hasMoreImages" :class="['xl:relative', thumbContainerClass, isSide ? 'xl:self-stretch' : 'xl:w-full']">
      <div class="hidden xl:block xl:relative xl:h-full xl:overflow-hidden">
        <Swiper
          :modules="thumbsModules"
          :direction="thumbsDirection"
          :slides-per-view="thumbsSlidesPerView"
          :space-between="20"
          :free-mode="true"
          :watch-slides-progress="true"
          :centered-slides="false"
          :loop="false"
          :class="thumbsSwiperClass"
          :style="isSide ? { height: `${thumbsHeight}px` } : {}"
          @swiper="onThumbsInit"
        >
          <SwiperSlide
            v-for="(image, index) in images"
            :key="`thumb-${index}`"
            :class="[
              thumbSlideClass(index),
              'xl:h-0 xl:pb-[calc(100%/6-16.666667px)] relative',
              { 'cursor-grab': images.length > 6 },
            ]"
            @click="slideTo(index)"
            class="bg-black/[0.03] xl:rounded-[10px]"
          >
            <NuxtImg
              :alt="productImageGetters.getImageAlternate(image) || productImageGetters.getCleanImageName(image) || ''"
              :title="productImageGetters.getImageName(image) ? productImageGetters.getImageName(image) : null"
              class="h-full w-full object-contain xl:absolute xl:top-0 xl:left-0 xl:w-full xl:h-full xl:object-contain xl:rounded-[10px] text-white mix-blend-multiply"
              :class="activeIndex === index ? 'grayscale-0' : 'grayscale'"
              :width="productImageGetters.getImageWidth(image) ?? 80"
              :height="productImageGetters.getImageHeight(image) ?? 80"
              :src="productImageGetters.getImageUrlMiddle(image)"
              :quality="80"
              loading="lazy"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div v-if="hasMoreImages" class="w-screen -mx-[50vw] relative left-1/2 flex justify-center xl:hidden gap-[10px] pt-[15px] bg-white" v-bind="carouselProps">
        <button
          v-for="(image, index) in images"
          :key="productImageGetters.getImageUrl(image)"
          type="button"
          :aria-current="activeIndex === index"
          class="w-[10px] h-[10px] rounded-full border border-black"
          :class="[activeIndex === index ? 'bg-black' : 'bg-white']"
          @click="slideTo(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Thumbs, FreeMode, Keyboard, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { SfIconChevronLeft, SfIconChevronRight } from '@storefront-ui/vue';
import { productImageGetters } from '@plentymarkets/shop-api';
import type { GalleryProps } from '~/components/Gallery/types';

import { useCustomViewport } from '../../composables/viewportSingleton'
const customViewport = useCustomViewport()

const props = withDefaults(defineProps<GalleryProps>(), {
  configuration: () => ({
    thumbnails: {
      showThumbnails: true,
      thumbnailType: 'horizontal',
      enableHoverZoom: false,
    },
    layout: {
      fullWidth: false,
    },
  }),
});

const { $isPreview } = useNuxtApp();
const { disableActions } = useEditor();

const configuration = computed(() => props.configuration);
const { images } = toRefs(props);
const activeIndex = ref(0);

const viewport = useViewport();
const showNav = computed(() => !viewport.isLessThan('lg'));
// const showNav = true;

const type = computed(() => configuration.value.thumbnails.thumbnailType);
const isSide = computed(() => type.value === 'left-vertical' || type.value === 'right-vertical');
const isLeft = computed(() => type.value === 'left-vertical');

const galleryDirClass = computed(() => (isSide.value ? 'flex-col md:flex-row' : 'flex-col md:flex-col'));
const galleryGapClass = computed(() => (isSide.value ? 'md:gap-4' : 'md:gap-2'));
const thumbContainerClass = computed(() => [isLeft.value ? 'md:order-first' : 'md:order-last']);
const hasMoreImages = computed(() => images.value.length > 1);

const thumbsDirection = computed(() => (isSide.value ? 'vertical' : 'horizontal'));
const thumbsSlidesPerView = computed(() => 6);
const thumbsSwiperClass = computed(() =>
  isSide.value ? 'hidden md:block md:h-full md:w-[12rem]' : 'hidden md:block w-full',
);

const thumbSlideClass = (index: number) => {
  const baseClasses = 'flex items-center justify-center cursor-pointer snap-start';
  const stateClass = activeIndex.value === index ? 'opacity-100' : 'hover:opacity-100';

  return isSide.value ? `${baseClasses} ${stateClass}` : `${baseClasses} xl:max-w-[50%] xl:mr-[20px] ${stateClass}`;
};

const prevThumbBtnClass = computed(() =>
  [
    'hidden xl:flex items-center justify-center absolute z-[1] group disabled:opacity-0',
    isSide.value ? 'left-1/2 -translate-x-1/2 top-2 rotate-90' : 'left-0 top-0 bottom-0',
  ].join(' '),
);

const nextThumbBtnClass = computed(() =>
  [
    'hidden xl:flex items-center justify-center absolute z-[1] group disabled:opacity-0',
    isSide.value ? 'left-1/2 -translate-x-1/2 bottom-0 rotate-90' : 'right-0 top-0 bottom-0',
  ].join(' '),
);

const mainBox = ref<HTMLElement | null>(null);
const thumbsHeight = ref(0);
const mainSwiperRef = ref<SwiperType | null>(null);
const thumbsSwiperRef = ref<SwiperType | null>(null);

const mainSwiper = computed(() => mainSwiperRef.value);
const thumbsSwiper = computed(() => thumbsSwiperRef.value as SwiperType | null);

const mainModules = [Thumbs, Keyboard, A11y];
const thumbsModules = [FreeMode, Thumbs];

const onMainInit = (swiper: SwiperType) => {
  mainSwiperRef.value = swiper;
  activeIndex.value = swiper.realIndex ?? 0;
};

const onThumbsInit = (swiper: SwiperType) => {
  thumbsSwiperRef.value = swiper;
};

const onMainSlideChange = (swiper: SwiperType) => {
  activeIndex.value = swiper.realIndex ?? 0;
};

const slideTo = (index: number) => {
  activeIndex.value = index;
  if (mainSwiper.value?.params.loop) mainSwiper.value.slideToLoop(index);
  else mainSwiper.value?.slideTo(index);
  thumbsSwiperRef.value?.slideTo(index - 1);
};

const atStart = computed(() => activeIndex.value === 0);
const atEnd = computed(() => activeIndex.value === images.value.length - 1);

const carouselProps = computed(() => {
  return hasMoreImages.value ? { role: 'group' } : {};
});

onMounted(() => {
  if (!mainBox.value) return;
  const ro = new ResizeObserver(([entry]) => {
    if (!entry) return;
    const h = Math.floor(entry.contentRect.height);
    if (h && h !== thumbsHeight.value) thumbsHeight.value = h;
  });
  ro.observe(mainBox.value);
  onBeforeUnmount(() => ro.disconnect());
});
</script>


