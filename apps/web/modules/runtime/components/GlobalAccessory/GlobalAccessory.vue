<template>
  <div v-if="!loading && product?.texts" class="max-w-[900px] mx-auto">
    <div class="pt-[30px] xl:pt-[50px] font-extrabold italic sm:text-[16px] xl:text-[18px]">
      Gleich mitbestellen
    </div>
    <div class="grid grid-cols-[100px_1fr] gap-[20px] pt-[15px] xl:pt-[20px]">
      <!-- Image -->
      <NuxtLink :to="productUrl" class="block aspect-square overflow-hidden bg-black/[0.03] rounded-[10px]">
        <img
          v-if="productImage"
          :src="productImage"
          :alt="productGetters.getName(product)"
          class="w-full h-full object-contain mix-blend-multiply rounded-[10px]"
          loading="lazy"
        />
      </NuxtLink>
      <!-- Content -->
      <div class="flex flex-col">
        <NuxtLink :to="productUrl" class="text-[14px] leading-tight line-clamp-2">
          {{ productGetters.getName(product) }}
        </NuxtLink>
        <div class="text-[14px] xl:text-[16px] font-extrabold">
          {{ n(productGetters.getPrice(product) || 0, 'currency') }}
        </div>
        <UiButton
          size="sm"
          class="bg-primary-500 !rounded-[15px] h-[30px] flex items-center uppercase !font-bold !text-[12px] hover:!bg-black !shadow-none mt-auto !self-start"
          :disabled="addingToCart || !productGetters.isSalable(product)"
          @click="handleAddToCart"
        >
          <template #prefix>
            <span v-if="!addingToCart" class="flex items-center gap-[6px]">
              <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><g transform="translate(0 0)"><path d="M19.487,2.639a2.4,2.4,0,0,0-1.9-.93H4.249A3.222,3.222,0,0,0,.6.1a.806.806,0,0,0,.4,1.561A1.612,1.612,0,0,1,2.969,2.821l1.8,7.121a4.018,4.018,0,0,0,3.9,3.053h6.043a4.018,4.018,0,0,0,3.9-3.053l1.305-5.228a2.4,2.4,0,0,0-.439-2.075" /><path d="M9.653,17.4a2.6,2.6,0,1,1-2.6-2.6,2.6,2.6,0,0,1,2.6,2.6" /><path d="M18.321,17.4a2.6,2.6,0,1,1-2.6-2.6,2.6,2.6,0,0,1,2.6,2.6" /></g></svg>
              <span>{{ t('common.actions.addToCart') }}</span>
            </span>
            <SfLoaderCircular v-else size="xs" />
          </template>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular } from '@storefront-ui/vue';

const props = defineProps<{
  itemId: number;
  variationId: number;
}>();

const { t, n } = useI18n();
const localePath = useLocalePath();
const { addToCart } = useCart();
const { openQuickCheckout } = useQuickCheckout();

const { data: product, fetchProduct, loading } = useProduct(`accessory-${props.variationId}`);

const addingToCart = ref(false);

await fetchProduct({
  id: props.itemId,
  variationId: props.variationId,
});

// Computed helpers
const productImage = computed(() => {
  const variation = product.value?.images?.variation ?? [];
  const all = product.value?.images?.all ?? [];
  const image = variation[0] || all[0];
  return image?.urlMiddle || image?.url || '';
});

const productUrl = computed(() => {
  if (!product.value) return '';
  const name = productGetters.getSlug?.(product.value) || productGetters.getName(product.value);
  return localePath(`/${name}_${props.itemId}_${props.variationId}`);
});

// Add to cart
const handleAddToCart = async () => {
  addingToCart.value = true;

  const added = await addToCart({
    productId: props.variationId,
    quantity: 1,
  });

  if (added) {
    openQuickCheckout(product.value, 1);
  }

  addingToCart.value = false;
};
</script>