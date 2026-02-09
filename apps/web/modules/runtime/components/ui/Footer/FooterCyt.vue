<template>
  <footer data-testid="footer" class="bg-black text-white mt-[40px] xl:mt-[80px] 4xl:mt-[120px]">
    <div class="flex justify-center items-center py-[20px]">Footer</div>
    <span v-if="isDev" class="bg-black text-white flex items-center justify-center fixed right-2 bottom-2 rounded-[50%] w-[30px] h-[30px] px-2 py-1 border border-neutral-200 z-[1000] font-bold text-xs">
      <span class="xs:hidden">XXS</span>
      <span class="hidden xs:block sm:hidden">XS</span>
      <span class="hidden sm:block md:hidden">SM</span>
      <span class="hidden md:block lg:hidden">MD</span>
      <span class="hidden lg:block xl:hidden">LG</span>
      <span class="hidden xl:block 2xl:hidden">XL</span>
      <span class="hidden 2xl:block 3xl:hidden">2XL</span>
      <span class="hidden 3xl:block 4xl:hidden">3XL</span>
      <span class="hidden 4xl:block">4XL</span>
    </span>
  </footer>
</template>


<style scoped>
</style>

<script setup lang="ts">
import { useCustomViewport } from '../../../composables/viewportSingleton'
// for currency dynamic test in footer
import { cartGetters } from '@plentymarkets/shop-api';

const customViewport = useCustomViewport()

const viewport = useViewport();
const localePath = useLocalePath();

const storename: string = useRuntimeConfig().public.storename;
const companyName: string = `© ${storename} ${new Date().getFullYear()}`;

const isDev: boolean = useRuntimeConfig().public.isPreview || useRuntimeConfig().public.shopCore.apiUrl.includes('localhost');

// for currency dynamic test in footer
const { data: cart } = useCart();
const currency = computed(() => cartGetters.getCurrency(cart.value) || (useAppConfig().fallbackCurrency as string));

// for inkl/exkl VAT
const { showNetPrices } = useCart();

</script>
