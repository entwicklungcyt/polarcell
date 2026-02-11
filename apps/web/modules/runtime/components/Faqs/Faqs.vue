<template>
    <div v-if="hasFaqs" class="pt-[35px] xl:pt-[60px] xl:pt-[100px] grid gap-[20px] xl:gap-[40px]">
        <h2 class="text-[18px] xl:text-[24px] 2xl:text-[30px] font-extrabold italic text-center">{{ $t('Faq.Title') }}</h2>
        <ul class="grid gap-[10px] xl:gap-[20px]">
            <template v-for="(faq, key) in faqs" :key="key">
                <li v-if="faq.question !== '' && faq.answer !== ''" class="group/faq bg-[#F7F7F7] rounded-[20px] sm:rounded-[30px] 3xl:rounded-[40px] px-[20px] xl:px-[30px] 3xl:px-[40px]">
                    <input type="checkbox" :id="`faq-${key}`" class="peer hidden" />
                    <label :for="`faq-${key}`" class="min-h-[40px] sm:min-h-[60px] 3xl:min-h-[80px] flex items-center font-bold xl:text-[18px] cursor-pointer leading-[1.2] py-[10px]">
                        <span v-html="faq.question" class="mr-auto"></span>
                        <svg class="transition-transform group-has-[:checked]/faq:rotate-180 shrink-0 xl:w-[14px] xl:h-auto" xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7"><path d="M8.948,0h-7.9A1.06,1.06,0,0,0,.111.553.96.96,0,0,0,.21,1.6l3.947,5a1.087,1.087,0,0,0,1.684,0L9.765,1.628A.965.965,0,0,0,10,1,1.026,1.026,0,0,0,8.948,0" transform="translate(0)"/></svg>
                    </label>
                    <p class="hidden peer-checked:block pb-[20px] xl:text-[18px] xl:pb-[30px] 3xl:pb-[40px] [&_a]:underline" v-html="faq.answer"></p>
                </li>
            </template>
        </ul>
    </div>
</template> 

<script lang="ts" setup>
import { computed } from 'vue';
import { useRichTranslation } from '../../composables/useRichTranslation';
const { rt } = useRichTranslation();

// 10 FAQs (only visible if text is not empty)
const faqs = [
    {
        question: rt('Faq.Faqs.01.question'),
        answer: rt('Faq.Faqs.01.answer')
    },
    {
        question: rt('Faq.Faqs.02.question'),
        answer: rt('Faq.Faqs.02.answer')
    },
    {
        question: rt('Faq.Faqs.03.question'),
        answer: rt('Faq.Faqs.03.answer')
    },
    {
        question: rt('Faq.Faqs.04.question'),
        answer: rt('Faq.Faqs.04.answer')
    },
    {
        question: rt('Faq.Faqs.05.question'),
        answer: rt('Faq.Faqs.05.answer')
    },
    {
        question: rt('Faq.Faqs.06.question'),
        answer: rt('Faq.Faqs.06.answer')
    },
    {
        question: rt('Faq.Faqs.07.question'),
        answer: rt('Faq.Faqs.07.answer')
    },
    {
        question: rt('Faq.Faqs.08.question'),
        answer: rt('Faq.Faqs.08.answer')
    },
    {
        question: rt('Faq.Faqs.09.question'),
        answer: rt('Faq.Faqs.09.answer')
    },
    {
        question: rt('Faq.Faqs.10.question'),
        answer: rt('Faq.Faqs.10.answer')
    }
]

const hasFaqs = computed(() => faqs.some(faq => faq.question.trim() !== '' && faq.answer.trim() !== ''));
</script>