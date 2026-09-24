<template>
  <div v-if="items && items.length > 1">
    <div class="max-w-screen-3xl mx-auto">
      <h2 class="pb-[20px] xl:pb-[40px] text-[18px] xl:text-[24px] 2xl:text-[30px] font-extrabold italic text-center">
        <span>
          {{ headline || 'Unsere Topseller' }}
        </span>
      </h2>
    </div>

    <div class="bg-white w-screen relative left-1/2 right-1/2 -mx-[50vw]">
      <div class="max-w-screen-3xl mx-auto px-[10px] sm:px-[20px] relative">
        <Swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :slides-per-view="2"
          :slides-per-group="2"
          :space-between="10"
          :autoplay="enableAutoplay && { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }"
          :loop="false"
          :speed="500"
          :navigation="{
            prevEl: '.swiper-button-prev-recommended',
            nextEl: '.swiper-button-next-recommended',
          }"
          :pagination="{
            el: '.swiper-pagination-recommended',
            clickable: true,
          }"
          :breakpoints="{
            800: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 20
            },
            1600: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 20
            },
          }"
          class="opacity-0 transition-opacity duration-300 3xl:overflow-hidden"
        >
          <SwiperSlide v-for="(product, index) in items" :key="index">
            <UiProductCard
                :index="index"
                :product="product"
                :name="productGetters.getName(product) ?? ''"
                :rating-count="productGetters.getTotalReviews(product)"
                :rating="productGetters.getAverageRating(product, 'half')"
                :image-url="addModernImageExtension(productGetters.getCoverImage(product))"
                :image-alt="
                    'alt-' + productImageGetters.getImageAlternate(productImageGetters.getFirstImage(product)) ||
                    productGetters.getName(product) ||
                    ''
                "
                :image-title="
                    productImageGetters.getImageName(productImageGetters.getFirstImage(product)) ||
                    productGetters.getName(product) ||
                    ''
                "
                :image-height="productGetters.getImageHeight(product) || 600"
                :image-width="productGetters.getImageWidth(product) || 600"
                :slug="productGetters.getSlug(product) + `-${productGetters.getId(product)}`"
                :base-price="productGetters.getDefaultBasePrice(product)"
                :unit-content="productGetters.getUnitContent(product)"
                :unit-name="productGetters.getUnitName(product)"
                :show-base-price="productGetters.showPricePerUnit(product)"
                :lazy="true"
                :priority="false"
            />
          </SwiperSlide>
        </Swiper>

        <!-- Custom arrows -->
        <button class="disabled:opacity-25 disabled:pointer-none hidden 4xl:block swiper-button-prev-recommended absolute z-10 top-1/2 -translate-y-1/2 p-4 hover:opacity-50 transition-opacity duration-300 left-0 4xl:left-[-80px] [@media(min-width:2000px)]:left-[-100px]">
          <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707">
            <use href="#svg_arrow" />
          </svg>
        </button>
        <button class="disabled:opacity-25 disabled:pointer-none hidden 4xl:block swiper-button-next-recommended absolute z-10 top-1/2 -translate-y-1/2 p-4 hover:opacity-50 transition-opacity duration-300 right-0 4xl:right-[-80px] [@media(min-width:2000px)]:right-[-100px] rotate-180">
          <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707">
            <use href="#svg_arrow" />
          </svg>
        </button>
      </div>
      
      <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
        <g id="svg_arrow" width="21.061" height="40.707" viewBox="0 0 21.061 40.707">
          <path d="M20.354,41.061,0,20.707,20.354.354l.707.707L1.414,20.707,21.061,40.354Z" transform="translate(0 -0.354)"/>
        </g>
      </svg>
    </div>

    <div class="flex items-center justify-center content-center gap-[20px] pt-[40px] 4xl:pt-[40px]">
      <button class="disabled:opacity-25 disabled:pointer-none hidden md:flex 4xl:hidden swiper-button-prev-recommended px-4 hover:opacity-50 transition-opacity duration-300 left-0 4xl:left-[-80px] [@media(min-width:2000px)]:left-[-100px]">
        <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707">
          <use href="#svg_arrow" />
        </svg>
      </button>
      <div class="swiper-pagination-recommended flex justify-center !gap-[10px] !w-auto"></div>
      <button class="disabled:opacity-25 disabled:pointer-none hidden md:flex 4xl:hidden swiper-button-next-recommended px-4 hover:opacity-50 transition-opacity duration-300 right-0 4xl:right-[-80px] [@media(min-width:2000px)]:right-[-100px] rotate-180">
        <svg width="21.061" height="40.707" viewBox="0 0 21.061 40.707">
          <use href="#svg_arrow" />
        </svg>
      </button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { productGetters, productImageGetters } from '@plentymarkets/shop-api';
  import type { ProductSliderProps } from '~/components/ProductSlider/types';

  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Navigation, Pagination, Autoplay } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';  

  const enableAutoplay = false;

  const { addModernImageExtension } = useModernImage();
  defineProps<ProductSliderProps & {
    headline?: string;
  }>();
</script>

<style>
.swiper.swiper-initialized {
  opacity: 1;
}

.swiper-slide {
  height: auto !important;
  display: flex;
}

.swiper-pagination-recommended .swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid black;
  opacity: 1;
  transition: all 500ms;
  margin: 0 !important;
}

.swiper-pagination-recommended .swiper-pagination-bullet:hover {
  border-color: #000;
}

.swiper-pagination-recommended .swiper-pagination-bullet-active {
  background: #000;
  border-color: #000;
}
</style>