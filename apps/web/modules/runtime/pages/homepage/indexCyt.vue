<template>
  <div class="w-full max-w-screen-3xl mx-auto px-[20px] relative">
    <!-- Home Eye Catcher -->
    <HomeEyeCatcher :categories="categoryTree" />

    <!-- Finder -->
    <Finder v-if="categoryTree && categoryTree.length > 0" :categories="categoryTree" />

    <!-- Second Level Categories -->
    <SecondLevelCategories v-if="categoryTree && categoryTree.length > 0" :categories="categoryTree" />

    <!-- Home Categories -->
    <HomeCategories />

    <!-- Recommended Products -->
    <RecommendedProducts
      :categoryId="String(topsellerCategoryId)"
      :headline="$t('Topseller Startseite')"
      cacheKey="homepage"
      class="pt-[45px] xl:pt-[60px] 4xl:pt-[80px]"
    />

    <!-- USP Slider -->
    <UspSlider />

    <!-- FAQs -->
    <Faqs />

    <!-- Trusted Shops -->
    <TrustedShops />

    <!-- Seo -->
    <Seo />

    <!-- Last Seen -->
    <LastSeenCyt />
  </div>
</template>

<script lang="ts" setup>
import type { Locale } from '#i18n';

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});

definePageMeta({
  pageType: 'static',
  isBlockified: true,
  type: 'immutable',
  identifier: 'index',
  middleware: ['newsletter-confirmation-client', 'notifyme-interactions-client'],
});

const { setPageMeta } = usePageMeta();

const icon = 'home';
setPageMeta(t('homepage.title'), icon);

const { getRobots, setRobotForStaticPage } = useRobots();
getRobots();
setRobotForStaticPage('Homepage');

const { setBlocksListContext } = useBlocksList();
setBlocksListContext('content');

const { data: categoryTree } = useCategoryTree();

const topsellerCategoryId = computed(() => {
  const id = Number(t('Topseller Kategorie ID Startseite'))
  return Number.isInteger(id) && id > 0 ? String(id) : undefined
})
</script>