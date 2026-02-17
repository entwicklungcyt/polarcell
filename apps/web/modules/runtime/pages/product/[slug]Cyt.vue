<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <NarrowContainer>
      <!-- title for mobile -->
      <div class="pt-[20px] max-w-[900px] mx-auto xl:hidden">
        <h1 class="text-[18px] font-extrabold italic leading-[1.2]">{{ productGetters.getName(product) }}</h1>
      </div>

      <!-- Product Gallery and Purchase Card -->
      <div class="max-w-screen-3xl mx-auto">
        <div class="flex flex-col gap-[25px] xl:grid xl:grid-cols-[auto_550px] xl:gap-[80px] pt-[25px] xl:pt-[60px]">
          <div class="left xl:min-w-[0] xl:self-start bg-black/[0.03] xl:bg-white ml-[-20px] mr-[-20px] xl:ml-0 xl:mr-0">
            <Gallery
              :images="addModernImageExtensionForGallery(productGetters.getGallery(product))" 
              :product="product"
            />
          </div>              
          <div class="right">
            <div class="drift-zoom-image relative">
              <NuxtLazyHydrate when-idle>
                <UiPurchaseCard v-if="product" :product="product" :review-average="countsProductReviews" />
              </NuxtLazyHydrate>
            </div>
          </div>
        </div>
      </div>

      <!-- Item description bottom -->
      <div class="hidden xl:grid xl:grid-cols-[250px_auto_550px] 2xl:xl:grid-cols-[auto_1fr_550px] xl:gap-x-[40px] 3xl:gap-x-[80px] xl:py-[100px]">
        <!-- Kompatibilitäten -->
        <div>
          <div class="sticky top-[20px] [.slim-header-active_&]:top-[80px]">
            <div v-html="productGetters.getTechnicalData(product)" class="text-[18px] space-y-4 [&_p]:font-extrabold [&_p]:italic [&_p]:mb-[15px]"></div>
            <!-- Hersteller -->
            <div v-if="manufacturerHtml" class="pt-[40px]">
              <p class="font-extrabold italic text-[18px] mb-[15px]">{{ t('manufacturer.header') }}:</p>
              <div v-html="manufacturerHtml" class="leading-[1.25] text-[18px]"></div>
              <a href="/batterieentsorgung" target="_blank" class="underline pt-[20px] text-[18px] flex items-center gap-[10px]">{{ t('Footer.Link Titel.3') }}</a>
            </div>
          </div>
        </div>
        <!-- Zusatzinformationen (Technische Daten - etwas verwirrend, da die echten "Technische Daten" im Kompatibilitäten DIV sind) -->
        <div v-if="additionalInfoHtml">
          <div class="sticky top-[20px] [.slim-header-active_&]:top-[80px]">
            <p class="text-[18px] font-extrabold italic mb-[15px]">{{ t('common.labels.technicalData') }}:</p>
            <div v-html="additionalInfoHtml"></div>
          </div>
        </div>
        <div v-else></div>
        <!-- Produktbeschreibung -->
        <div
          v-if="productGetters.getDescription(product)"
          class="self-start sticky top-[20px] [.slim-header-active_&]:top-[80px]
            [&_br]:hidden leading-[1.5]
            bg-primary-500 text-white px-[30px] py-[35px]
            rounded-[10px]
            [&_ul]:list-none [&_ul]:space-y-4 [&_ul]:pl-0
            [&_li]:relative [&_li]:pl-[40px] [&_li]:text-[18px]
            [&_li]:before:content-['✓']
            [&_li]:before:leading-[1]
            [&_li]:before:text-primary-500
            [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-0.5
            [&_li]:before:w-[24px] [&_li]:before:h-[24px]
            [&_li]:before:bg-white [&_li]:before:rounded-full
            [&_li]:before:flex [&_li]:before:items-center [&_li]:before:justify-center
            [&_li]:before:text-[16px] [&_li]:before:font-bold
          "
        >
          <div v-html="productGetters.getDescription(product)"></div>
        </div>
      </div>

      <!-- Eye Catcher Section -->
      <HomeEyeCatcher :categories="categoryTree" :is-item-view="true" />
      
      <!-- Reviews Section -->
      <div class="max-w-screen-3xl mx-auto pt-[20px] xl:pt-[60px]" v-if="true || reviewGetters.getTotalReviews(countsProductReviews) > 0">
        <ReviewsAccordion
          v-if="product"
          :product="product"
          :total-reviews="reviewGetters.getTotalReviews(countsProductReviews)"
        />
      </div>
      
      <!-- Recommended Products Section -->
      <RecommendedProducts :categoryId="String(product?.defaultCategories?.[0]?.id)" :headline="'Unsere Topseller in ' + breadcrumbs[breadcrumbs.length - 2]?.name" class="pt-[45px] xl:pt-[60px] 4xl:pt-[80px]" />

      <!-- Last Seen Section -->
      <LastSeenCyt :exclude-variation-id="product?.variation?.id" />

      <TrustedShops />
    </NarrowContainer>

    <UiReviewModal />
    <ProductLegalDetailsDrawer v-if="open" :product="product" class="[&_aside]:!border-0 [&_*]:!text-[14px] [&_header]:!px-[20px] [&_header]:!py-[5px] [&_header]:!bg-black [&_[role='tabpanel']>.py-2.px-4]:!p-0 [&_button]:!rounded-[0]" />
  </NuxtLayout>
</template>

<style>
  /* Gewicht */
  li.property-17 {
    &:before {
      background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25'%3e%3ccircle cx='12.5' cy='12.5' r='12.5' fill='%23d83300'/%3e%3cline x1='12.5' y1='6' x2='12.5' y2='18' stroke='%23fff' stroke-width='1.4' stroke-linecap='round'/%3e%3crect x='9.5' y='17.5' width='6' height='1.5' rx='0.75' fill='%23fff'/%3e%3cline x1='6.5' y1='9' x2='18.5' y2='9' stroke='%23fff' stroke-width='1.4' stroke-linecap='round'/%3e%3cpath d='M5 14.5l1.5-5.5 1.5 5.5a1.5 1.5 0 0 1-3 0z' fill='%23fff'/%3e%3cpath d='M16.5 14.5l1.5-5.5 1.5 5.5a1.5 1.5 0 0 1-3 0z' fill='%23fff'/%3e%3c/svg%3e");
    }
  }
  /* Akku */
  li.property-14 {
    &:before {
      background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25'%3e%3ccircle cx='12.5' cy='12.5' r='12.5' fill='%23d83300'/%3e%3crect x='6' y='9' width='11' height='7' rx='1' fill='none' stroke='%23fff' stroke-width='1.5'/%3e%3crect x='17' y='11' width='2' height='3' rx='0.5' fill='%23fff'/%3e%3crect x='8' y='11' width='4' height='3' rx='0.5' fill='%23fff'/%3e%3c/svg%3e");
    }
  }
  /* Spannung */
  li.property-16 {
    &:before {
      background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25'%3e%3ccircle cx='12.5' cy='12.5' r='12.5' fill='%23d83300'/%3e%3cpath d='M14 5L9 13h3.5l-1 7 5.5-8.5H13L14 5z' fill='%23fff'/%3e%3c/svg%3e");
    }
  }
  /* Technologie */
  li.property-13 {
    &:before {
      background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25'%3e%3ccircle cx='12.5' cy='12.5' r='12.5' fill='%23d83300'/%3e%3ccircle cx='12.5' cy='12.5' r='1.5' fill='%23fff'/%3e%3cellipse cx='12.5' cy='12.5' rx='7' ry='3' fill='none' stroke='%23fff' stroke-width='1'/%3e%3cellipse cx='12.5' cy='12.5' rx='7' ry='3' fill='none' stroke='%23fff' stroke-width='1' transform='rotate(60 12.5 12.5)'/%3e%3cellipse cx='12.5' cy='12.5' rx='7' ry='3' fill='none' stroke='%23fff' stroke-width='1' transform='rotate(-60 12.5 12.5)'/%3e%3c/svg%3e");
    }
  }
  /* Maße */
  li.property-18 {
    &:before {
      background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25'%3e%3ccircle cx='12.5' cy='12.5' r='12.5' fill='%23d83300'/%3e%3crect x='5' y='9' width='15' height='7' rx='1' fill='none' stroke='%23fff' stroke-width='1.3'/%3e%3cline x1='8' y1='9' x2='8' y2='12' stroke='%23fff' stroke-width='1'/%3e%3cline x1='10.5' y1='9' x2='10.5' y2='11' stroke='%23fff' stroke-width='0.8'/%3e%3cline x1='13' y1='9' x2='13' y2='12' stroke='%23fff' stroke-width='1'/%3e%3cline x1='15.5' y1='9' x2='15.5' y2='11' stroke='%23fff' stroke-width='0.8'/%3e%3cline x1='18' y1='9' x2='18' y2='12' stroke='%23fff' stroke-width='1'/%3e%3c/svg%3e");
    }
  }

  .manu {
    li[style*="order:3"] {
      padding-top: 20px;
    }
  }
</style>
  
<script setup lang="ts">
import type { Product } from '@plentymarkets/shop-api';
import { productGetters, reviewGetters, categoryTreeGetters } from '@plentymarkets/shop-api';
import { useLastSeen } from '../../composables/useLastSeen';

const route = useRoute();
const { setCurrentProduct } = useProducts();

const { setProductMetaData, setProductRobotsMetaData, setProductCanonicalMetaData } = useStructuredData();
const { buildProductLanguagePath } = useLocalization();
const { addModernImageExtensionForGallery } = useModernImage();
const { productParams, productId } = createProductParams(route.params);
const { data: product, fetchProduct, setProductMeta, setBreadcrumbs, breadcrumbs } = useProduct(productId);
const { data: productReviews, fetchProductReviews } = useProductReviews(Number(productId));
const { data: categoryTree } = useCategoryTree();
const { open, openDrawer } = useProductLegalDetailsDrawer();
const { setPageMeta } = usePageMeta();

const config = useRuntimeConfig().public;

definePageMeta({
  layout: false,
  path: '/:slug*_:itemId',
  validate: async (route) => {
    return validateProductParams(route.params);
  },
  type: 'product',
  isBlockified: false,
  identifier: 0,
});
const RecommendedProductsAsync = defineAsyncComponent(
  async () => await import('~/components/RecommendedProducts/RecommendedProducts.vue'),
);

const showRecommended = ref(false);
const recommendedSection = ref<HTMLElement | null>(null);
const productName = computed(() => productGetters.getName(product.value));
const icon = 'sell';
setPageMeta(productName.value, icon);

const countsProductReviews = computed(() => reviewGetters.getReviewCounts(productReviews.value));

await fetchProduct(productParams).then(() => {
  usePlentyEvent().emit('frontend:productLoaded', {
    product: product.value,
  });
});

if (Object.keys(product.value).length === 0) {
  if (import.meta.client) showError({ statusCode: 404, statusMessage: 'Product not found' });

  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  });
}
setCurrentProduct(product.value || ({} as Product));
setProductMeta();


onBeforeRouteLeave(() => {
  setCurrentProduct({} as Product);
});

async function fetchReviews() {
  const productVariationId = productGetters.getVariationId(product.value);
  await fetchProductReviews(Number(productId), productVariationId);
}
await fetchReviews();

setBreadcrumbs();

/* TODO: This should only be temporary.
 *  It changes the url of the product page while on the page and switching the locale.
 *  Should be removed when the item search is refactored.
 */
watch(
  () => product.value.texts.urlPath,
  (value, oldValue) => {
    if (value !== oldValue) {
      navigateTo({
        path: buildProductLanguagePath(
          `/${productGetters.getUrlPath(product.value)}_${productGetters.getItemId(product.value)}`,
        ),
        query: route.query,
        replace: true,
      });
    }
  },
);

watch(
  () => categoryTree.value,
  (categoriesTree) => {
    setProductCanonicalMetaData(product.value);
    const productCategoryId = productGetters.getParentCategoryId(product.value);
    if (categoriesTree.length > 0 && productCategoryId) {
      const categoryTree = categoriesTree.find(
        (categoryTree) => categoryTreeGetters.getId(categoryTree) === productCategoryId,
      );
      if (categoryTree) {
        setProductMetaData(product.value, categoryTree);
        setProductRobotsMetaData(product.value);
      }
    }
  },
  { immediate: true },
);

watch(
  () => route.params,
  () => {
    const productName = computed(() => productGetters.getName(product.value));
    const icon = 'sell';
    setPageMeta(productName.value, icon);
  },
  { immediate: true },
);

const observeRecommendedSection = () => {
  if (import.meta.client && recommendedSection.value) {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          showRecommended.value = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 250px 0px',
      },
    );
    observer.observe(recommendedSection.value);
  }
};

onNuxtReady(() => observeRecommendedSection());

// Get variationProperty group ID 9 once (für Zusatzinformationen)
const additionalInfoGroup = computed(() => {
  const vp = product?.value?.variationProperties;
  if (!vp) return null;
  const group = vp.find(v => v.id === 9);
  return group?.properties ?? null;
});

// varProp IDs allowed for additional info
const allowedIdsForAdditionalInfo = [13, 14, 16, 17, 18];

interface ProductProperty {
  names: { name: string };
  values: { value: string };
  id: number;
  position: number;
}

const additionalInfoHtml = computed(() => {
  if (!additionalInfoGroup.value) return '';

  const items = (additionalInfoGroup.value as ProductProperty[])
    .filter((prop) => allowedIdsForAdditionalInfo.includes(prop.id))
    .map((prop) => `<li class="text-right flex items-center gap-[10px] odd:bg-[#F7F7F7] p-[10px] before:content-[''] before:w-[25px] before:h-[25px] before:bg-[#d83300] before:rounded-full before:flex before:items-center before:justify-center property-${prop.id} order-[${prop.position}]"><strong class="mr-auto">${prop.names.name}:</strong> ${prop.values.value}</li>`);

  // Add dimensions from variation data
  const { widthMM, lengthMM, heightMM } = product?.value?.variation ?? {};
  if (widthMM || lengthMM || heightMM) {
    items.push(`<li class="text-right flex items-center gap-[10px] odd:bg-[#F7F7F7] p-[10px] before:content-[''] before:w-[25px] before:h-[25px] before:bg-[#d83300] before:rounded-full before:flex before:items-center before:justify-center property-18 order-[0]"><strong class="mr-auto">${t('Produktseite.Maße')}:</strong> L:${lengthMM} × B:${widthMM} × H:${heightMM} mm</li>`);
  }

  return `<ul class="flex flex-col">${items.join('')}</ul>`;
});

// Helper for manufacturer
interface Manufacturer {
  name?: string;
  legalName?: string;
  street?: string;
  houseNo?: string;
  postcode?: string;
  town?: string;
  phoneNumber?: string;
  faxNumber?: string;
  email?: string;
}
const manufacturerHtml = computed(() => {
  const mfr = product.value?.item?.manufacturer as Manufacturer | undefined;
  if (!mfr) return '';
  const keys: { key: keyof Manufacturer; order: number }[] = [
    { key: 'name', order: 0 },
    { key: 'legalName', order: 1 },
    { key: 'phoneNumber', order: 3 },
    { key: 'faxNumber', order: 4 },
    { key: 'email', order: 5 },
  ];
  const items = keys
    .filter(({ key }) => mfr[key] && String(mfr[key]).trim() !== '')
    .map(({ key, order }) => `<li style="order:${order}">${mfr[key]}</li>`);
  // Combined address line
  const streetPart = [mfr.street, mfr.houseNo].filter(Boolean).join(' ');
  const cityPart = [mfr.postcode, mfr.town].filter(Boolean).join(' ');
  const address = [streetPart, cityPart].filter(Boolean).join(', ');
  if (address) {
    items.push(`<li style="order:2">${address}<br>Deutschland</li>`);
  }
  return items.length ? `<ul class="manu flex flex-col gap-[5px]">${items.join('')}</ul>` : '';
});

// last seen
const { add } = useLastSeen();

// After product data is loaded
onMounted(() => {
  add(product.value?.item?.id || 0, product.value?.variation?.id || 0);
});
</script>
  