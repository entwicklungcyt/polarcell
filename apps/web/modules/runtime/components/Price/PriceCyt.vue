<template>
  <div class="flex items-center gap-[10px] align-baseline text-[24px] xl:text-[30px] leading-[1] xl:pt-[50px] [*[aria-label='quick-checkout-modal']_&]:hidden">
    <span data-testid="price">
      <span class="font-extrabold">{{ format(price) }}</span>
    </span>
    <span v-if="crossedPrice && differentPrices" class="text-primary-500 font-bold line-through text-[14px] sm:text-[16px] xl:text-[18px]">
      {{ format(crossedPrice) }}
    </span>

    <span v-if="crossedPrice && differentPrices" class="flex items-center text-white bg-primary-500 text-[12px] sm:text-[14px] xl:text-[18px] px-[5px] xl:px-[10px] min-h-[20px] xl:min-h-[30px] rounded-[10px] xl:rounded-[15px] font-extrabold">
      -{{ savingPercentage(price, crossedPrice) }}%
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PriceProps } from '~/components/Price/types';

const props = defineProps<PriceProps>();

const { format } = usePriceFormatter();

const differentPrices = computed(() => {
  return props.crossedPrice
    ? Math.round(props.price * 100) / 100 !== Math.round(props.crossedPrice * 100) / 100
    : false;
});

const savingPercentage = (price: number, crossedPrice: number): number => {
  if (!crossedPrice || crossedPrice <= price) return 0;
  return Math.round((1 - price / crossedPrice) * 100);
};
</script>

<style>
  [aria-label='quick-checkout-modal'] {
    header {
      + div {
        > div:first-child {
          justify-content: center;

          * {
            display: none;
          }

          img,
          h1,
          > .flex.mb-1 {
            display: block;
            text-align: center;
          }
        }
      }
    }
  }
</style>