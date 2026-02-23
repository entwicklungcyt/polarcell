<template>
    <Swiper
      class="bg-primary-500 !bg-black text-white text-[12px] lg:text-[14px] uppercase text-center"
      :modules="[Autoplay, EffectFade]"
      effect="fade"
      :slides-per-view="1"
      :autoplay="enableAutoplay && { delay: 8000, disableOnInteraction: false }"
      :loop="true"
      :speed="500"
    >
      <SwiperSlide v-slot="{ isActive }" :class="SwiperSlideClasses">
        <div :class="{ 'opacity-100': isActive }"><span class="font-bold">Polarcell</span> - {{ t('Header.Claim1') }}</div>
      </SwiperSlide>
      <SwiperSlide v-slot="{ isActive }" :class="SwiperSlideClasses">
        <div :class="{ 'opacity-100': isActive }" class="opacity-0"><span class="font-bold">{{ t('Header.Claim2a') }}</span> {{ t('Header.Claim2b') }}</div>
      </SwiperSlide>
    </Swiper>
</template>

<script setup lang="ts">
    import { Autoplay, EffectFade } from 'swiper/modules';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/effect-fade';

    const enableAutoplay = true;

    const SwiperSlideClasses = "bg-primary-500 flex items-center justify-center py-[6px]"
</script>