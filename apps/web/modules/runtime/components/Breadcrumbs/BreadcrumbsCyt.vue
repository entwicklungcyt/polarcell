<template>
    <div v-if="breadcrumbs.length">
      <ul class="
        text-[12px] md:text-[14px] font-bold
        flex gap-[8px]
        ml-[-20px] pl-[40px] mr-[-20px] pr-[20px] pt-[20px]
        scroll-smooth overflow-x-scroll scrollbar-hidden 
      ">
        <li v-for="(item, index) in breadcrumbs" :key="item.name" :class="{ 'text-primary-500': index === breadcrumbs.length - 1 }">
          <template v-if="item.link !== '#'">
            <a class="whitespace-nowrap flex items-center gap-[5px] before:content-[''] before:block before:w-[5px] before:h-[8px] before:bg-no-repeat before:bg-center hover:text-primary-500" :href="item.link">{{ item.name }}</a>
          </template>
        </li>
      </ul>
    </div>
</template>

<style scoped>
    a {
        &::before {
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='5' height='8' viewBox='0 0 5 8'%3e%3cpath d='M7.158,0H.842A.869.869,0,0,0,.088.4a.626.626,0,0,0,.079.748L3.325,4.715a.938.938,0,0,0,1.347,0L7.812,1.163A.648.648,0,0,0,8,.715.785.785,0,0,0,7.158,0' transform='translate(0 8) rotate(-90)'/%3e%3c/svg%3e");
        }
    }

    li {
        &:first-child {
            a::before {
                display: none;
            }
        }
    }
</style>

<script setup lang="ts">
defineProps<{
  breadcrumbs: Array<{
    name: string;
    link: string;
  }>;
}>();
</script>

