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
                        <div>
                            <Swiper
                                class="lg:min-w-0"
                                :modules="[Autoplay, Pagination]"
                                :pagination="{ clickable: true, el: '.custom-pagination-usp' }"
                                :slides-per-view="1"
                                :autoplay="enableAutoplay && { delay: 8000, disableOnInteraction: false }"
                                :loop="true"
                                :speed="500"
                                >
                                <SwiperSlide v-for="item in uspItems" :key="item.title" class="flex items-center justify-center text-center">
                                    <div class="flex flex-col gap-[20px] xl:gap-[40px] 3xl:h-full">
                                        <h3 class="text-[36px] font-extrabold italic leading-[1.25] xl:text-[48px]" v-html="item.title"></h3>
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
                                3xl:absolute
                                3xl:left-0
                                3xl:right-0
                                3xl:!bottom-[50px]
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

<script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Autoplay, Pagination } from 'swiper/modules';
    import 'swiper/css';
    import 'swiper/css/pagination';

    const enableAutoplay = true;

    const uspItems = [
        {
            title: 'Deutsche Markenware',
            description: 'streng kontrolliert nach allen EU-Normen',
            ctaText: 'Mehr erfahren',
            link: '/unternehmen'
        },
        {
            title: 'Schneller Versand',
            description: 'Bestellen Sie noch vor 16:00 Uhr und erhalten Sie Ihre Ware schon am nächsten Werktag!',
            ctaText: 'Infos zum Versand',
            link: '/versandinformationen'
        },
        {
            title: '24 Monate Garantie',
            description: 'Wir gewähren 2 Jahre Garantie auf die mit dem Garantieversprechen beworbene Ware',
            ctaText: 'Mehr erfahren',
            link: '/herstellergarantie'
        },
        {
            title: 'Zuverlässige<br>Schutzschaltungs&shy;elektronik',
            description: 'für Ihre Sicherheit',
            ctaText: 'Mehr erfahren',
            link: '/unternehmen'
        },
        {
            title: 'Beste Qualitätszellen',
            description: 'für maximale Lebensdauer',
            ctaText: 'Mehr erfahren',
            link: '/unternehmen'
        },
        {
            title: 'Große Auswahl',
            description: 'speziell für alle gängigen Handymodelle',
            ctaText: 'Mehr erfahren',
            link: '/unternehmen'
        },
        {
            title: 'Längere Laufzeit',
            description: 'dank höherer Kapazität',
            ctaText: 'Mehr erfahren',
            link: '/unternehmen'
        }
    ];
</script>