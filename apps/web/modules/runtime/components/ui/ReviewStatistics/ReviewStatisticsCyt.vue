<template>
  <div class="flex flex-col lg:max-w-[calc(50%-10px)] xl:max-w-[calc(33%-10px)]" :class="{ '!max-w-full': !totalReviews }" data-testid="average-section">
      <div v-if="totalReviews > 0" class="flex gap-[10px] items-center justify-center lg:justify-start pb-[15px] text-[12px] lg:text-[14px]">
        <div class="flex gap-[2px] xl:gap-[3px] text-[#FCC72F]">
          <svg v-for="star in 5" :key="star" class="w-[15px] h-[15px] xl:w-[20px] xl:h-[20px]" viewBox="0 0 24 24">
            <defs>
              <linearGradient :id="`star-${star}`">
                <stop offset="50%" stop-color="currentColor"/>
                <stop offset="50%" stop-color="transparent"/>
              </linearGradient>
            </defs>
            <path 
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              :fill="star <= (reviewAverageStars || reviewAverageText) ? 'currentColor' : (star - 0.5 <= (reviewAverageStars || reviewAverageText) ? `url(#star-${star})` : 'none')"
              :stroke="star <= (reviewAverageStars || reviewAverageText) || star - 0.5 <= (reviewAverageStars || reviewAverageText) ? 'currentColor' : '#E5E7EB'"
              stroke-width="1"
            />
          </svg>
        </div>
        <div class="whitespace-nowrap ml-auto sm:ml-0">{{ totalReviews + ' ' + (totalReviews === 1 ? t('Product.review') : t('Product.reviews')) }} ({{ t('Product.xOutOf5', { x: reviewAverageText }) }})</div>
      </div>
      <div class="flex flex-col items-center w-full gap-[3px]" :class="{ '': !totalReviews }">
        <div v-if="totalReviews > 0" v-for="(proportionalRating, key) in ratingPercentages" :key="key" class="grid grid-cols-[auto_auto_1fr_auto] gap-[5px] items-center w-full">
          <p class="tabular-nums font-semibold text-[14px]">{{ 5 - key }}</p>
          <SfIconStarFilled class="text-[#FCC72F] w-[18px] h-[18px]" size="base" />
          <SfProgressLinear
            class="self-center !bg-[#F8F8F8] !text-[#FCC72F] h-[12px] w-full"
            size="minimal"
            :value="proportionalRating"
            aria-label="proportional-rating-in-percent"
          />
          <p class="tabular-nums text-[14px]">({{ splitRatings[key] }})</p>
        </div>
        <div v-else class="text-center text-sm">{{ t('product.noReviews') }}</div>
        <p
          @click="openReviewModal(defaults.DEFAULT_REVIEW_MODAL_TYPES.createReview)"
          class="inline-block text-center text-sm underline block w-full pt-[10px] cursor-pointer font-medium"
          aria-label="Bewertung abgeben"
        >
          {{ t('product.createReview') }}
        </p>
      </div>
  </div>
</template>

<script setup lang="ts">
import { SfProgressLinear, SfIconStarFilled } from '@storefront-ui/vue';
import type { ReviewStatisticsProps } from './types';
import { productGetters, reviewGetters } from '@plentymarkets/shop-api';
import { defaults } from '~/composables';

const props = defineProps<ReviewStatisticsProps>();

const productId = Number(productGetters.getItemId(props.product));

const { data: productReviews, openReviewModal } = useProductReviews(productId);
const countsProductReviews = computed(() => reviewGetters.getReviewCounts(productReviews.value));

const reviewAverageText = computed(() => reviewGetters.getAverageRating(countsProductReviews.value, 'tenth'));
const reviewAverageStars = computed(() => reviewGetters.getAverageRating(countsProductReviews.value, 'half'));
const totalReviews = computed(() => reviewGetters.getTotalReviews(countsProductReviews.value));
const ratingPercentages = computed(() =>
  reviewGetters.getReviewCountsOrPercentagesByRatingDesc(countsProductReviews.value, true),
);
const splitRatings = computed(() => reviewGetters.getReviewCountsOrPercentagesByRatingDesc(countsProductReviews.value));
</script>
