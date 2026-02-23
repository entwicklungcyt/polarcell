<template>
  <div>
    <UiSimplifiedHeader />
    <main>
      <slot />
    </main>
    <NuxtLazyHydrate when-idle>
      <UiFooter />
      <Cookiebar />
      <PreviewMode />
    </NuxtLazyHydrate>
  </div>
</template>

<script setup lang="ts">
usePageTitle();
useStructuredData().setLogoMeta();
</script>
