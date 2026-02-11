<template>
  <div class="flex flex-col cursor-pointer h-full w-full" data-testid="product-card">
    <div class="relative overflow-hidden bg-black/[0.03] rounded-[5px] xl:rounded-[10px]">
      <!--
      <UiBadges
        :use-tags="useTagsOnCategoryPage"
        :class="['absolute', isFromWishlist ? 'mx-2' : 'm-2']"
        :product="product"
        :use-availability="isFromWishlist"
      />
      -->
      <SfLink
        :tag="NuxtLink"
        rel="preload"
        :to="productPath"
        :class="{ 'size-48': isFromSlider }"
        as="image"
        class="relative h-0 pb-[100%] block w-full"
      >
        <NuxtImg
          class="absolute top-0 left-0 w-full h-full object-contain text-white mix-blend-multiply"
          :src="imageUrl"
          :alt="imageAlt"
          :title="imageTitle"
          :loading="priority === false || (index !== undefined && index >= 4) ? 'lazy' : 'eager'"
          :fetchpriority="priority ? 'high' : 'auto'"
          :preload="priority || false"
          :width="getWidth()"
          :height="getHeight()"
          data-testid="image-slot"
        />
      </SfLink>
    </div>
    <div class="flex flex-col flex-auto text-[14px] md:text-[16px] lg:text-[18px] leading-[1.25] pt-[10px] sm:pt-[20px] xl:pt-[30px]" @click="navigateTo(productPath)">
      <div class="no-underline xl:text-[21px]" data-testid="productcard-name">{{ name }}</div>
      <div class="flex items-start mt-auto gap-[10px] pt-[5px]">
        <span class="block xl:text-[21px]" data-testid="product-card-vertical-price">
          <span class="font-extrabold">{{ format(price) }}</span>
        </span>
        <span v-if="crossedPrice" class="line-through xl:text-[16px]">
          {{ format(crossedPrice) }}
        </span>
      </div>
      <div class="text-[10px] xl:text-[12px] flex flex-wrap gap-x-[5px] pt-[5px] xl:pt-[10px] 2xl:pt-[15px]">
        <span :class="{ 'text-[#46BB00]' : product?.variation?.availability?.id == 1 }">{{ product?.variation?.availability?.names?.name }}</span>
        <span class="text-[#999]">
          {{ showNetPrices ? t('product.priceExclVAT') : t('product.priceInclVAT') }} {{ t('orderProperties.vat.plus') }} <NuxtLink class="underline text-black" @click.stop href="/shipping">{{ t('account.ordersAndReturns.orderDetails.delivery') }}</NuxtLink>
        </span>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { productGetters, productImageGetters } from '@plentymarkets/shop-api';
import { SfLink, SfIconShoppingCart, SfLoaderCircular, SfRating, SfCounter } from '@storefront-ui/vue';
import type { ProductCardProps } from '~/components/ui/ProductCard/types';
import { defaults } from '~/composables';
import type { ItemGridContent } from '~/components/blocks/ItemGrid/types';

interface Props {
  product: any;
  configuration?: ItemGridContent;
  index?: number;
  lazy?: boolean;
  priority?: boolean;
  isFromWishlist?: boolean;
  isFromSlider?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  configuration: () => ({
    cardBorders: true,
    contentAlignment: 'left',
    fields: {
      title: true,
      rating: true,
      previewText: false,
      price: true,
      addToCart: true,
      manufacturer: false,
    },
    fieldsOrder: ['title', 'manufacturer', 'rating', 'previewText', 'price', 'addToCart'],
    showWishlistButton: false,
    showSecondImageOnHover: false,
    addToCartStyle: 'primary',
    itemsPerRowDesktop: 4,
    itemsPerRowTablet: 3,
    itemsPerRowMobile: 1,
    showItemCount: true,
    itemCountPosition: 'center',
    fieldsDisabled: [],
    paginationPosition: 'bottom',
    layout: {
      fullWidth: false,
    },
  }),
  lazy: false,
  priority: undefined,
  isFromWishlist: false,
  isFromSlider: false,
});

const product = computed(() => props.product);

const configuration = computed(() => props.configuration || ({} as ItemGridContent));

const { addModernImageExtension } = useModernImage();
const localePath = useLocalePath();
const { format } = usePriceFormatter();
const { openQuickCheckout } = useQuickCheckout();
const { addToCart } = useCart();
const { price, crossedPrice } = useProductPrice(product.value);
const { send } = useNotification();
const loading = ref(false);
const config = useRuntimeConfig();
const useTagsOnCategoryPage = config.public.useTagsOnCategoryPage;

const name = computed(() => productGetters.getName(product.value) ?? '');
const manufacturer = computed(() => productGetters.getManufacturer(product.value));
const ratingCount = computed(() => productGetters.getTotalReviews(product.value));
const rating = computed(() => productGetters.getAverageRating(product.value, 'half'));
const shortDescription = computed(() => productGetters.getShortDescription(product.value) || '');
const canAddFromCategory = computed(() => productGetters.canBeAddedToCartFromCategoryPage(product.value));
const showFromText = computed(() => productGetters.showFromText(product.value));

const cover = computed(() => productGetters.getCoverImage(product.value));
const secondCover = computed(() => productGetters.getSecondCoverImage(product.value));
const firstImage = computed(() => productImageGetters.getFirstImage(product.value));

const imageUrl = computed(() => addModernImageExtension(cover.value));
const effectiveHoverImageUrl = computed(() => {
  if (!configuration.value?.showSecondImageOnHover) return '';
  const src = addModernImageExtension(secondCover.value);
  return src || '';
});

const imageAlt = computed(() => productImageGetters.getImageAlternate(firstImage.value) || name.value || '');
const imageTitle = computed(() => productImageGetters.getImageName(firstImage.value) || '');

const imageWidth = computed(() => productGetters.getImageWidth(product.value) || 600);
const imageHeight = computed(() => productGetters.getImageHeight(product.value) || 600);

const basePrice = computed(() => productGetters.getDefaultBasePrice(product.value));
const unitContent = computed(() => productGetters.getUnitContent(product.value));
const unitName = computed(() => productGetters.getUnitName(product.value));
const showBasePrice = computed(() => productGetters.showPricePerUnit(product.value));

const variationId = computed(() => productGetters.getVariationId(product.value));
const { isGlobalProductCategoryTemplate } = useProducts();
const productPath = computed(() => {
  if (isGlobalProductCategoryTemplate?.value) {
    return paths.globalItemDetails;
  }
  const basePath = `/${productGetters.getUrlPath(product.value)}_${productGetters.getItemId(product.value)}`;
  const shouldAppendVariation = variationId.value && productGetters.getSalableVariationCount(product.value) === 1;
  return localePath(shouldAppendVariation ? `${basePath}_${variationId.value}` : basePath);
});

const priority = computed(() => props.priority ?? ((props.index || 0) < 4));
const lazy = computed(() => props.lazy);
const isFromWishlist = ref(props.isFromWishlist || false);
const isFromSlider = ref(props.isFromSlider || false);

const getWidth = () => {
  if (imageWidth.value && imageWidth.value > 0 && imageUrl.value.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageWidth.value;
  }
  return '';
};

const getHeight = () => {
  if (imageHeight.value && imageHeight.value > 0 && imageUrl.value.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageHeight.value;
  }
  return '';
};

const addWithLoader = async (productId: number, quickCheckout = true) => {
  loading.value = true;
  try {
    await addToCart({ productId, quantity: 1 });
    if (quickCheckout) {
      openQuickCheckout(product.value, 1);
    } else {
      send({ message: t('addedToCart'), type: 'positive' });
    }
  } finally {
    loading.value = false;
  }
};
const differentPrices = (price: number, crossedPrice: number) => {
  return crossedPrice ? Math.round(price * 100) / 100 !== Math.round(crossedPrice * 100) / 100 : false;
};

const NuxtLink = resolveComponent('NuxtLink');

// variation properties helpers

// Check if a specific property exists in a group
const hasProperty = (groupId: number, propertyId?: number): boolean => {
  const group = props.product?.variationProperties?.find(
    (vp: any) => vp.id === groupId
  );
  
  if (!group?.properties?.length) return false;
  
  if (propertyId) {
    // Check for specific property ID
    const property = group.properties.find((prop: any) => prop.id === propertyId);
    return !!(property?.values?.value && property.values.value.trim() !== '');
  }
  
  // Check if any property has a value
  return group.properties.some((prop: any) => 
    prop.values?.value && prop.values.value.trim() !== ''
  );
};

// Get value from specific property
const getPropertyValue = (groupId: number, propertyId?: number): string => {
  const group = props.product?.variationProperties?.find(
    (vp: any) => vp.id === groupId
  );
  
  if (!group?.properties?.length) return '';
  
  let property;
  if (propertyId) {
    property = group.properties.find((prop: any) => prop.id === propertyId);
  } else {
    property = group.properties.find((prop: any) => 
      prop.values?.value && prop.values.value.trim() !== ''
    );
  }
  
  return property?.values?.value || '';
};

// for inkl/exkl VAT
const { showNetPrices } = useCart();
</script>