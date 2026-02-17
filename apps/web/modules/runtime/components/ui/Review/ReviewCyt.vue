<template>
  <article class="w-full p-[20px] bg-[#F8F8F8] rounded-[10px] text-[14px] flex flex-col" data-testid="review-item">
    <header class="pb-[10px]">
      <p class="font-semibold" data-testid="review-item-title">{{ reviewGetters.getReviewTitle(reviewItem) }}</p>
    </header>

    <div class="flex items-center justify-between truncate pb-[10px]">
      <div class="flex gap-[0] text-[#FCC72F]">
        <svg v-for="star in 5" :key="star" class="w-[14px] h-[14px]" viewBox="0 0 24 24">
          <defs>
            <linearGradient :id="`star-${star}`">
              <stop offset="50%" stop-color="currentColor"/>
              <stop offset="50%" stop-color="#fff"/>
            </linearGradient>
          </defs>
          <path 
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor"
            :fill="star <= reviewGetters.getReviewRating(reviewItem) ? 'currentColor' : (star - 0.5 <= reviewGetters.getReviewRating(reviewItem) ? `url(#star-${star})` : '#fff')"
          />
        </svg>
      </div>

      <span v-if="verifiedPurchase" class="flex gap-[5px] items-center text-[#2AC678] text-[12px] font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10"><path d="M999.918,927.868l-4.963-5.173,1.558-1.623,3.405,3.55,6.479-6.754,1.558,1.623Z" transform="translate(-994.955 -917.868)" fill="#2ac678"/></svg>
        {{ t('review.verifiedPurchase') }}
      </span>
    </div>

    <p :class="{'opacity-0 !after:hidden !before:hidden !p-0' : reviewGetters.getReviewMessage(reviewItem).trim() === '' }" 
      class="relative m-0 bg-white border border-[#E5E5E5] px-[15px] py-[10px] rounded-[10px] flex-grow
    after:content-[''] after:absolute after:left-[21px] after:-bottom-[9px]
    after:border-[10px] after:border-transparent after:border-t-white
    before:content-[''] before:absolute before:left-[20px] before:-bottom-[11px]
    before:border-[11px] before:border-transparent before:border-t-[#E5E5E5] after:mb-[-10px] before:mb-[-10px]">{{ reviewGetters.getReviewMessage(reviewItem).trim().replace(/\?{4,}/g, '') }}</p>

    <div class="pt-[10px] flex space-x-1">
       <span class="flex gap-[5px] items-center font-semibold" data-testid="review-item-authorName">
        <svg xmlns="http://www.w3.org/2000/svg" width="13.999" height="14" viewBox="0 0 13.999 14"><g transform="translate(366.199 -200.73)"><path d="M-359.077,200.73a7.148,7.148,0,0,0-7.121,7,6.853,6.853,0,0,0,6.876,7,7.148,7.148,0,0,0,7.121-7A6.853,6.853,0,0,0-359.077,200.73Zm4.691,10.386a3.382,3.382,0,0,0-1.066-1.99,1.28,1.28,0,0,0-1.753-.036,3.412,3.412,0,0,1-2.029.63,3.321,3.321,0,0,1-2.008-.63,1.281,1.281,0,0,0-1.753.036,3.525,3.525,0,0,0-1.136,1.99c-1.206-1.2-1.853-4.634.349-7.267a6.073,6.073,0,0,1,4.688-2.164,5.852,5.852,0,0,1,4.613,2.164C-352.371,206.482-353.138,209.92-354.386,211.116Z"/><path d="M-359.054,203.015q-.032,0-.063,0t-.063,0A3.087,3.087,0,0,0-362.163,206a2.935,2.935,0,0,0,2.923,2.978h.038A3.062,3.062,0,0,0-356.175,206,2.958,2.958,0,0,0-359.054,203.015Z"/></g></svg>
        {{ reviewAuthor }}, </span>
       <span>{{ $d(new Date(reviewGetters.getReviewDate(reviewItem))) }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  SfRating,
  SfIconCheck,
  SfIconDelete,
  SfIconVisibility,
  SfIconVisibilityOff,
  SfTooltip,
  SfIconBase,
} from '@storefront-ui/vue';
import type { ReviewProps } from '~/components/ui/Review/types.ts';
import { type ReviewItem, reviewGetters, productGetters } from '@plentymarkets/shop-api';
import { defaults } from '~/composables';
import { penPath } from '~/assets/icons/paths/pen';

const props = defineProps<ReviewProps>();
const { reviewItem } = toRefs(props);
const isAnswerFormOpen = ref(false);
const isCollapsed = ref(true);

const { user, isAuthorized } = useCustomer();
const { currentProduct } = useProducts();
const { openReviewModal } = useProductReviews(Number(productGetters.getItemId(currentProduct.value)));

const reviewAuthor = computed(() => reviewGetters.getReviewAuthor(reviewItem.value) || t('review.anonymous'));
const replies = computed(() => reviewGetters.getReviewReplies(reviewItem.value));
const verifiedPurchase = reviewGetters.getVerifiedPurchase(reviewItem.value);
const isReviewVisibile = reviewGetters.getReviewVisibility(reviewItem.value);
const tooltipReviewLabel = isReviewVisibile ? t('review.tooltipVisibilityOn') : t('review.tooltipVisibilityOff');

const tooltipReplyLabel = (reply: ReviewItem) =>
  reviewGetters.getReviewVisibility(reply) ? t('review.tooltipVisibilityOn') : t('review.tooltipVisibilityOff');

const isAnswerEditable = (replyItem: ReviewItem) =>
  replyItem.sourceRelation?.[0]?.feedbackRelationSourceId === user.value?.id?.toString();

const isEditable = computed(
  () => reviewItem.value.sourceRelation?.[0]?.feedbackRelationSourceId === user.value?.id?.toString(),
);
</script>
