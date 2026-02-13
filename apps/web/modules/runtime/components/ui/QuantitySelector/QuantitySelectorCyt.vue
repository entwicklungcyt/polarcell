<template>
  <div class="inline-flex flex-col items-center" data-testid="quantity-selector">
    <div class="grid grid-cols-[30px_auto_30px] xl:grid-cols-[45px_auto_45px] border-[2px] xl:border-[3px] border-black rounded-[22px] xl:rounded-[33px] h-[44px] xl:h-[60px] bg-white overflow-hidden">
      <SfTooltip
        v-if="count <= minValue"
        :label="t('product.minimumQuantity', { count: minValue })"
        placement="top"
        :show-arrow="true"
        class="flex items-center justify-center"
      >
        <UiButton
          variant="tertiary"
          :disabled="disabled || count <= minValue"
          square
          class="rounded-r-none h-[40px] xl:h-[54px] [&_svg]:fill-black hover:bg-transparent !p-0"
          :aria-controls="inputId"
          :aria-label="t('product.decreaseQuantity')"
          data-testid="quantity-selector-decrease-button"
          @click="dec()"
        >
          <svg class="xl:h-[3px] w-auto" xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2"><path d="M10,1H0V-1H10Z" transform="translate(0 1)"/></svg>
        </UiButton>
      </SfTooltip>
      <UiButton
        v-else
        variant="tertiary"
        :disabled="disabled || count <= minValue"
        square
        class="rounded-r-none h-[40px] xl:h-[54px] [&_svg]:fill-black hover:bg-transparent !p-0"
        :aria-controls="inputId"
        :aria-label="t('product.decreaseQuantity')"
        data-testid="quantity-selector-decrease-button"
        @click="dec()"
      >
        <svg class="xl:w-[13px] h-auto" xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2"><path d="M10,1H0V-1H10Z" transform="translate(0 1)"/></svg>
      </UiButton>
      <input
        :id="inputId"
        v-model="count"
        type="number"
        role="spinbutton"
        :class="inputClasses"
        :min="minValue"
        :max="maxValue"
        data-testid="quantity-selector-input"
        class="h-[40px] xl:h-[54px] max-w-[20px] !font-extrabold !text-[14px] xl:!text-[18px]"
        :aria-label="t('common.labels.quantitySelector')"
        :disabled="disabled"
        @input="handleOnChange"
      />
      <UiButton
        variant="tertiary"
        :disabled="disabled || count >= maxValue"
        square
        class="rounded-l-none h-[40px] xl:h-[54px] [&_svg]:fill-black hover:bg-transparent !p-0"
        :aria-controls="inputId"
        :aria-label="t('product.increaseQuantity')"
        data-testid="quantity-selector-increase-button"
        @click="inc()"
      >
        <svg class="xl:w-[13px] h-auto" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path d="M10,1H0V-1H10Z" transform="translate(0 5)"/><path d="M1,10H-1V0H1Z" transform="translate(5)"/></svg>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clamp } from '@storefront-ui/shared';
import { SfIconAdd, SfIconRemove, SfTooltip, useId } from '@storefront-ui/vue';
import { useCounter } from '@vueuse/core';
import type { QuantitySelectorProps } from '~/components/ui/QuantitySelector/types';

const emit = defineEmits(['changeQuantity']);

const {
  value = 1,
  minValue = 1,
  maxValue = Number.POSITIVE_INFINITY,
  disabled = false,
} = defineProps<QuantitySelectorProps>();

const inputId = ref('0');
const { count, inc, dec, set } = useCounter(value);

const inputClasses = computed(
  () =>
    'appearance-none flex-1 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm',
);

onMounted(() => (inputId.value = useId()));

watch(count, (quantity) => {
  if (quantity < minValue) {
    set(minValue);
  } else if (quantity > maxValue) {
    set(maxValue);
  }

  emit('changeQuantity', quantity);
});

const handleOnChange = (event: Event) => {
  const currentValue = (event.target as HTMLInputElement)?.value;
  const nextValue = Number.parseFloat(currentValue);
  set(clamp(nextValue, minValue, maxValue));
};

defineExpose({ handleOnChange });
</script>
