<template>
  <div v-if="loaded && products.length" class="flex flex-col gap-[20px] xl:gap-[40px] pt-[45px] xl:pt-[60px] 4xl:pt-[80px]">
    <p class="text-[18px] xl:text-[24px] 2xl:text-[30px] font-extrabold italic text-center">
      {{ t('Produktseite.Zuletzt angesehen') }}
    </p>

    <div class="
        flex gap-[10px] md:gap-[20px]
        sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 3xl:grid-cols-10
        ml-[-20px] mr-[-20px] pl-[10px] pr-[10px] sm:ml-0 sm:mr-0 sm:pl-0 sm:pr-0
        scroll-smooth overflow-x-scroll scrollbar-hidden
      ">
      <NuxtLink
        v-for="product in products"
        :key="product.variationId"
        :to="product.url"
        class="flex flex-col gap-[10px] min-w-[40%]"
      >
        <span class="relative h-0 pb-[100%] w-full bg-black/[0.03] rounded-[10px]">
            <img
              :src="product.image"
              :alt="product.name"
              class="absolute top-0 left-0 w-full h-full object-contain rounded-[8px] mix-blend-multiply"
              loading="lazy"
            />
        </span>

        <div class="flex flex-col gap-[2px] min-w-0 text-[14px]">
          <span class="leading-tight line-clamp-2">
            {{ product.name }}
          </span>
          <span class="font-extrabold">
            {{ n(product.price, 'currency') }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import { useLastSeen } from '../../composables/useLastSeen';

const props = defineProps<{
  excludeVariationId?: number;
}>();

const { t, n } = useI18n();
const localePath = useLocalePath();
const { getItems } = useLastSeen();

const loaded = ref(false);

interface ProductDisplay {
  variationId: number;
  name: string;
  price: number;
  image: string;
  url: string;
}

const products = ref<ProductDisplay[]>([]);
const MAX_ITEMS = 10;

onNuxtReady(() => {
  setTimeout(async () => {
    const items = getItems(props.excludeVariationId);

    if (!items.length) {
      loaded.value = true;
      return;
    }

    const sdk = useSdk();

    const results = await Promise.all(
      items.slice(0, MAX_ITEMS).map(async (item) => {
        try {
          const { data } = await sdk.plentysystems.getProduct({
            id: item.itemId,
            variationId: item.variationId,
          });

          if (data?.texts) {
            const variation = data?.images?.variation ?? [];
            const all = data?.images?.all ?? [];
            const img = variation[0] || all[0];
            const name = productGetters.getName(data) || '';

            const varId = productGetters.getVariationId(data);
            const basePath = `/${productGetters.getUrlPath(data)}_${productGetters.getItemId(data)}`;
            const shouldAppendVariation = varId && productGetters.getSalableVariationCount(data) === 1;
            const productUrl = localePath(shouldAppendVariation ? `${basePath}_${varId}` : basePath);

            return {
              variationId: item.variationId,
              name,
              price: productGetters.getPrice(data) || 0,
              image: img?.urlMiddle || img?.url || '',
              url: productUrl,
            } as ProductDisplay;
          }
        } catch (e) {
          console.warn(`[LastSeen] Failed to load variation ${item.variationId}`, e);
        }
        return null;
      })
    );

    products.value = results.filter((p): p is ProductDisplay => p !== null);
    loaded.value = true;
  }, 500);
});
</script>