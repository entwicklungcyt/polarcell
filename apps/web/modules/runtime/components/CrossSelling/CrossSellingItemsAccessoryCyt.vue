<template>
  <div v-if="crossSellProducts.length > 0" class="max-w-[900px] mx-auto" id="cross-selling-accessory">
    <div class="pt-[30px] xl:pt-[50px] font-extrabold italic sm:text-[16px] xl:text-[18px]">
      Gleich mitbestellen
    </div>
    <div class="grid gap-[15px] xl:gap-[20px] pt-[15px] xl:pt-[20px]">
      <div
        v-for="crossSellProduct in crossSellProducts"
        :key="productGetters.getVariationId(crossSellProduct)"
        class="grid grid-cols-[100px_1fr] gap-[20px]"
      >
        <NuxtLink :to="getCrossSellingPath(crossSellProduct)" class="block aspect-square overflow-hidden bg-black/[0.03] rounded-[10px]">
          <img
            :src="getCrossSellingImage(crossSellProduct)"
            :alt="getCrossSellingAlt(crossSellProduct)"
            class="w-full h-full object-contain mix-blend-multiply rounded-[10px]"
            loading="lazy"
          />
        </NuxtLink>
        <!-- Content -->
        <div class="flex flex-col">
          <NuxtLink :to="getCrossSellingPath(crossSellProduct)" class="text-[14px] leading-tight line-clamp-2">
            {{ productGetters.getName(crossSellProduct) }}
          </NuxtLink>
          <div class="text-[14px] xl:text-[16px] font-extrabold">
            {{ n(productGetters.getPrice(crossSellProduct) || 0, 'currency') }}
          </div>
          <div :class="['text-[12px] xl:text-[12px] av' + productGetters.getAvailabilityId(crossSellProduct), productGetters.getAvailabilityId(crossSellProduct) == 1 ? 'text-[#46BB00]' : 'text-[black]']">
            {{ productGetters.getAvailabilityName(crossSellProduct) }}
          </div>
          <!-- in the template, pass crossSellProduct to the handler -->
          <UiButton
            size="sm"
            class="bg-primary-500 !rounded-[15px] h-[30px] flex items-center uppercase !font-bold !text-[12px] hover:!bg-black !shadow-none mt-auto !self-start mt-[5px]"
            :disabled="addingToCartId === productGetters.getVariationId(crossSellProduct) || !isCrossSellingProductSalable(crossSellProduct)"
            @click="handleAddToCart(crossSellProduct)"
          >
            <template #prefix>
              <span v-if="addingToCartId !== productGetters.getVariationId(crossSellProduct)" class="flex items-center gap-[6px]">
                <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><g transform="translate(0 0)"><path d="M19.487,2.639a2.4,2.4,0,0,0-1.9-.93H4.249A3.222,3.222,0,0,0,.6.1a.806.806,0,0,0,.4,1.561A1.612,1.612,0,0,1,2.969,2.821l1.8,7.121a4.018,4.018,0,0,0,3.9,3.053h6.043a4.018,4.018,0,0,0,3.9-3.053l1.305-5.228a2.4,2.4,0,0,0-.439-2.075" /><path d="M9.653,17.4a2.6,2.6,0,1,1-2.6-2.6,2.6,2.6,0,0,1,2.6,2.6" /><path d="M18.321,17.4a2.6,2.6,0,1,1-2.6-2.6,2.6,2.6,0,0,1,2.6,2.6" /></g></svg>
                <span>{{ t('common.actions.addToCart') }}</span>
              </span>
              <span v-else class="flex items-center">
                <SfLoaderCircular size="xs" />
              </span>
            </template>
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters, productImageGetters } from '@plentymarkets/shop-api';
import type { Product } from '@plentymarkets/shop-api';
import { SfLoaderCircular } from '@storefront-ui/vue';

const { t, n } = useI18n();
const route = useRoute();
const { productId } = createProductParams(route.params);
const { data: product } = useProduct(productId);
const { addModernImageExtension } = useModernImage();
const localePath = useLocalePath();
const { addToCart } = useCart();
const { openQuickCheckout } = useQuickCheckout();

const isGlobalProductCategoryTemplate = computed(() => {
  const slugParam = route.params.slug;
  if (!slugParam) return false;
  const slug = Array.isArray(slugParam) ? slugParam.join('/') : slugParam;
  return `/${slug}` === paths.globalItemCategory;
});

function getCrossSellingImage(item: Product): string {
  return addModernImageExtension(productGetters.getCoverImage(item));
}

function getCrossSellingAlt(item: Product): string {
  const firstImage = productImageGetters.getFirstImage(item);
  const name = productGetters.getName(item) ?? '';
  return productImageGetters.getImageAlternate(firstImage) || name;
}

function getCrossSellingPath(item: Product): string {
  if (isGlobalProductCategoryTemplate?.value) {
    return paths.globalItemDetails;
  }

  const variationId = productGetters.getVariationId(item);
  const basePath = `/${productGetters.getUrlPath(item)}_${productGetters.getItemId(item)}`;
  const shouldAppendVariation = variationId && productGetters.getSalableVariationCount(item) === 1;

  return localePath(shouldAppendVariation ? `${basePath}_${variationId}` : basePath);
}

function isCrossSellingProductSalable(item: Product): boolean {
  return (item as any).filter?.isSalable === true;
}

// Add to cart
const addingToCartId = ref<number | null>(null);

const handleAddToCart = async (item: Product) => {
  const variationId = productGetters.getVariationId(item);
  addingToCartId.value = variationId;

  const added = await addToCart({
    productId: variationId,
    quantity: 1,
  });

  if (added) {
    openQuickCheckout(item, 1);
  }

  addingToCartId.value = null;
};

const itemId = computed(() => productGetters.getItemId(product.value));

const { data: crossSellingData } = await useAsyncData(
  `cross-selling-accessory-${itemId.value}`,
  () => {
    if (!itemId.value) return Promise.resolve(null);
    return useSdk().plentysystems.getFacet({
      itemId: itemId.value,
      type: 'cross_selling',
      crossSellingRelation: 'Accessory',
    });
  },
  { watch: [itemId] }
);

const crossSellProducts = computed(() => crossSellingData.value?.data?.products ?? []);
</script>