<template>
  <div class="overflow-clip">
    <UiHeader />
    <main class="max-w-screen-3xl mx-auto">
      <!-- breadcrumbs -->
      <div class="max-w-[940px] xl:max-w-full mx-auto">
        <BreadcrumbsCyt :breadcrumbs="breadcrumbs || []" />
      </div>
      <!-- content -->
      <slot />
    </main>
    <Cookiebar />
    <PreviewMode />
    <NuxtLazyHydrate when-visible>
      <UiFooter />
    </NuxtLazyHydrate>
    <QuickCheckout v-if="isOpen" :product="product" />
  </div>
</template>

<script setup lang="ts">
import type { DefaultLayoutProps } from '~/layouts/types';

defineProps<DefaultLayoutProps>();

const { setLogoMeta } = useStructuredData();
const { isOpen, product } = useQuickCheckout();
const viewport = useViewport();
const route = useRoute();

setLogoMeta();
</script>

<style lang="scss">
  body.bg-editor-body-bg {
    background-color: white;
  }

  body.hydrated {
    overflow-x: clip;
  }

  [data-testid="checkout-layout"],
  [data-testid="account-layout"] {
    max-width: 1640px;
    margin: 0 auto;
  }
</style>