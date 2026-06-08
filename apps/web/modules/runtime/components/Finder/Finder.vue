<template>
  <div class="w-screen -mx-[50vw] relative left-1/2 bg-primary-500">
    <div class="max-w-screen-3xl mx-auto px-[20px] pt-[30px] pb-[40px] lg:py-[60px] xl:pb-[80px]">
      <h2 class="text-white text-[18px] lg:text-[24px] xl:text-[48px] xl:leading-[1] font-extrabold italic text-center">{{ t('Finder.Title') }}</h2>
      <div class="grid gap-[10px] xl:gap-[20px] pt-[20px] xl:pt-[40px] lg:grid-cols-4 max-w-[1260px] mx-auto">
        <!-- Level 1 -->
        <select
          v-model="selectedLevel1"
          @change="onLevel1Change"
          :class="selectClasses"
        >
          <option :value="null" disabled>1. {{ t('Finder.SelectLevel1') }}</option>
          <option
            v-for="category in level1Categories"
            :key="category.id"
            :value="category.id"
          >
            {{ cleanCategoryName(category.details[0]?.name || '') }} <!-- {{ category.itemCount?.[0]?.count || 0 }} -->
          </option>
        </select>
        <!-- Level 2 -->
        <select
          v-model="selectedLevel2"
          @change="onLevel2Change"
          :disabled="!level2Categories.length"
          :class="selectClasses"
        >
          <option :value="null" disabled>2. {{ t('Finder.SelectLevel2') }}</option>
          <option
            v-for="category in level2Categories"
            :key="category.id"
            :value="category.id"
          >
            {{ cleanCategoryName(category.details[0]?.name || '') }} <!-- {{ category.itemCount?.[0]?.count || 0 }} -->
          </option>
        </select>
        <!-- Level 3 -->
        <select
          v-model="selectedLevel3"
          :disabled="!level3Categories.length"
          :class="selectClasses"
        >
          <option :value="null" disabled>3. {{ t('Finder.SelectLevel3') }}</option>
          <option
            v-for="category in level3Categories"
            :key="category.id"
            :value="category.id"
          >
            {{ cleanCategoryName(category.details[0]?.name || '') }} <!-- {{ category.itemCount?.[0]?.count || 0 }} -->
          </option>
        </select>
        <!-- Results Button -->
        <button
          @click="navigateToCategory"
          :disabled="!canNavigate"
          class="inline-flex items-center justify-center self-center justify-self-center lg:w-full px-[20px] mt-[10px] lg:mt-0 border xl:border-[2px] border-white h-[40px] xl:h-[60px] rounded-[20px] xl:rounded-[30px] p-2 bg-primary-500 text-white disabled:text-opacity-75 disabled:cursor-not-allowed transition-colors uppercase font-extrabold"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
select {
  background: no-repeat calc(100% - 20px) center white url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3e%3cpath d='M8.948,0h-7.9A1.06,1.06,0,0,0,.111.553.96.96,0,0,0,.21,1.6l3.947,5a1.087,1.087,0,0,0,1.684,0L9.765,1.628A.965.965,0,0,0,10,1,1.026,1.026,0,0,0,8.948,0' transform='translate(0)'/%3e%3c/svg%3e"); 
  appearance: none;

  @media screen and (min-width: 1280px) {
    background-size: 14px 10px;
  }
}
</style>

<script lang="ts" setup>
// CSS classes
const selectClasses = 'h-[40px] xl:h-[60px] w-full px-[20px] xl:px-[30px] rounded-[20px] xl:rounded-[30px] bg-white border-0 color-black disabled:text-gray-500 disabled:opacity-75 font-extrabold text-[14px] lg:text-[16px] xl:text-[18px]';

import { computed, ref } from 'vue';
import { type CategoryTreeItem, categoryTreeGetters } from '@plentymarkets/shop-api';
import { FinderProps } from './types';

const props = defineProps<FinderProps>();
const localePath = useLocalePath();

const categoryTree = ref(categoryTreeGetters.getTree(props.categories));
const { buildCategoryMenuLink } = useLocalization();

// Selected category IDs at each level
const selectedLevel1 = ref<number | null>(74);
const selectedLevel2 = ref<number | null>(null);
const selectedLevel3 = ref<number | null>(null);

// Level 1: Top-level categories
const level1Categories = computed(() => categoryTree.value);

// Level 2: Children of selected level 1
const level2Categories = computed(() => {
  if (!selectedLevel1.value) return [];
  const parent = findCategoryById(level1Categories.value, selectedLevel1.value);
  return parent?.children || [];
});

// Level 3: Children of selected level 2
const level3Categories = computed(() => {
  if (!selectedLevel2.value) return [];
  const parent = findCategoryById(level2Categories.value, selectedLevel2.value);
  return parent?.children || [];
});

// Auto-select if only one option available
watch(level2Categories, (categories) => {
  if (categories.length === 1 && !selectedLevel2.value && categories[0]) {
    selectedLevel2.value = categories[0].id;
  }
});

watch(level3Categories, (categories) => {
  if (categories.length === 1 && !selectedLevel3.value && categories[0]) {
    selectedLevel3.value = categories[0].id;
  }
});

// Determine if navigation is possible
const canNavigate = computed(() => {
  // Level 3 selected
  if (selectedLevel3.value) return true;
  
  // Level 2 selected with no children (leaf node)
  if (selectedLevel2.value && !level3Categories.value.length) return true;
  
  // Level 1 selected with no children (leaf node)
  if (selectedLevel1.value && !level2Categories.value.length) return true;
  
  return false;
});

// Get the deepest selected category
const selectedCategory = computed(() => {
  if (selectedLevel3.value) {
    return findCategoryById(level3Categories.value, selectedLevel3.value);
  }
  if (selectedLevel2.value) {
    return findCategoryById(level2Categories.value, selectedLevel2.value);
  }
  if (selectedLevel1.value) {
    return findCategoryById(level1Categories.value, selectedLevel1.value);
  }
  return null;
});

// Helper function to find category by ID
function findCategoryById(categories: CategoryTreeItem[], id: number): CategoryTreeItem | undefined {
  return categories.find(cat => cat.id === id);
}

// Reset child selections when parent changes
function onLevel1Change() {
  selectedLevel2.value = null;
  selectedLevel3.value = null;
}

function onLevel2Change() {
  selectedLevel3.value = null;
}

// Navigate to the selected category
function navigateToCategory() {
  if (!selectedCategory.value) return;
  
  const url = buildCategoryMenuLink(selectedCategory.value, categoryTree.value);
  navigateTo(localePath(url));
}

// Computed property for button text
const buttonText = computed(() => {
  if (!selectedCategory.value || !canNavigate.value) {
    return t('Finder.Button');
  }
  
  const count = selectedCategory.value.itemCount?.[0]?.count || 0;
  const translationKey = count == '1' ? 'Finder.ButtonCount1' : 'Finder.Button';
  
  return `${count} ${t(translationKey)}`;
});

// Helper function to clean category names
const cleanCategoryName = (name: string) => {
  return name.replace(' - Akkus', '');
};
</script>