<template>
    <div class="w-screen -mx-[50vw] relative left-1/2 pt-[35px] sm:pt-[45px] xl:pt-[60px] 2xl:pt-[100px] grid lg:grid-cols-3">
        <NuxtLink 
        v-for="category in HomeCategories" 
        :to="category.url" 
        class="text-white uppercase font-extrabold relative group"
        >
        <span class="block w-full aspect-[1000/650]">
            <img :src="category.img" loading="lazy" :alt="category.name" class="absolute inset-0 w-full h-full object-cover">
        </span>
        <span class="
            absolute bottom-0 left-0 right-0
            flex items-center justify-center
            pb-[20px] sm:pb-[40px]
            sm:text-[18px] lg:text-[14px] 2xl:text-[18px]
        ">
            <span class="
                border border-white border-[2px] 2xl:border-[3px]
                min-h-[40px] sm:min-h-[60px] lg:min-h-[40px] 2xl:min-h-[60px]
                rounded-[20px] sm:rounded-[30px] lg:rounded-[20px] 2xl:rounded-[30px]
                px-[20px] sm:px-[30px] lg:px-[20px] 2xl:px-[30px]
                flex justify-center items-center
                group-hover:bg-white group-hover:text-black transition-colors
            ">
            {{ category.name }}
            </span>
        </span>
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
    const HomeCategories = [
        {
            name: t('HomeCategories.01.name'),
            url: t('HomeCategories.01.url'),
            img: t('HomeCategories.01.img')
        },
        {
            name: t('HomeCategories.02.name'),
            url: t('HomeCategories.02.url'),
            img: t('HomeCategories.02.img')
        },
        {
            name: t('HomeCategories.03.name'),
            url: t('HomeCategories.03.url'),
            img: t('HomeCategories.03.img')
        },
    ]
</script>