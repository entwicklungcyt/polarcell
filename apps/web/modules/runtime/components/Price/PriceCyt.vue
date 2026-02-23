<template>
  <div class="flex gap-[10px] align-baseline text-[24px] xl:text-[30px] leading-[1] xl:pt-[50px] [*[aria-label='quick-checkout-modal']_&]:hidden">
    <span v-if="crossedPrice && differentPrices" class="line-through">
      {{ format(crossedPrice) }}
    </span>
    <span :class="crossedPrice && differentPrices ? 'text-primary-500' : ''" data-testid="price">
      <span class="font-extrabold">{{ format(price) }}</span>
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