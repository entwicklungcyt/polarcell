<template>
    <div class="pt-[35px] xl:pt-[60px] xl:pt-[100px] relative">
        <div class="w-screen -mx-[50vw] relative left-1/2 bg-[#0F4178] pb-[40px] lg:pb-0 overflow-hidden 3xl:min-h-[600px]">
            <div class="max-w-screen-3xl mx-auto text-white">
                <div class="grid gap-[30px] lg:grid-cols-2">
                    <div>
                        <img src="https://cdn02.plentymarkets.com/91tuepbzlonh/frontend/pwa/scientist.avif" loading="lazy" alt="" class="
                            w-full h-auto
                            3xl:absolute
                            3xl:left-1/2
                            3xl:top-0
                            3xl:right-0
                            3xl:bottom-0
                            3xl:contain
                            3xl:w-[50%]
                        ">
                    </div>
                    <div class="px-[20px] min-w-0 lg:flex lg:flex-col lg:justify-center lg:order-[-1] 3xl:min-h-[600px] 3xl:relative">
                        <div class="3xl:max-w-[700px] 3xl:mx-auto">
                            <Swiper
                                class="lg:min-w-0 hover:cursor-grab active:cursor-grabbing"
                                :modules="[Autoplay, Pagination]"
                                :pagination="{ clickable: true, el: '.custom-pagination-usp' }"
                                :slides-per-view="1"
                                :autoplay="enableAutoplay && { delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }"
                                :loop="true"
                                :speed="500"
                                >
                                <SwiperSlide v-for="item in uspItems" :key="item.title" class="flex items-center justify-center text-center">
                                    <div class="flex flex-col gap-[20px] xl:gap-[40px] 3xl:h-full">
                                        <h3 class="text-[36px] font-extrabold italic leading-[1.25] 2xl:text-[48px]" v-html="item.title"></h3>
                                        <p class="text-[18px] xl:text-[24px]" v-html="item.description"></p>
                                        <a :href="item.link" class="
                                            px-[20px] xl:px-[40px]
                                            3xl:mt-auto
                                            min-h-[40px] xl:min-h-[60px]
                                            inline-flex items-center self-center
                                            rounded-[20px] xl:rounded-[30px] border-[2px] xl:border-[3px] border-white
                                            uppercase font-extrabold italic xl:text-[18px]
                                            hover:bg-white hover:text-[#0F4178]
                                        ">{{ item.ctaText }}</a>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                            <div class="
                                custom-pagination-usp 
                                text-center 
                                pt-[20px] 
                                flex justify-center gap-[10px]
                            "></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    :deep(.swiper-pagination-bullet.swiper-pagination-bullet-active) {
        background-color: #0F4178;
    }
    
    :deep(.swiper-pagination-bullet) {
        background-color: #fff;
        opacity: 1;
        border: 1px solid white;
        width: 10px;
        height: 10px;
        margin: 0!important;
    }
</style>

<style>
    .swiper-wrapper {
        cursor: grab;
    }

    .swiper-wrapper:active {
        cursor: grabbing;
    }
</style>

<script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Autoplay, Pagination } from 'swiper/modules';
    import 'swiper/css';
    import 'swiper/css/pagination';

    const enableAutoplay = true;

    const uspItems = [
        {
            title: 'Umfangreiche Tests im Labor',
            description: 'Als einer der wenigen deutschen Akku-Fachhändler verfügen wir über ein eigenes Akkulabor. Jede Charge durchläuft eine strikte Qualitätssicherung.',
            ctaText: 'Mehr erfahren',
            link: '/unternehmen'
        },
        {
            title: 'Geprüfte Qualität. Maximale Sicherheit.',
            description: 'Akkumulatoren sind Gefahrgut und erfordern Expertise im Handel. Unser Motto: Ihr Vertrauen ist gut, unsere Kontrolle ist besser!',
            ctaText: 'Mehr erfahren',
            link: '/unternehmen'
        },
        {
            title: 'Kompetenz in Akkutechnologie seit 25 Jahren',
            description: 'Produktqualität und -sicherheit stehen bei uns an erster Stelle. Wir sind technisch ausgebildete Experten – seit knapp 25 Jahren.',
            ctaText: 'Mehr erfahren',
            link: '/unternehmen'
        }
    ];
</script>