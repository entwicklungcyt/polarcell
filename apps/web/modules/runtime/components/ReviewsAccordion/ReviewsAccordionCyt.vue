<template>
  <div ref="reviewArea" class="relative col-span-5 h-fit" :class="{ 'pointer-events-none opacity-50': loadingReviews }">
    <SfLoaderCircular v-if="loadingReviews" class="absolute top-[130px] right-0 left-0 m-auto z-[999]" size="2xl" />

    <div id="customerReviewsAccordion" data-testid="reviews-accordion">
      <p id="customerReviewsClick" class="pb-[20px] lg:pb-[40px] font-extrabold italic text-[18px] xl:text-[24px] 2xl:text-[30px] text-center">
        {{ t('product.customerReviews') }}
      </p>

      <UiReviewStatistics v-if="product" :product="product" />

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[20px] pt-[30px] xl:pt-[50px] 4xl:pt-[60px] empty:hidden">
        <UiReview v-for="(reviewItem, key) in paginatedProductReviews" :key="key" :review-item="reviewItem" />
      </div>

      <UiPagination
        v-if="paginatedProductReviews.length > 0 && pagination.lastPage > 1"
        :key="pagination.totalCount"
        :current-page="currentPage"
        :total-items="pagination.totalCount"
        :page-size="config.defaultItemsPerPage"
        :max-visible-pages="maxVisiblePages"
        current-page-name="feedbackPage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { productGetters, reviewGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular } from '@storefront-ui/vue';
import type { ProductAccordionPropsType } from '~/components/ReviewsAccordion/types';

const props = defineProps<ProductAccordionPropsType>();
const { currentProduct } = useProducts();

const viewport = useViewport();
const reviewsOpen = ref(true);
const route = useRoute();

const config = useRuntimeConfig().public;

const product = computed(() => props.product || currentProduct.value);
const productId = computed(() => {
  const id = productGetters.getItemId(product.value);
  return id ? Number(id) : 0;
});
const productVariationId = computed(() => productGetters.getVariationId(product.value));

const {
  data: productReviews,
  authenticatedData: productAuthenticatedReviews,
  loading: loadingReviews,
  fetchReviews,
  fetchAuthenticatedReviews,
  reviewArea,
} = useProductReviews(productId.value, productVariationId.value);

const paginatedProductReviews = computed(() => reviewGetters.getReviewItems(productReviews.value));
const pagination = computed(() => reviewGetters.getReviewPagination(productReviews.value));
const currentPage = computed(() => reviewGetters.getCurrentReviewsPage(productReviews.value));

const maxVisiblePages = computed(() => (viewport.isGreaterOrEquals('lg') ? 6 : 4));

watch(
  () => reviewsOpen.value,
  (value) => {
    if (value) fetchReviews();
  },
);

watch(
  () => route.query.feedbackPage,
  async () => {
    if (reviewArea.value) reviewArea.value.scrollIntoView({ behavior: 'smooth' });
  },
);

watch(
  () => route.query,
  () => fetchReviews(),
);
</script>
