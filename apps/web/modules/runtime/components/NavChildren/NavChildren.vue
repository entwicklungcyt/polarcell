<template>
    <ul class="
      flex xl:hidden gap-[10px]
      ml-[-20px] pl-[20px] mr-[-20px] pr-[20px] pt-[15px] lg:pt-[20px]
      scroll-smooth overflow-x-scroll scrollbar-hidden 
    ">
      <li
        v-for="childCategory in visibleChildren"
        :key="childCategory.id"
        :class="{
          'order-first': childCategory.id === currentCategoryId
        }"
      >
        <NuxtLink
          :to="localePath(generateCategoryLink(childCategory))"
          class="
            h-[40px]
            border-[2px] border-black 
            rounded-[20px] 
            flex items-center justify-center 
            px-[15px] 
            text-[14px] font-extrabold uppercase whitespace-nowrap
            transition-colors
            hover:bg-black hover:text-white
          "
          :class="{
            '!bg-black text-white': childCategory.id === currentCategoryId
          }"
        >
          {{ childCategory.details?.[0]?.name || '' }}
        </NuxtLink>
      </li>
    </ul>
  </template>

<style scoped>
    ul {
        &:empty {
            display: none;
        }

        a {
            &:hover {
                background-color: black;
                color: white;
            }
        }
    }
</style>

<script setup lang="ts">
const localePath = useLocalePath();
const { data: categoryTree } = useCategoryTree();
const { data: productsCatalog } = useProducts();
const { buildCategoryMenuLink } = useLocalization();

const currentCategoryId = computed(() => productsCatalog.value.category?.id);
const parentCategoryId = computed(() => productsCatalog.value.category?.parentCategoryId);

const findCategoryInTree = (
  categories: CategoryTreeItem[],
  id: number | undefined
): CategoryTreeItem | undefined => {
  if (!id) return undefined;
  for (const cat of categories) {
    if (cat.id === id) return cat;
    if (cat.children?.length) {
      const found = findCategoryInTree(cat.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

const visibleChildren = computed(() => {
  const categories = categoryTree.value || [];
  const current = findCategoryInTree(categories, currentCategoryId.value);

  // If current category has children, show them
  if (current?.children?.length) {
    return current.children;
  }

  // Otherwise, find the parent and show its children (siblings of current)
  const parent = findCategoryInTree(categories, parentCategoryId.value);
  return parent?.children ?? [];
});

const generateCategoryLink = (category: CategoryTreeItem) => {
  return buildCategoryMenuLink(category, categoryTree.value);
};
</script>
