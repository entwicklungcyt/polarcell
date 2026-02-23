<template>
  <ul class="flex flex-wrap gap-[10px] xl:gap-[20px] justify-center pt-[35px] xl:max-w-[80%] 2xl:max-w-[90%] xl:mx-auto xl:pt-[70px] 2xl:pt-[100px]">
    <li v-for="child in allChildren" :key="child.id">
      <NuxtLink 
        :to="localePath(generateCategoryLink(child))"
        :class="buttonClasses"
        v-tooltip:top="'in Kategorie ' + getTooltipText(child) + ' anzeigen'"
      >
        {{ child.details[0]?.name }}<!-- <span v-if="child.itemCount?.[0]?.count" class="text-sm text-gray-500 ml-1">({{ child.itemCount[0].count }})</span> -->
      </NuxtLink>
    </li>
  </ul>
</template>

<style>
.v-tooltip > .v-overlay__content {
  background: black !important;
  color: white !important;
}
</style>

<script lang="ts" setup>
const buttonClasses = `
  h-[40px] xl:h-[60px] 2xl:h-[80px] xl:min-w-[80px] 2xl:min-w-[100px]
  border-[2px] border-black 2xl:border-[3px]
  rounded-[20px] xl:rounded-[30px] 2xl:rounded-[40px]
  flex items-center justify-center 
  px-[15px] xl:px-[20px] 2xl:px-[25px]
  text-[14px] xl:text-[18px] 2xl:text-[20px] font-extrabold uppercase
  transition-colors
  hover:bg-black hover:text-white
`.trim().replace(/\s+/g, ' ');

import { type CategoryTreeItem, categoryTreeGetters } from '@plentymarkets/shop-api';
import { SecondLevelCategoriesProps } from './types';

const props = defineProps<SecondLevelCategoriesProps>();
const categoryTree = ref(categoryTreeGetters.getTree(props.categories));
const { buildCategoryMenuLink } = useLocalization();
const localePath = useLocalePath();

const generateCategoryLink = (category: CategoryTreeItem) => {
  return buildCategoryMenuLink(category, categoryTree.value);
};

const allChildren = computed(() => {
  return categoryTree.value.flatMap(parent => parent.children || []);
});

const getTooltipText = (child: CategoryTreeItem) => {
  const link = generateCategoryLink(child);
  const firstSegment = link.split('/').filter(Boolean)[0] || '';
  return firstSegment.toUpperCase();
};
</script>