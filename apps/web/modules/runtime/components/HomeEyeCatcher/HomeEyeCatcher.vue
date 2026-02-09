<template>
  <div class="bg-black w-screen -mx-[50vw] relative left-1/2 text-white bg-[url('https://cdn02.plentymarkets.com/91tuepbzlonh/frontend/pwa/blackpanther_lg.avif')] bg-contain bg-right 2xl:bg-right-top 2xl:bg-[auto_75%] 4xl:bg-[auto_90%] bg-no-repeat">
    <div class="max-w-screen-3xl mx-auto px-[20px] pt-[10px] pb-[45px] lg:py-[80px]">
      <div class="flex flex-col">
        <div class="text-center uppercase lg:text-left">
          <h1 class="text-[48px] font-black italic leading-[1] lg:text-[8cqw] lg:leading-[8cqw] xl:text-[100px] xl:leading-[100px]">Polarcell</h1>
          <h2 v-if="viewport.isLessThan('lg')" class="text-[18px] font-extrabold italic text-primary-500 " v-html="formatText(t('HomeEyeCatcher.text1'))"></h2>
          <h2 v-else class="text-[18px] font-extrabold italic text-primary-500 lg:text-[8cqw] lg:leading-[8cqw] xl:text-[100px] xl:leading-[100px]" v-html="formatText(t('HomeEyeCatcher.text2'))"></h2>
          <h3 v-if="viewport.isGreaterOrEquals('lg')" class="font-extrabold italic text-[3cqw] xl:text-[33px]" v-html="formatText(t('HomeEyeCatcher.text3'))"></h3>
        </div>
        <ul v-if="viewport.isLessThan('lg')" class="flex flex-wrap items-center justify-center gap-[10px] pt-[30px]">
          <li v-for="(menuNode, index) in categoryTree">
            <NuxtLink :to="localePath(generateCategoryLink(menuNode))" class="bg-primary-500 text-white text-[14px] font-bold flex items-center justify-center px-[10px] rounded-[15px] min-h-[30px]">
              {{ categoryTreeGetters.getName(menuNode).replace(' - ', '-') }}
            </NuxtLink>
          </li>
        </ul>
        <div class="usps text-[12px] leading-[1.25] xl:leading-[1.5] lg:text-[1cqw] xl:text-[16px] 2xl:text-[18px] text-center pt-[50px] 2xl:pt-[180px]">
          <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(6,auto)] 2xl:flex justify-between gap-[20px]">
            <li class="flex flex-col items-center gap-[15px] xl:gap-[20px] 2xl:gap-[30px]">
              <svg class="h-[42px] w-auto xl:h-[60px] 2xl:h-[80px]" xmlns="http://www.w3.org/2000/svg" width="42.001" height="42" viewBox="0 0 42.001 42"><g transform="translate(0 0)"><path d="M21.9,0h0a6.662,6.662,0,0,1,2.422.459,6.812,6.812,0,0,1,4.189,6.387v5.82a.668.668,0,0,0,.668.667h3.241a9.6,9.6,0,0,1,4.653,1.1,9.414,9.414,0,0,1,3.955,4.092,9.29,9.29,0,0,1,.876,5.465l-1.429,10A9.336,9.336,0,0,1,31.233,42H16.008a5.982,5.982,0,0,1-3.337-1.018A5.974,5.974,0,0,1,9.338,42H6a6.008,6.008,0,0,1-6-6V19.333a6.008,6.008,0,0,1,6-6h6.321l3.4-9.052A6.633,6.633,0,0,1,21.9,0Zm9.331,40A7.336,7.336,0,0,0,38.5,33.7l1.429-10a7.3,7.3,0,0,0-.688-4.293,7.424,7.424,0,0,0-3.121-3.224,7.636,7.636,0,0,0-3.695-.853H29.181a2.671,2.671,0,0,1-2.668-2.667V6.846A4.8,4.8,0,0,0,23.6,2.323,4.671,4.671,0,0,0,21.9,2a4.624,4.624,0,0,0-4.31,2.983L13.71,15.333H6a4.006,4.006,0,0,0-4,4V36a4.006,4.006,0,0,0,4,4H9.338A3.992,3.992,0,0,0,12,38.973l.667-.6.667.6A4,4,0,0,0,16.008,40Z" fill="#00a4cc"/><path d="M1,25.384H-1V0H1Z" transform="translate(12.517 14.333)" fill="#00a4cc"/></g></svg>
              <span v-html="formatText(t('HomeEyeCatcher.usps.1'))"></span>
            </li>
            <li class="flex flex-col items-center gap-[15px] xl:gap-[20px] 2xl:gap-[30px]">
              <svg class="h-[42px] w-auto xl:h-[60px] 2xl:h-[80px]" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><path d="M1,0H41a1,1,0,0,1,1,1V11.909c0,7.807-1.889,14.049-5.776,19.081a30.418,30.418,0,0,1-6.531,6.171A54.037,54.037,0,0,1,21.429,41.9a1,1,0,0,1-.858,0,54.037,54.037,0,0,1-8.263-4.742A30.418,30.418,0,0,1,5.776,30.99C1.889,25.958,0,19.716,0,11.909V1A1,1,0,0,1,1,0ZM40,2H2v9.909C2,19.257,3.753,25.1,7.359,29.768a28.454,28.454,0,0,0,6.111,5.765A51.147,51.147,0,0,0,21,39.891a51.147,51.147,0,0,0,7.53-4.358,28.454,28.454,0,0,0,6.111-5.765C38.247,25.1,40,19.257,40,11.909Z" fill="#00a4cc"/><path d="M19.446,24.61a1,1,0,0,1-.707-.293l-7.273-7.273A1,1,0,0,1,12.88,15.63L19.446,22.2l10.2-10.2a1,1,0,0,1,1.414,1.414L20.153,24.317A1,1,0,0,1,19.446,24.61Z" fill="#00a4cc"/></svg>
              <span v-html="formatText(t('HomeEyeCatcher.usps.2'))"></span>
            </li>
            <li class="flex flex-col items-center gap-[15px] xl:gap-[20px] 2xl:gap-[30px]">
              <svg class="h-[42px] w-auto xl:h-[60px] 2xl:h-[80px]" xmlns="http://www.w3.org/2000/svg" width="42.005" height="42" viewBox="0 0 42.005 42"><g transform="translate(0.003 -0.001)"><path d="M25.8,42a4.08,4.08,0,0,1-1.8-.414l-3-1.455-3,1.455A4.08,4.08,0,0,1,16.2,42h0a4.111,4.111,0,0,1-3.532-1.989l-1.747-2.865L7.62,36.735a4.152,4.152,0,0,1-3.632-4.22l.067-3.368L1.489,26.995A4.181,4.181,0,0,1,.7,21.473l1.861-2.8-1-3.213a4.169,4.169,0,0,1,2.3-5.076l3.06-1.336L7.8,5.8a4.13,4.13,0,0,1,4.669-3.02l3.285.544,2.474-2.25a4.123,4.123,0,0,1,5.554,0l2.474,2.25,3.285-.544A4.13,4.13,0,0,1,34.2,5.8l.877,3.249,3.06,1.336a4.169,4.169,0,0,1,2.3,5.076l-1,3.213,1.861,2.8a4.181,4.181,0,0,1-.788,5.522l-2.565,2.153.067,3.368a4.152,4.152,0,0,1-3.632,4.22l-3.307.411-1.747,2.865A4.111,4.111,0,0,1,25.8,42ZM21,38.02a1,1,0,0,1,.436.1l3.437,1.667A2.1,2.1,0,0,0,25.8,40a2.125,2.125,0,0,0,1.825-1.03l2-3.277a1,1,0,0,1,.73-.472l3.785-.471a2.156,2.156,0,0,0,1.88-2.2l-.076-3.846a1,1,0,0,1,.357-.786l2.931-2.46a2.182,2.182,0,0,0,.409-2.882l-2.125-3.194a1,1,0,0,1-.122-.852l1.147-3.668a2.171,2.171,0,0,0-1.194-2.646l-3.5-1.528a1,1,0,0,1-.565-.656l-1-3.713a2.13,2.13,0,0,0-2.411-1.568L26.1,5.379a1,1,0,0,1-.836-.247L22.431,2.556a2.123,2.123,0,0,0-2.862,0L16.737,5.132a1,1,0,0,1-.836.247l-3.763-.623A2.13,2.13,0,0,0,9.726,6.324l-1,3.713a1,1,0,0,1-.565.656l-3.5,1.528a2.171,2.171,0,0,0-1.194,2.646l1.147,3.668a1,1,0,0,1-.122.852L2.366,22.581a2.182,2.182,0,0,0,.41,2.882l2.931,2.46a1,1,0,0,1,.357.786l-.076,3.846a2.156,2.156,0,0,0,1.88,2.2l3.784.471a1,1,0,0,1,.73.472l2,3.277A2.125,2.125,0,0,0,16.2,40h0a2.1,2.1,0,0,0,.922-.213l3.437-1.667A1,1,0,0,1,21,38.02Z" fill="#00a4cc"/><path d="M11.641,26.9V25.3a2.708,2.708,0,0,1,.288-1.161,5.476,5.476,0,0,1,.819-1.215A8.007,8.007,0,0,1,14,21.773l2.2-1.584a4.758,4.758,0,0,0,.764-.666,3.534,3.534,0,0,0,.568-.8,1.842,1.842,0,0,0,.216-.837,1.819,1.819,0,0,0-.261-.954,1.863,1.863,0,0,0-.738-.684,2.466,2.466,0,0,0-1.162-.252,2.359,2.359,0,0,0-1.088.243,2.275,2.275,0,0,0-.784.639,2.42,2.42,0,0,0-.431.864l-2.143-.4a3.863,3.863,0,0,1,.766-1.611,4.23,4.23,0,0,1,1.511-1.2,4.791,4.791,0,0,1,2.116-.45,5.153,5.153,0,0,1,2.312.486,3.538,3.538,0,0,1,2.043,3.294,3.506,3.506,0,0,1-.6,2.007,7.26,7.26,0,0,1-1.684,1.7l-2.016,1.494a4.644,4.644,0,0,0-.971.927,2.938,2.938,0,0,0-.523,1.053h5.958V26.9Z" fill="#00a4cc"/><path d="M27.193,26.9V24.2H21.361V22.547L27,14.3h2.2v8.081h2.34V24.2h-2.34v2.7Zm-3.618-4.519h3.618v-5.31Z" fill="#00a4cc"/></g></svg>
              <span v-html="formatText(t('HomeEyeCatcher.usps.3'))"></span>
            </li>
            <li class="flex flex-col items-center gap-[15px] xl:gap-[20px] 2xl:gap-[30px]">
              <svg class="h-[42px] w-auto xl:h-[60px] 2xl:h-[80px]" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><path d="M17.363,26.927a1,1,0,0,1-.286-.042,13.836,13.836,0,0,1-7.029-4.88,13.606,13.606,0,0,1-2.777-8.279,1,1,0,0,1,2,0A11.622,11.622,0,0,0,11.643,20.8a11.821,11.821,0,0,0,6,4.17,1,1,0,0,1-.285,1.959Z" fill="#00a4cc"/><path d="M24.637,26.927a1,1,0,0,1-.285-1.959,11.819,11.819,0,0,0,6-4.17,11.623,11.623,0,0,0,2.371-7.071,1,1,0,0,1,2,0,13.607,13.607,0,0,1-2.776,8.279,13.833,13.833,0,0,1-7.028,4.88A1,1,0,0,1,24.637,26.927Z" fill="#00a4cc"/><path d="M0,8.8a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V7.8A1,1,0,0,1,0,8.8Z" transform="translate(17.364 25.926)" fill="#00a4cc"/><path d="M5.455,1H0A1,1,0,0,1-1,0,1,1,0,0,1,0-1H5.455a1,1,0,0,1,1,1A1,1,0,0,1,5.455,1Z" transform="translate(11.909 33.727)" fill="#00a4cc"/><path d="M25.455,1H0A1,1,0,0,1-1,0,1,1,0,0,1,0-1H25.455a1,1,0,0,1,1,1A1,1,0,0,1,25.455,1Z" transform="translate(8.273 41)" fill="#00a4cc"/><path d="M0,13.727a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V12.727A1,1,0,0,1,0,13.727Z" transform="translate(8.273 1)" fill="#00a4cc"/><path d="M0,13.727a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V12.727A1,1,0,0,1,0,13.727Z" transform="translate(33.727 1)" fill="#00a4cc"/><path d="M40,1H0A1,1,0,0,1-1,0,1,1,0,0,1,0-1H40a1,1,0,0,1,1,1A1,1,0,0,1,40,1Z" transform="translate(1 1)" fill="#00a4cc"/><path d="M0,4.636a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V3.636A1,1,0,0,1,0,4.636Z" transform="translate(1 1)" fill="#00a4cc"/><path d="M0,4.636a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V3.636A1,1,0,0,1,0,4.636Z" transform="translate(41 1)" fill="#00a4cc"/><path d="M8.272,14.727a1,1,0,0,1-.446-.106,18.893,18.893,0,0,1-5.274-3.544A8.872,8.872,0,0,1,0,4.636a1,1,0,1,1,2,0A6.958,6.958,0,0,0,3.993,9.691,17.158,17.158,0,0,0,8.72,12.833a1,1,0,0,1-.448,1.895Z" fill="#00a4cc"/><path d="M33.728,14.727a1,1,0,0,1-.448-1.895,17.158,17.158,0,0,0,4.727-3.142A6.958,6.958,0,0,0,40,4.636a1,1,0,1,1,2,0,8.872,8.872,0,0,1-2.552,6.441,18.893,18.893,0,0,1-5.274,3.544A1,1,0,0,1,33.728,14.727Z" fill="#00a4cc"/><path d="M0,8.8a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V7.8A1,1,0,0,1,0,8.8Z" transform="translate(24.636 25.925)" fill="#00a4cc"/><path d="M5.455,1H0A1,1,0,0,1-1,0,1,1,0,0,1,0-1H5.455a1,1,0,0,1,1,1A1,1,0,0,1,5.455,1Z" transform="translate(24.636 33.727)" fill="#00a4cc"/><path d="M8.273,38.364a1,1,0,0,1-1-1,4.641,4.641,0,0,1,4.636-4.636,1,1,0,0,1,0,2,2.639,2.639,0,0,0-2.636,2.636A1,1,0,0,1,8.273,38.364Z" fill="#00a4cc"/><path d="M33.727,38.364a1,1,0,0,1-1-1,2.639,2.639,0,0,0-2.636-2.636,1,1,0,1,1,0-2,4.641,4.641,0,0,1,4.636,4.636A1,1,0,0,1,33.727,38.364Z" fill="#00a4cc"/><path d="M0,4.636a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V3.636A1,1,0,0,1,0,4.636Z" transform="translate(8.273 37.364)" fill="#00a4cc"/><path d="M0,4.636a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V3.636A1,1,0,0,1,0,4.636Z" transform="translate(33.727 37.364)" fill="#00a4cc"/></svg>
              <span v-html="formatText(t('HomeEyeCatcher.usps.4'))"></span>
            </li>
            <li class="flex flex-col items-center gap-[15px] xl:gap-[20px] 2xl:gap-[30px]">
              <svg class="h-[42px] w-auto xl:h-[60px] 2xl:h-[80px]" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><path d="M41,22a1,1,0,0,1-1-1A19.005,19.005,0,0,0,3.493,13.6,18.881,18.881,0,0,0,2,21a1,1,0,0,1-2,0,21.005,21.005,0,0,1,40.349-8.175A20.87,20.87,0,0,1,42,21,1,1,0,0,1,41,22Z" fill="#00a4cc"/><path d="M40,1H0A1,1,0,0,1-1,0,1,1,0,0,1,0-1H40a1,1,0,0,1,1,1A1,1,0,0,1,40,1Z" transform="translate(1 21)" fill="#00a4cc"/><path d="M15.545,42a6.462,6.462,0,0,1-6.454-6.455,1,1,0,0,1,2,0,4.455,4.455,0,1,0,8.909,0,1,1,0,0,1,2,0A6.462,6.462,0,0,1,15.545,42Z" fill="#00a4cc"/><path d="M0,15.545a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V14.545A1,1,0,0,1,0,15.545Z" transform="translate(21 21)" fill="#00a4cc"/></svg>
              <span v-html="formatText(t('HomeEyeCatcher.usps.5'))"></span>
            </li>
            <li class="flex flex-col items-center gap-[15px] xl:gap-[20px] 2xl:gap-[30px]">
              <svg class="h-[42px] w-auto xl:h-[60px] 2xl:h-[80px]" xmlns="http://www.w3.org/2000/svg" width="27" height="42" viewBox="0 0 27 42"><path d="M22.357,42H4.643A4.717,4.717,0,0,1,0,37.222V4.778A4.717,4.717,0,0,1,4.643,0H22.357A4.717,4.717,0,0,1,27,4.778V37.222A4.717,4.717,0,0,1,22.357,42ZM4.643,2A2.716,2.716,0,0,0,2,4.778V37.222A2.716,2.716,0,0,0,4.643,40H22.357A2.716,2.716,0,0,0,25,37.222V4.778A2.716,2.716,0,0,0,22.357,2Z" fill="#00a4cc"/><path d="M15,1H0V-1H15Z" transform="translate(6 8.273)" fill="#00a4cc"/><path d="M15,1H0V-1H15Z" transform="translate(6 14.523)" fill="#00a4cc"/><path d="M15,1H0V-1H15Z" transform="translate(6 20.773)" fill="#00a4cc"/><path d="M15,1H0V-1H15Z" transform="translate(6 27.023)" fill="#00a4cc"/><path d="M15,1H0V-1H15Z" transform="translate(6 33.273)" fill="#00a4cc"/></svg>
              <span v-html="formatText(t('HomeEyeCatcher.usps.6'))"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type CategoryTreeItem, categoryTreeGetters } from '@plentymarkets/shop-api';
import { HomeEyeCatcherProps } from './types';

const viewport = useViewport();

const props = defineProps<HomeEyeCatcherProps>();

const categoryTree = ref(categoryTreeGetters.getTree(props.categories));
const { buildCategoryMenuLink } = useLocalization();
const generateCategoryLink = (category: CategoryTreeItem) => {
  return buildCategoryMenuLink(category, categoryTree.value);
};

const localePath = useLocalePath();

// Helper function to convert [text] to <strong>text</strong> and + to <br>
const formatText = (text: string): string => {
  return text
    .replace(/\[([^\]]+)\]/g, '<span class="font-bold">$1</span>')
    .replace(/\+/g, '<br>');
};
</script>