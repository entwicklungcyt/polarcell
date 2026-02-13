<template>
  <div class="group/tabs border-y border-[#E5E7EB] mt-[-1px]">
    <input class="hidden peer" type="checkbox" :name="dataId" :id="'tab-' + dataId">
    <label class="w-full flex cursor-pointer flex-row items-center gap-[10px] font-extrabold italic py-[15px]" :for="'tab-' + dataId">
      {{ dataName }}
      <svg class="group-has-[:checked]/tabs:rotate-180 transition-all duration-300 ml-auto" xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7"><path d="M8.948,0h-7.9A1.06,1.06,0,0,0,.111.553.96.96,0,0,0,.21,1.6l3.947,5a1.087,1.087,0,0,0,1.684,0L9.765,1.628A.965.965,0,0,0,10,1,1.026,1.026,0,0,0,8.948,0" transform="translate(0)"/></svg>
    </label>
    <div class="tab-content group-has-[:checked]/tabs:block hidden">
      <div class="[&_ul>br]:hidden pb-[30px]" :class="dataId === 'tab-technical-data' ? 'space-y-4 [&_p]:font-extrabold [&_p]:italic [&_p]:mb-[15px]' : ''" v-html="dataContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  dataContent: string | string[];
  dataId: string;
  dataName: string;
}>();
</script>