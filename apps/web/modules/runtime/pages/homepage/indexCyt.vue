<template>
  <div class="w-full max-w-screen-3xl mx-auto px-[20px] relative">
    <!-- Home Eye Catcher -->
    <HomeEyeCatcher :categories="categoryTree" />

    <!-- Finder -->
    <Finder :categories="categoryTree" />

    <!-- Second Level Categories -->
    <SecondLevelCategories :categories="categoryTree" />

    <!-- Recommended Products -->
    <RecommendedProducts categoryId="74" cacheKey="homepage" headline="Unsere Topseller Handy-Akkus" class="pt-[45px] xl:pt-[60px] 4xl:pt-[80px]" />

    <!-- Trusted Shops -->
    <TrustedShops />
  </div>
</template>

<script lang="ts" setup>
import type { Block } from '@plentymarkets/shop-api';
import homepageTemplateDataDe from '~/composables/useCategoryTemplate/homepageTemplateDataDe.json';
import homepageTemplateDataEn from '~/composables/useCategoryTemplate/homepageTemplateDataEn.json';
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

const useLocaleSpecificHomepageTemplate = (locale: string) =>
  locale === 'de' ? (homepageTemplateDataDe as Block[]) : (homepageTemplateDataEn as Block[]);

const { $i18n } = useNuxtApp();

const { setPageMeta } = usePageMeta();
const route = useRoute();
const { setDefaultTemplate } = useCategoryTemplate(
  route?.meta?.identifier as string,
  route.meta.type as string,
  useNuxtApp().$i18n.locale.value,
);

const icon = 'home';
setPageMeta(t('homepage.title'), icon);

setDefaultTemplate(useLocaleSpecificHomepageTemplate($i18n.locale.value));

const { getRobots, setRobotForStaticPage } = useRobots();
getRobots();
setRobotForStaticPage('Homepage');

const { setBlocksListContext } = useBlocksList();
setBlocksListContext('content');

const { data: categoryTree } = useCategoryTree();
</script>