<template>
  <div
    v-if="!loading && product?.texts"
    class="grid grid-cols-[100px_1fr] gap-[12px] pt-[50px]"
  >
    <!-- Image -->
    <NuxtLink :to="productUrl" class="block aspect-square overflow-hidden bg-[#F7F7F7]">
      <img
        v-if="productImage"
        :src="productImage"
        :alt="productGetters.getName(product)"
        class="w-full h-full object-contain"
        loading="lazy"
      />
    </NuxtLink>

    <!-- Content -->
    <div class="flex flex-col gap-[8px] p-[12px] xl:p-[16px]">
      <NuxtLink :to="productUrl" class="text-[14px] xl:text-[16px] font-bold leading-tight line-clamp-2 hover:underline">
        {{ productGetters.getName(product) }}
      </NuxtLink>

      <div class="text-[14px] xl:text-[16px] font-extrabold">
        {{ n(productGetters.getPrice(product) || 0, 'currency') }}
      </div>

      <UiButton
        size="sm"
        class="w-full bg-primary-500 !rounded-[22px] uppercase !font-bold text-[12px] xl:text-[14px] hover:!bg-black !shadow-none"
        :disabled="addingToCart || !productGetters.isSalable(product)"
        @click="handleAddToCart"
      >
        <template #prefix>
          <div v-if="!addingToCart" class="flex items-center gap-[6px]">
            <svg class="fill-white xl:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20">
              <g transform="translate(0 0)">
                <path d="M19.487,2.639a2.4,2.4,0,0,0-1.9-.93H4.249A3.222,3.222,0,0,0,.6.1a.806.806,0,0,0,.4,1.561A1.612,1.612,0,0,1,2.969,2.821l1.8,7.121a4.018,4.018,0,0,0,3.9,3.053h6.043a4.018,4.018,0,0,0,3.9-3.053l1.305-5.228a2.4,2.4,0,0,0-.439-2.075" />
                <path d="M9.653,17.4a2.6,2.6,0,1,1-2.6-2.6,2.6,2.6,0,0,1,2.6,2.6" />
                <path d="M18.321,17.4a2.6,2.6,0,1,1-2.6-2.6,2.6,2.6,0,0,1,2.6,2.6" />
              </g>
            </svg>
            {{ t('common.actions.addToCart') }}
          </div>
          <SfLoaderCircular v-else size="xs" />
        </template>
      </UiButton>
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
const { send } = useNotification();
const { openQuickCheckout } = useQuickCheckout();

const { data: product, fetchProduct, loading } = useProduct(`accessory-${props.itemId}-${props.variationId}`);

const addingToCart = ref(false);

// Fetch product on mount
await fetchProduct({
  id: props.itemId,
  variationId: props.variationId,
});

// Computed helpers
const productImage = computed(() => {
  const images = product.value?.images?.all ?? [];
  return images[0]?.urlMiddle || images[0]?.url || '';
});

const productUrl = computed(() => {
  if (!product.value) return '';
  const name = productGetters.getSlug(product.value) || productGetters.getName(product.value);
  const itemId = productGetters.getItemId(product.value);
  return localePath(`/${name}_${itemId}_${props.variationId}`);
});

// Add to cart
const handleAddToCart = async () => {
  addingToCart.value = true;

  const added = await addToCart({
    productId: Number(productGetters.getId(product.value)),
    quantity: 1,
  });

  if (added) {
    openQuickCheckout(product.value, 1);
  }

  addingToCart.value = false;
};
</script>