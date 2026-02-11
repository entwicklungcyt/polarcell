<template>
  <div v-if="data && data.reviews" class="w-screen -mx-[50vw] relative left-1/2 bg-[#FFF5D3] mt-[40px] xl:mt-[80px] 2xl:mt-[100px]">
    <div class="max-w-screen-3xl mx-auto pt-[30px] pb-[40px] lg:py-[60px] xl:pb-[80px]">
      <div>
        <div class="grid grid-cols-[auto_100px] xl:grid-cols-[auto_140px] max-w-[480px] mx-auto px-[20px]">
          <div class="text-[14px] xl:text-[18px] my-auto">
            <div class="flex align-center gap-[10px]">
              <span class="font-extrabold text-[24px] xl:text-[30px]">{{ data?.rating365.toString().replace('.',',') }}</span>

              <div class="inline-flex align-center truncate self-center">
                <div class="flex gap-[0] text-[#FEBD18]">
                  <svg v-for="star in 5" :key="star" class="w-[20px] h-[20px] xl:w-[30px] xl:h-[30px]" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <clipPath :id="`half-clip-${star}`" clipPathUnits="objectBoundingBox">
                        <rect x="0" y="0" width="0.5" height="1" />
                      </clipPath>
                    </defs>
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      :fill="star - 0.5 <= data?.rating365 ? '#ddd' : '#ddd'"
                    />
                    <path
                      v-if="star - 0.5 <= data?.rating365"
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      fill="#FEBD18"
                      :clip-path="star <= data?.rating365 ? '' : `url(#half-clip-${star})`"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="pt-[10px]">{{ data.count365 }} {{ t('TrustedShops.Bewertung1') }}</div>
            <div class="font-extrabold">{{ data.overallCount }} {{ t('TrustedShops.Bewertung2') }}</div>
            <div class="text-[12px] xl:text-[14px] pt-[5px] font-normal">{{ t('TrustedShops.Stand') }} {{ formatDate(data.lastUpdated) }}</div>
          </div>
          <NuxtLink to="https://www.trustedshops.de/bewertung/info_X225BDEA0D9756BF24885264CC998C798.html" target="_blank" class="flex m-auto">
            <NuxtImg class="xl:w-[140px]" src="https://cdn02.plentymarkets.com/91tuepbzlonh/frontend/pwa/ts-badge.png" loading="lazy" />
          </NuxtLink>
        </div>
      </div>

      <div class="xl:min-w-0 pt-[30px] xl:pt-[60px] pl-[10px] sm:px-[20px] md:pr-0 lg:pr-[20px]">
        <div class="relative">
          <Swiper
            class="hover:cursor-grab active:cursor-grabbing"
            v-bind="swiperOptions"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <SwiperSlide v-for="(review, index) in data.reviews" :key="index">
              <div class="p-4 xl:p-6 flex flex-col gap-[10px] xl:gap-[15px] h-full w-full bg-white rounded-[5px] xl:rounded-[10px]">
                <div class="grid grid-cols-[auto_1fr] gap-[10px]">
                  <p class="flex flex-col text-left text-[14px] min-w-0 leading-[1.25] xl:leading-[1.35]">
                    <strong class="truncate">{{ review.name.trim() }}</strong>
                    <span>{{ formatDate(review.submittedAt) }}</span>
                  </p>
                  <div class="flex gap-[0] text-[#FEBD18] ml-auto">
                    <svg v-for="star in 5" :key="star" class="w-[15px] h-[15px] xl:w-[17px] xl:h-[17px] shrink-0" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient :id="`star-${star}`">
                          <stop offset="50%" stop-color="currentColor"/>
                          <stop offset="50%" stop-color="#fff"/>
                        </linearGradient>
                      </defs>
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor"
                        :fill="star <= review.rating ? 'currentColor' : (star - 0.5 <= review.rating ? `url(#star-${star})` : '#fff')"
                      />
                    </svg>
                  </div>
                </div>
                <p class="text-[14px] xl:text-[18px] leading-[1.35]">{{ viewport.isLessOrEquals('sm') ? truncateText(review.comment, 20) : truncateText(review.comment, 30) }}</p>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="w-full flex justify-center mt-[20px]">
            <div class="custom-pagination-ts !transform-none"></div>
          </div>
          <button @click="swiperInstance?.slidePrev()" :class="carouselArrowClasses + ' left-[-100px]'">
            <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
          </button>
          <button @click="swiperInstance?.slideNext()" :class="carouselArrowClasses + ' right-[-100px] rotate-180'">
            <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><use href="#svg_arrow" /></svg>
          </button>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
        <g id="svg_arrow" width="21.061" height="40.707" viewBox="0 0 21.061 40.707"><path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/></g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
:deep(.swiper-pagination-bullet-active) {
  background-color: #FEBD18;
}
</style>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';

const viewport = useViewport();

const swiperInstance = ref<SwiperType>();
const carouselArrowClasses = 'hidden 4xl:block absolute z-10 top-0 bottom-0 p-4 hover:scale-110 transition-transform duration-300';

interface Review {
  name: string;
  title: string;
  comment: string;
  rating: number;
  submittedAt: string;
}

interface RatingData {
  rating365: number;
  count365: number;
  overallCount: number;
  lastUpdated: string;
  reviews: Review[];
}

const data = ref<RatingData | null>(null)
const dataLoaded = ref(false)

const swiperOptions = {
  modules: [Autoplay, Pagination],
  slidesPerView: 1.5,
  spaceBetween: 10,
  loop: true,
  speed: 500,
  autoplay: {
    delay: 16000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  pagination: {
    el: '.custom-pagination-ts',
    clickable: true,
    dynamicBullets: true,  // Optional: nice for many slides
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 2.5,
      slidesPerGroup: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 20
    },
    1440: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 20
    }
  }
};

const currentSlide = ref(0);

// Methods
const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
};

const onSlideChange = (swiper: SwiperType) => {
  currentSlide.value = swiper.realIndex;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('de-DE', { 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const truncateText = (text: string, maxWords: number = 30): string => {
  const words = text.split(' ')
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '...'
}

onMounted(async () => {
  try {
    const response = await $fetch('https://entwicklungcyt.github.io/polarcell/trustedshops-data.json')
    data.value = response as RatingData
  } catch (error) {
    console.error('Failed to load ratings:', error)
  } finally {
    dataLoaded.value = true
  }
})

</script>