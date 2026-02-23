<template>
  <select id="sortBy" v-model="selected" :aria-label="t('common.labels.sortBy')" class="
    w-full sm:max-w-[50%] xl:max-w-[300px]
    text-[14px] bg-[#F7F7F7] text-black font-bold
    px-[20px]
    min-h-[40px] xl:min-h-[50px]
    border-0 rounded-[20px] xl:rounded-[25px]
    bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2710%27%20height=%277%27%20viewBox=%270%200%2010%207%27%3e%3cpath%20d=%27M8.948,0h-7.9A1.06,1.06,0,0,0,.111.553.96.96,0,0,0,.21,1.6l3.947,5a1.087,1.087,0,0,0,1.684,0L9.765,1.628A.965.965,0,0,0,10,1,1.026,1.026,0,0,0,8.948,0%27%20transform=%27translate(0)%27/%3e%3c/svg%3e')]
    bg-no-repeat bg-[position:calc(100%-20px)_center] appearance-none
  ">
    <option v-if="selectionModeCompact" value="" disabled hidden>{{ t('common.labels.sortBy') }}:</option>
    <option v-for="option in options" :key="option" :value="option">{{ t(`category.sorting.${option}`) }}</option>
  </select>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { isPageOfType } from '~/utils/pathHelper';

const props = defineProps<{ selectionModeCompact?: boolean }>();
const { updateSorting } = useCategoryFilter();
const { getJsonSetting: availableSortingOptions } = useSiteSettings('availableSortingOptions');
const { getSetting: defaultSortingSearch } = useSiteSettings('defaultSortingSearch');
const { getSetting: defaultSortingOption } = useSiteSettings('defaultSortingOption');

const route = useRoute();
const useSelectionModeCompact = computed(() => props.selectionModeCompact);
watch(useSelectionModeCompact, (on) => {
  if (on) updateSorting('');
});
const options = computed<string[]>(() => availableSortingOptions());
const defaultOption = computed<string | undefined>(() =>
  isPageOfType('search') ? defaultSortingSearch() : defaultSortingOption(),
);

const selected = computed<string>({
  get: () => {
    if (useSelectionModeCompact.value) return '';

    const sortQueryParam = route.query.sort;
    const currentSort = typeof sortQueryParam === 'string' ? sortQueryParam : '';
    if (currentSort && options.value.includes(currentSort)) return currentSort;

    return (
      (defaultOption.value && options.value.includes(defaultOption.value) ? defaultOption.value : options.value[0]) ??
      ''
    );
  },
  set: (val) => {
    if (!val) return;
    updateSorting(val);
  },
});
</script>
