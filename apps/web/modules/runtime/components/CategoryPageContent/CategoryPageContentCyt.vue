<template>
  <div class="max-w-screen-3xl mx-auto p-[20px] xl:pt-[40px] xl:pb-0">
    <div class="xl:flex xl:items-center xl:w-full">
      <h1 class="text-[18px] lg:text-[24px] xl:text-[30px] font-extrabold italic text-ellipsis whitespace-nowrap overflow-hidden text-center">{{ cleanCategoryName(title) }} ({{ totalProducts }})</h1>
      <span class="hidden xl:flex xl:ml-auto grow xl:justify-end">
        <slot name="sorting" />
      </span>
    </div>
    <NavChildren />
  </div>

  <div class="max-w-screen-3xl mx-auto px-[20px]">
    <div class="xl:hidden">
      <slot name="sorting" />
    </div>

    <div :class="['pt-[30px] xl:pt-[40px] xl:grid xl:grid-cols-[250px_1fr] 2xl:grid-cols-[365px_1fr] xl:gap-[20px] 2xl:gap-[40px]', isSearch ? 'xl:!grid-cols-1' : '']">
      <div v-if="!isSearch" class="hidden xl:block xl:bg-[#F7F7F7] xl:rounded-[10px]">
        <NavChildrenLeft />
      </div>
      <section
        v-if="products?.length"
        :class="['grid grid-cols-1 2xs:grid-cols-2 gap-[10px] sm:gap-[20px] sm:gap-y-[40px] md:grid-cols-2 lg:grid-cols-3', isSearch ? 'xl:grid-cols-4' : '']"
        data-testid="category-grid"
      >
        <NuxtLazyHydrate
          v-for="(product, index) in products"
          :key="productGetters.getVariationId(product)"
          when-visible
        >
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
            :priority="index < 5"
            :base-price="productGetters.getDefaultBasePrice(product)"
            :unit-content="productGetters.getUnitContent(product)"
            :unit-name="productGetters.getUnitName(product)"
            :show-base-price="productGetters.showPricePerUnit(product)"
          />
        </NuxtLazyHydrate>
      </section>
      <LazyCategoryEmptyState v-else />
    </div>
    <UiPagination
      v-if="totalProducts > 0"
      :class="{'!pl-0': isSearch}"
      :key="`${totalProducts}-${itemsPerPage}`"
      :current-page="getFacetsFromURL().page ?? 1"
      :total-items="totalProducts"
      :page-size="itemsPerPage"
      :max-visible-pages="maxVisiblePages"
    />
    <div v-if="getFacetsFromURL().page === 1 && productsCatalog?.category?.details?.[0]?.description != ''"
      v-html="productsCatalog?.category?.details?.[0]?.description"
      class="pt-[40px] lg:pt-[80px] xl:pt-[100px] text-center leading-[1.35] max-w-[750px] mx-auto"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { productGetters, productImageGetters, facetGetters } from '@plentymarkets/shop-api';
import { useDisclosure } from '@storefront-ui/vue';
import { y } from 'happy-dom/lib/PropertySymbol';
import type { CategoryPageContentProps } from '~/components/CategoryPageContent/types';
import Breadcrumbs from '~/components/ui/Breadcrumbs/Breadcrumbs.vue';

const isSearch = defineModel<boolean>('isSearch', { default: false });

const { data: productsCatalog } = useProducts();
const { title, totalProducts, itemsPerPage = 24, products = [] } = defineProps<CategoryPageContentProps>();

const { getFacetsFromURL } = useCategoryFilter();
const { addModernImageExtension } = useModernImage();

const { showNetPrices } = useCart();

const { isOpen, open, close } = useDisclosure();
const viewport = useViewport();

const maxVisiblePages = computed(() => (viewport.isGreaterOrEquals('lg') ? 5 : 2));

if (viewport.isLessThan('md')) close();

// Helper function to clean category names
const cleanCategoryName = (name: string) => {
  return name.replace(' - ', '-');
};
</script>
