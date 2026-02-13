<template>
  <div>
    <form class="max-w-[900px] mx-auto"
      data-testid="purchase-card"
      @submit.prevent="handleAddToCart()"
    >
      <div class="flex items-center gap-[10px]" v-if="reviewGetters.getTotalReviews(reviewAverage) > 0">
        <SfTooltip
          @click="scrollToReviews"
          show-arrow
          placement="top"
          :label="reviewGetters.getTotalReviews(reviewAverage) > 1 ? t('product.showAllReviews') : t('Product.oneReview')"
          class="flex items-center gap-[10px] cursor-pointer"
        >
          <div class="flex gap-[0] text-[#FCC72F]">
            <svg v-for="star in 5" :key="star" class="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <defs>
                <linearGradient :id="`star-${star}`">
                  <stop offset="50%" stop-color="currentColor"/>
                  <stop offset="50%" stop-color="#fff"/>
                </linearGradient>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor"
                :fill="star <= reviewGetters.getAverageRating(reviewAverage, 'half') ? 'currentColor' : (star - 0.5 <= reviewGetters.getAverageRating(reviewAverage, 'half') ? `url(#star-${star})` : '#999')"
              />
            </svg>
          </div>
          <div class="text-[12px] underline xl:text-[14px]">
            {{ reviewGetters.getTotalReviews(reviewAverage) }}
            {{ reviewGetters.getTotalReviews(reviewAverage) === 1 ? t('Product.review') : t('Product.reviews') }}
          </div>
        </SfTooltip>
        <svg class="hidden" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="svg_star">
            <path d="M753.991,71.8a.664.664,0,0,1-.353-.118l-3.682-2.338a.742.742,0,0,0-.665,0l-3.683,2.338a.49.49,0,0,1-.689-.048.623.623,0,0,1-.077-.535l.983-4.394a.8.8,0,0,0-.206-.664l-3.259-2.949a.564.564,0,0,1-.218-.6.528.528,0,0,1,.511-.348l4.29-.378a.743.743,0,0,0,.538-.41l1.668-4.16c.145-.362.38-.4.473-.4s.328.039.473.4l1.668,4.16a.743.743,0,0,0,.538.41l4.29.378a.528.528,0,0,1,.511.348.564.564,0,0,1-.218.6l-3.259,2.949a.8.8,0,0,0-.205.664L754.4,71.1a.626.626,0,0,1-.077.535A.414.414,0,0,1,753.991,71.8Z" transform="translate(-742.123 -56.796)"/>
          </g>
        </svg>
      </div>
      <h1 class="hidden xl:block xl:text-[30px] leading-[1.25] font-extrabold" :class="{ 'pt-[20px]': reviewGetters.getTotalReviews(reviewAverage) > 0 }" data-testid="product-name">{{ productGetters.getName(product) }}</h1>
      <div class="grid">
        <div class="prices-badge">
          <Price :price="priceWithProperties" :crossed-price="crossedPrice" />
          <div class="text-[12px] xl:text-[14px] pt-[15px] xl:pt-[25px]">
            <span>{{ showNetPrices ? t('product.priceExclVAT') : t('product.priceInclVAT') }}&nbsp;</span>|
            <strong>{{ t('common.labels.content') }}:</strong> {{ product.unit.content }} {{ product.unit.names.name }}&nbsp;|
            <a :href="localePath('/versandinformationen')" target="_blank" class="text-primary-500">{{ $t('Produktseite.Versand') }}</a>
          </div>
          <div :class="['text-[12px] xl:text-[14px] av' + productGetters.getAvailabilityId(product), productGetters.getAvailabilityId(product) == 1 ? 'text-[#46BB00]' : 'text-[black]']">
            {{ productGetters.getAvailabilityName(product) }}
          </div>
          <div v-if="ean_code_exists" class="text-[12px] xl:text-[14px]"><strong>EAN:</strong> {{ eanBarcode?.code }}</div>
        </div>
      </div>

      <CompatibilityChecker v-if="productGetters.getTechnicalData(product)" :technical-data="productGetters.getTechnicalData(product)" />

      <ProductAttributes :product="product" />
      <BundleOrderItems v-if="product.bundleComponents" :product="product" />
      <OrderProperties :product="product" />
      <GraduatedPriceList :product="product" :count="quantitySelectorValue" />
      <div class="flex gap-[10px] xl:gap-[20px] pt-[10px] xl:pt-[20px]">
        <UiQuantitySelector
          :min-value="productGetters.getMinimumOrderQuantity(product)"
          :value="quantitySelectorValue"
          class=""
          @change-quantity="changeQuantity"
        />
        <SfTooltip
          show-arrow
          placement="top"
          :label="isNotValidVariation || isSalableText"
          class="w-full flex-grow-[2] flex-shrink basis-auto whitespace-nowrap"
        >
          <UiButton
            type="submit"
            data-testid="add-to-cart"
            size="lg"
            class="w-full h-full bg-primary-500 !h-[44px] xl:!h-[60px] !rounded-[22px] xl:!rounded-[33px] uppercase !font-bold xl:!font-extrabold text-[14px] xl:!text-[18px] hover:!bg-black !shadow-none"
            :disabled="loading || !productGetters.isSalable(product)"
          >
            <template #prefix>
              <div v-if="!loading" class="flex row items-center gap-[10px]">
                <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g transform="translate(0 0)"><path d="M19.487,2.639a2.4,2.4,0,0,0-1.9-.93H4.249A3.222,3.222,0,0,0,.6.1a.806.806,0,0,0,.4,1.561A1.612,1.612,0,0,1,2.969,2.821l1.8,7.121a4.018,4.018,0,0,0,3.9,3.053h6.043a4.018,4.018,0,0,0,3.9-3.053l1.305-5.228a2.4,2.4,0,0,0-.439-2.075"/><path d="M9.653,17.4a2.6,2.6,0,1,1-2.6-2.6,2.6,2.6,0,0,1,2.6,2.6"/><path d="M18.321,17.4a2.6,2.6,0,1,1-2.6-2.6,2.6,2.6,0,0,1,2.6,2.6"/></g></svg>
                {{ t('common.actions.addToCart') }}
              </div>
              <div v-else>
                <SfLoaderCircular size="sm" />
              </div>
            </template>
          </UiButton>
        </SfTooltip>
      </div>
      <!-- Paypal Buttons removed
      <div v-if="showPayPalButtons" class="pt-[20px] xl:pt-[30px] flex flex-col gap-[10px] xl:gap-[20px]">
        <div>
          <PayPalExpressButton type="SingleItem" class="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] gap-[10px]" @validation-callback="paypalHandleAddToCart" />
          <! - - <PayPalPayLaterBanner placement="product" :amount="priceWithProperties * quantitySelectorValue" /> - - >
        </div>
      </div> -->
      <!-- Fragen -->
      <div class="pt-[30px] xl:pt-[60px]">
        <div class="flex flex-col gap-[10px] xl:gap-[20px]">
          <p class="font-extrabold italic sm:text-[16px] xl:text-[18px]">{{ t('Produktseite.Fragen.01') }}</p>
          <div class="flex justify-center xl:justify-between xl:px-[40px] gap-[20px] min-h-[40px] xl:min-h-[60px] bg-[#F7F7F7] rounded-[20px] xl:rounded-[30px] text-[12px] sm:text-[14px] xl:text-[18px]">
            <SfLink :href="localePath(paths.contact)" class="flex items-center gap-[10px] !text-black no-underline" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="15.001" height="15.001" viewBox="0 0 15.001 15.001"><path d="M5.881,7.159a2.4,2.4,0,0,0,3.271,0L15,2.341A2.5,2.5,0,0,0,12.517,0h-10A2.5,2.5,0,0,0,.033,2.341Z" transform="translate(-0.016)"/><path d="M10.407,13.622a4.53,4.53,0,0,1-2.895,1.1A4.625,4.625,0,0,1,4.6,13.628L0,9.837v7.582a2.507,2.507,0,0,0,2.5,2.5h10a2.507,2.507,0,0,0,2.5-2.5V9.837Z" transform="translate(0 -4.918)"/></svg>
              {{ t('Produktseite.Fragen.02') }}
            </SfLink>
            <SfLink :href="'tel:' + t('Footer.Hotline').replaceAll(' ','')" class="flex items-center gap-[10px] !text-black no-underline" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path d="M11.314,15a10.243,10.243,0,0,1-2.3-.341,12.838,12.838,0,0,1-5.3-3.4A12.772,12.772,0,0,1,.355,6.037C.013,4.6-.253,3.142.4,1.944A3.85,3.85,0,0,1,2.676.092a2.931,2.931,0,0,1,1.75.1,1.231,1.231,0,0,1,.8.844l.89,3.265A1.224,1.224,0,0,1,5.86,5.434L4.589,6.976v0A10.555,10.555,0,0,0,6.142,8.856a8.653,8.653,0,0,0,1.9,1.553L9.6,9.109a1.2,1.2,0,0,1,1.09-.229l3.265.891a1.233,1.233,0,0,1,.846.8,2.93,2.93,0,0,1,.1,1.75A3.848,3.848,0,0,1,13.054,14.6a3.572,3.572,0,0,1-1.741.4" transform="translate(0 0)"/></svg>
              <span>{{ t('Produktseite.Fragen.03') }}: <strong>{{ t('Footer.Hotline') }}</strong></span>
            </SfLink>
          </div>
        </div>
      </div>
    </form>

    <!-- Global Accessory (Werkzeugset für alle Smartphone Modelle) -->
    <GlobalAccessory :item-id="5088" :variation-id="6086" />

    <!-- Tabs mobile -->
    <div v-if="viewport.isLessThan('lg')" class="pt-[30px]">
      <!-- Kompatibilitäten Tab -->
      <TabsCyt v-if="productGetters.getTechnicalData(product)" :data-content="productGetters.getTechnicalData(product)" data-id="tab-technical-data" :data-name="t('Produktseite.Kompatibilitäten')" />
      <!-- Zusatzinformationen Tab (Technische Daten - etwas verwirrend, da die echten "Technische Daten" im Kompatibilitäten Tab sind) -->
      <TabsCyt :data-content="additionalInfoHtml" data-id="tab-additional-info" :data-name="t('common.labels.technicalData')" />

      <component is="style" v-if="additionalInfoHtml">
        <!-- Gewicht -->
        .tab-content li.property-17 {
          &:before {
            background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25'%3e%3ccircle cx='12.5' cy='12.5' r='12.5' fill='%23d83300'/%3e%3cline x1='12.5' y1='6' x2='12.5' y2='18' stroke='%23fff' stroke-width='1.4' stroke-linecap='round'/%3e%3crect x='9.5' y='17.5' width='6' height='1.5' rx='0.75' fill='%23fff'/%3e%3cline x1='6.5' y1='9' x2='18.5' y2='9' stroke='%23fff' stroke-width='1.4' stroke-linecap='round'/%3e%3cpath d='M5 14.5l1.5-5.5 1.5 5.5a1.5 1.5 0 0 1-3 0z' fill='%23fff'/%3e%3cpath d='M16.5 14.5l1.5-5.5 1.5 5.5a1.5 1.5 0 0 1-3 0z' fill='%23fff'/%3e%3c/svg%3e");
          }
        }
        <!-- Akku -->
        .tab-content li.property-14 {
          &:before {
            background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25'%3e%3ccircle cx='12.5' cy='12.5' r='12.5' fill='%23d83300'/%3e%3crect x='6' y='9' width='11' height='7' rx='1' fill='none' stroke='%23fff' stroke-width='1.5'/%3e%3crect x='17' y='11' width='2' height='3' rx='0.5' fill='%23fff'/%3e%3crect x='8' y='11' width='4' height='3' rx='0.5' fill='%23fff'/%3e%3c/svg%3e");
          }
        }
        <!-- Spannung -->
        .tab-content li.property-16 {
          &:before {
            background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25'%3e%3ccircle cx='12.5' cy='12.5' r='12.5' fill='%23d83300'/%3e%3cpath d='M14 5L9 13h3.5l-1 7 5.5-8.5H13L14 5z' fill='%23fff'/%3e%3c/svg%3e");
          }
        }
        <!-- Technologie -->
        .tab-content li.property-13 {
          &:before {
            background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25'%3e%3ccircle cx='12.5' cy='12.5' r='12.5' fill='%23d83300'/%3e%3ccircle cx='12.5' cy='12.5' r='1.5' fill='%23fff'/%3e%3cellipse cx='12.5' cy='12.5' rx='7' ry='3' fill='none' stroke='%23fff' stroke-width='1'/%3e%3cellipse cx='12.5' cy='12.5' rx='7' ry='3' fill='none' stroke='%23fff' stroke-width='1' transform='rotate(60 12.5 12.5)'/%3e%3cellipse cx='12.5' cy='12.5' rx='7' ry='3' fill='none' stroke='%23fff' stroke-width='1' transform='rotate(-60 12.5 12.5)'/%3e%3c/svg%3e");
          }
        }
        <!-- Maße -->
        .tab-content li.property-18 {
          &:before {
            background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25'%3e%3ccircle cx='12.5' cy='12.5' r='12.5' fill='%23d83300'/%3e%3crect x='5' y='9' width='15' height='7' rx='1' fill='none' stroke='%23fff' stroke-width='1.3'/%3e%3cline x1='8' y1='9' x2='8' y2='12' stroke='%23fff' stroke-width='1'/%3e%3cline x1='10.5' y1='9' x2='10.5' y2='11' stroke='%23fff' stroke-width='0.8'/%3e%3cline x1='13' y1='9' x2='13' y2='12' stroke='%23fff' stroke-width='1'/%3e%3cline x1='15.5' y1='9' x2='15.5' y2='11' stroke='%23fff' stroke-width='0.8'/%3e%3cline x1='18' y1='9' x2='18' y2='12' stroke='%23fff' stroke-width='1'/%3e%3c/svg%3e");
          }
        }
      </component>

      <!-- item description -->
      <div
        v-if="productGetters.getDescription(product)"
        class="
          [&_br]:hidden leading-[1.25]
          bg-primary-500 text-white ml-[-20px] mr-[-20px] px-[20px] py-[25px]
          [&_ul]:list-none [&_ul]:space-y-4 [&_ul]:pl-0
          [&_li]:relative [&_li]:pl-[30px] [&_li]:text-[14px]
          [&_li]:before:content-['✓']
          [&_li]:before:leading-[1]
          [&_li]:before:top-[-1px]
          [&_li]:before:text-primary-500
          [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-0.5
          [&_li]:before:w-[20px] [&_li]:before:h-[20px]
          [&_li]:before:bg-white [&_li]:before:rounded-full
          [&_li]:before:flex [&_li]:before:items-center [&_li]:before:justify-center
          [&_li]:before:text-[12px] [&_li]:before:font-bold
        "
      >
        <div v-html="productGetters.getDescription(product)"></div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { productGetters, reviewGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular, SfTooltip, SfLink } from '@storefront-ui/vue';
import type { PriceCardPadding, PurchaseCardProps } from '~/components/ui/PurchaseCard/types';
import type { PayPalAddToCartCallback } from '~/components/PayPal/types';
import { paths } from '~/utils/paths';

const { open, openDrawer } = useProductLegalDetailsDrawer();

const props = withDefaults(defineProps<PurchaseCardProps>(), {
  configuration: () => ({
    fields: {
      itemName: true,
      price: true,
      tags: true,
      availability: true,
      starRating: true,
      orderProperties: true,
      variationProperties: true,
      previewText: true,
      attributes: true,
      itemBundle: false,
      graduatedPrices: true,
      addToWishlist: true,
      quantityAndAddToCart: true,
      itemText: false,
      technicalData: false,
    },
    fieldsOrder: [
      'itemName',
      'price',
      'tags',
      'availability',
      'starRating',
      'variationProperties',
      'orderProperties',
      'previewText',
      'attributes',
      'itemBundle',
      'graduatedPrices',
      'addToWishlist',
      'quantityAndAddToCart',
      'itemText',
      'technicalData',
    ],
    fieldsDisabled: ['quantityAndAddToCart', 'price', 'itemBundle', 'attributes'],
    wishlistSize: 'small',

    dropShadow: true,
    borders: true,
    borderColor: '#EFF4F1',
    layout: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0,
      fullWidth: false,
    },
  }),
});

const { currentProduct } = useProducts();

const { data: productReviews } = useProductReviews(Number(productGetters.getItemId(currentProduct.value)));
const reviewAverage = computed(() => reviewGetters.getReviewCounts(productReviews.value));

const { getSetting } = useSiteSettings('dontSplitItemBundle');
const showBundleComponents = computed(() => {
  return getSetting() !== '1';
});

const { showNetPrices } = useCart();
const viewport = useViewport();
const { getCombination } = useProductAttributes();
const { getPropertiesForCart, getPropertiesPrice } = useProductOrderProperties();
const { validateAllFields, invalidFields, resetInvalidFields } = useValidatorAggregator('properties');
const {
  validateAllFields: validateAllFieldsAttributes,
  invalidFields: invalidAttributeFields,
  resetInvalidFields: resetAttributeFields,
} = useValidatorAggregator('attributes');
const { clear, send } = useNotification();
const { addToCart, loading } = useCart();
const quantitySelectorValue = ref(productGetters.getMinimumOrderQuantity(props?.product));
const { isWishlistItem } = useWishlist();
const { openQuickCheckout } = useQuickCheckout();
const { crossedPrice } = useProductPrice(props?.product);
const { reviewArea } = useProductReviews(Number(productGetters.getId(props?.product)));
const localePath = useLocalePath();

const inlineStyle = computed(() => {
  const layout = props?.configuration?.layout || ({} as PriceCardPadding);

  return {
    paddingTop: layout.paddingTop ? `${layout.paddingTop}px` : 0,
    paddingBottom: layout.paddingBottom ? `${layout.paddingBottom}px` : 0,
    paddingLeft: layout.paddingLeft ? `${layout.paddingLeft}px` : 0,
    paddingRight: layout.paddingRight ? `${layout.paddingRight}px` : 0,
    borderColor: props?.configuration?.borderColor || 'transparent',
  };
});

onMounted(() => {
  resetInvalidFields();
  resetAttributeFields();
});

onBeforeRouteLeave(() => {
  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) clear();
  resetInvalidFields();
  resetAttributeFields();
});

const priceWithProperties = computed(
  () =>
    (productGetters.getSpecialOffer(props?.product) ||
      productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.unitPrice.value ||
      productGetters.getPrice(props?.product) ||
      0) + getPropertiesPrice(props?.product),
);

const basePriceSingleValue = computed(
  () =>
    productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.basePrice ??
    productGetters.getDefaultBasePrice(props?.product),
);

const handleValidationErrors = (): boolean => {
  send({
    message: [
      t('error.missingOrWrongProperties'),
      '',
      ...invalidAttributeFields.value.map((field) => field.name),
      ...invalidFields.value.map((field) => field.name),
      '',
      t('error.pleaseFillOutAllFields'),
    ],
    type: 'negative',
  });

  return false;
};

const handleAddToCart = async (quickCheckout = true) => {
  await validateAllFieldsAttributes();
  await validateAllFields();

  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) {
    return handleValidationErrors();
  }

  if (!getCombination()) {
    send({ message: t('product.attributes.notValidVariation'), type: 'negative' });
    return false;
  }

  const addedToCart = await addToCart({
    productId: Number(productGetters.getId(props?.product)),
    quantity: Number(quantitySelectorValue.value),
    basketItemOrderParams: getPropertiesForCart(),
  });

  if (addedToCart) {
    quickCheckout
      ? openQuickCheckout(props?.product, quantitySelectorValue.value)
      : send({ message: t('addedToCart'), type: 'positive' });

    if (getSetting() === '0') {
      send({ message: t('error.notificationsItemBundleSplitted'), type: 'warning' });
    }
  }

  return addedToCart;
};

const paypalHandleAddToCart = async (callback: PayPalAddToCartCallback) => {
  const added = await handleAddToCart(false);

  callback(added);
};

const changeQuantity = (quantity: string) => {
  quantitySelectorValue.value = Number(quantity);
};

const isReviewsAccordionOpen = () => {
  const customerReviewsAccordionDetailsElement = document.querySelector('#customerReviewsAccordion')
    ?.firstChild as HTMLDetailsElement;

  return customerReviewsAccordionDetailsElement.open;
};

const openReviewsAccordion = () => {
  const customerReviewsClickElement = document.querySelector('#customerReviewsClick') as HTMLElement;
  customerReviewsClickElement?.click();
};

const isSalableText = computed(() => (productGetters.isSalable(props?.product) ? '' : t('itemNotAvailable')));
const isNotValidVariation = computed(() => (getCombination() ? '' : t('product.attributes.notValidVariation')));
const showPayPalButtons = computed(() => Boolean(getCombination()) && productGetters.isSalable(props?.product));

const scrollToReviews = () => {
  if (!isReviewsAccordionOpen()) {
    openReviewsAccordion();
  }

  if (reviewArea.value) {
    reviewArea.value.scrollIntoView({ behavior: 'smooth' });
  }
};

// Get variationProperty group ID 9 once (für Zusatzinformationen)
const additionalInfoGroup = computed(() => {
  const vp = props?.product?.variationProperties;
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
  const items = (additionalInfoGroup.value as ProductProperty[])
    .filter((prop) => allowedIdsForAdditionalInfo.includes(prop.id))
    .map((prop) => `<li class="flex items-center gap-[10px] odd:bg-[#F7F7F7] p-[10px] before:content-[''] before:w-[25px] before:h-[25px] before:bg-[#d83300] before:rounded-full before:flex before:items-center before:justify-center property-${prop.id} order-[${prop.position}]"><strong>${prop.names.name}:</strong> ${prop.values.value}</li>`)
    .join('');
  return `<ul class="flex flex-col">${items}</ul>`;
});

// Helper to get a property value by id
const getPropertyValue = (propertyId: number): string | null => {
  const properties = additionalInfoGroup.value;
  if (!properties) return null;
  
  const prop = properties.find(p => p.id === propertyId);
  if (!prop?.values) return null;
  
  const value = prop.values.value ?? prop.values;
  return (typeof value === "string") ? value : null;
};

// Helper to check if a property exists
const propertyExists = (propertyId: number): boolean => {
  return additionalInfoGroup.value?.some(p => p.id === propertyId) ?? false;
};

// Get EAN barcode
const eanBarcode = computed(() =>
  props?.product?.barcodes?.find((b: any) => b.id === 1 && b.code?.trim())
)

// Check if EAN barcode exists
const ean_code_exists = computed(() => !!eanBarcode.value)
</script>
  