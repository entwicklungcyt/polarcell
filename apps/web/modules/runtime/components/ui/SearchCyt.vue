<template>
  <form ref="referenceRef" role="search"
    class="relative !pt-0 [&_span]:rounded-[15px] lg:[&_span]:rounded-[20px] [&_span]:h-[30px] lg:[&_span]:h-[40px] [&_span]:pr-0 lg:max-w-[400px] lg:mx-auto"
    @submit.prevent="handleSubmit">
    <SfInput
      class="!text-[12px] lg:!text-[14px] placeholder:text-black"
      id="search-bar"
      ref="inputReference"
      v-model="inputModel"
      data-testid="search-bar-input"
      :aria-label="t('common.actions.search')"
      :placeholder="t('Header.Search')"
      @focus="open"
    >
      <template #suffix>
        <button @click="handleSubmit" class="w-[40px] h-[40px] flex items-center justify-center" :class="{'opacity-25' : loading }">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M10.516,1.481l0,0h0A5.073,5.073,0,0,0,2.719,7.9a1.046,1.046,0,0,0-.4.247L.268,10.2A1.088,1.088,0,0,0,1.8,11.732l2.05-2.048a1.064,1.064,0,0,0,.246-.4,5.075,5.075,0,0,0,6.418-7.8M8.976,7.12a2.9,2.9,0,1,1,.849-2.05,2.9,2.9,0,0,1-.849,2.05" transform="translate(0 0)"/></svg>
        </button>
      </template>
      <template #prefix>
        <button
          v-if="inputModel"
          type="button"
          :aria-label="t('common.actions.resetSearch')"
          class="flex rounded-md focus-visible:outline focus-visible:outline-offset ml-[-10px]"
          @click="handleReset"
        >
          <SfIconCancel />
        </button>
      </template>
    </SfInput>
  </form>
</template>

<script setup lang="ts">
import { SfIconCancel, SfIconSearch, SfInput, useDisclosure, SfLoaderCircular } from '@storefront-ui/vue';
import { unrefElement } from '@vueuse/core';

const props = defineProps<{
  close?: () => boolean;
}>();

const localePath = useLocalePath();
const router = useRouter();
const { open } = useDisclosure();
const { updateSearchTerm } = useCategoryFilter();
const { loading } = useSearch();
const { emit } = usePlentyEvent();

const inputModel = ref('');
const inputReference = ref<HTMLSpanElement>();
const handleInputFocus = () => {
  const inputElement = unrefElement(inputReference)?.querySelector('input');
  inputElement?.focus();
};
const handleReset = () => {
  inputModel.value = '';
  handleInputFocus();
};
const handleSubmit = () => {
  props.close?.();
  updateSearchTerm(inputModel.value);
  emit('frontend:searchProduct', inputModel.value);
  router.push({ path: localePath(paths.search), query: { term: inputModel.value } });
  handleReset();
};

watch(inputModel, () => {
  if (inputModel.value === '') {
    handleReset();
  }
});
</script>
