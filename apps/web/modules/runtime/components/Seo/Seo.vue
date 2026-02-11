<template>
    <div class="pt-[30px] xl:pt-[60px] 2xl:pt-[100px] md:grid md:grid-cols-2 gap-[20px] xl:gap-[40px] 2xl:gap-[70px]">
        <div class="hidden md:block">
            <img :src="$t('Seo.Bild')" loading="lazy" alt="" />
        </div>
        <div class="flex flex-col gap-[10px]">
            <h1 class="font-extrabold italic text-[18px] xl:text-[24px] 2xl:text-[30px] md:leading-[1]">{{ $t('Seo.Titel') }}</h1>
            <span class="mr-[-20px] ml-[-20px] md:mx-0 pt-[10px] md:hidden"><img :src="$t('Seo.Bild')" loading="lazy" alt="" /></span>
            <div v-html="rt('Seo.Beschreibung')" class="leading-[1.35] text-[14px] pt-[10px] xl:pt-[20px] 2xl:pt-[30px] xl:text-[16px] 2xl:text-[18px]" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useRichTranslation } from '../../composables/useRichTranslation';

    const { rt } = useRichTranslation();
</script>