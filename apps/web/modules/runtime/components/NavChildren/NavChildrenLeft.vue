<template>
  <ul class="flex flex-col p-[20px] 2xl:p-[30px] text-[18px] leading-[2] xl:sticky xl:top-0">
    <li
      v-for="childCategory in visibleChildren"
      :key="childCategory.id"
      :class="{
        'order-first': childCategory.id === currentCategoryId
      }"
    >
      <NuxtLink
        class="flex items-center gap-[8px] hover:text-primary-500"
        :to="localePath(generateCategoryLink(childCategory))"
        :class="{
          'text-primary-500 font-bold active': childCategory.id === currentCategoryId
        }"
      >
        {{ childCategory.details?.[0]?.name || '' }} <template v-if="childCategory.itemCount?.[0]?.count">({{ childCategory.itemCount?.[0]?.count }})</template>
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
a {
  &::before {
    content: '';
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='11' viewBox='0 0 8 11'%3e%3cpath d='M9.843,8H1.158A1.16,1.16,0,0,1,.122,7.368a1.131,1.131,0,0,1,.109-1.2L4.573.457a1.168,1.168,0,0,1,1.853,0l4.317,5.682A1.128,1.128,0,0,1,11,6.857,1.15,1.15,0,0,1,9.843,8' transform='translate(8) rotate(90)'/%3e%3c/svg%3e");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 8px;
    height: 11px;
  }
  &.active::before,
  &:hover::before {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='11' viewBox='0 0 8 11'%3e%3cpath fill='%2300A4CC' d='M9.843,8H1.158A1.16,1.16,0,0,1,.122,7.368a1.131,1.131,0,0,1,.109-1.2L4.573.457a1.168,1.168,0,0,1,1.853,0l4.317,5.682A1.128,1.128,0,0,1,11,6.857,1.15,1.15,0,0,1,9.843,8' transform='translate(8) rotate(90)'/%3e%3c/svg%3e");
  }
}

body.slim-header-active ul {
  top: 40px;
  transition: top 0.3s ease;
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
