<template>
  <nav v-if="pagination.totalPages > 1"
    class="flex gap-[10px] items-center justify-center pt-[40px] lg:pt-[60px] text-[14px] md:text-[16px] xl:text-[18px] font-bold xl:pl-[270px] 2xl:pl-[405px]"
    role="navigation"
    :aria-label="t('common.labels.pagination')"
    data-testid="pagination"
  >
    <UiButton
      size="lg"
      :aria-label="t('common.navigation.previousAriaLabel')"
      :disabled="pagination.selectedPage <= 1 || disabled"
      variant="tertiary"
      class="flex items-center justify-center !w-[40px] !h-[40px] md:!w-[50px] md:!h-[50px] !rounded-[20px] md:!rounded-[25px] !bg-[#F7F7F7] !p-0 disabled:opacity-50 disabled:cursor-not-allowed"
      data-testid="pagination-previous"
      @click="previousPage"
    >
      <template #prefix>
        <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="8" height="11" viewBox="0 0 8 11"><path d="M9.843,0H1.158A1.16,1.16,0,0,0,.122.632a1.131,1.131,0,0,0,.109,1.2L4.573,7.543a1.168,1.168,0,0,0,1.853,0l4.317-5.682A1.128,1.128,0,0,0,11,1.143,1.15,1.15,0,0,0,9.843,0" transform="translate(8) rotate(90)"/></svg>
      </template>
    </UiButton>
    <ul class="flex items-center justify-center gap-[10px]">
      <li v-if="!pagination.pages.includes(1)">
        <div
          :class="[
            'flex',
            { 'font-medium border-t-4 !border-primary-500': pagination.selectedPage === 1 },
          ]"
        >
          <button
            type="button"
            :class="[
              'flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-[20px] md:rounded-[25px] bg-[#F7F7F7]',
              {
                'hover:bg-black hover:text-white active:bg-black active:text-white': !disabled,
              },
            ]"
            :aria-current="pagination.selectedPage === 1 || disabled"
            :aria-label="getAriaLabel(pagination.selectedPage === 1 || disabled, 1)"
            @click="setPage(1)"
          >
            1
          </button>
        </div>
      </li>
      <li v-if="pagination.startPage > 2">
        <div class="flex">
          <button type="button" disabled aria-hidden="true" class="flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-[20px] md:rounded-[25px] bg-[#F7F7F7]">
            ...
          </button>
        </div>
      </li>
      <li v-if="shouldDisplayPreviousLink">
        <div class="flex">
          <button
            type="button"
            :class="[
              'flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-[20px] md:rounded-[25px] bg-[#F7F7F7]',
              {
                'hover:bg-black hover:text-white active:bg-black active:text-white': !disabled,
              },
            ]"
            :aria-current="pagination.endPage - 1 === pagination.selectedPage"
            :aria-label="getAriaLabel(pagination.endPage - 1 === pagination.selectedPage, pagination.endPage - 1)"
            :disabled="disabled"
            @click="setPage(pagination.endPage - 1)"
          >
            {{ pagination.endPage - 1 }}
          </button>
        </div>
      </li>
      <li v-for="page in pagination.pages" :key="`page-${page}`">
        <div
          :class="[
            'flex border-transparent',
            { 'font-medium !border-primary-500': pagination.selectedPage === page },
          ]"
        >
          <button
            type="button"
            :class="[
              'flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-[20px] md:rounded-[25px] bg-[#F7F7F7]',
              {
                'hover:bg-black hover:!text-white active:bg-black active:text-white': !disabled,
              },
              {
                '!bg-black !text-white hover:!text-white active:!text-white': pagination.selectedPage === page,
              },
            ]"
            :aria-current="pagination.selectedPage === page"
            :aria-label="getAriaLabel(pagination.selectedPage === page, page)"
            :disabled="disabled"
            @click="setPage(page)"
          >
            {{ page }}
          </button>
        </div>
      </li>
      <li v-if="shouldDisplayNextLink">
        <div class="flex">
          <button
            type="button"
            :class="[
              'flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-[20px] md:rounded-[25px] bg-[#F7F7F7]',
              {
                'hover:bg-black hover:text-white active:bg-black active:text-white': !disabled,
              },
            ]"
            :aria-label="t('goToPage', { page: 2 })"
            :disabled="disabled"
            @click="setPage(2)"
          >
            2
          </button>
        </div>
      </li>
      <li v-if="pagination.endPage < pagination.totalPages - 1">
        <div class="flex">
          <button type="button" disabled aria-hidden="true" class="flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-[20px] md:rounded-[25px] bg-[#F7F7F7]">
            ...
          </button>
        </div>
      </li>
      <li v-if="!pagination.pages.includes(pagination.totalPages)">
        <div
          :class="[
            'flex',
            { 'font-medium border-t-4 !border-primary-500': pagination.selectedPage === pagination.totalPages },
          ]"
        >
          <button
            type="button"
            :class="[
              'flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-[20px] md:rounded-[25px] bg-[#F7F7F7]',
              {
                'hover:bg-black hover:text-white active:bg-black active:text-white': !disabled,
              },
            ]"
            :aria-current="pagination.totalPages === pagination.selectedPage"
            :aria-label="getAriaLabel(pagination.totalPages === pagination.selectedPage, pagination.selectedPage)"
            :disabled="disabled"
            @click="setPage(pagination.totalPages)"
          >
            {{ pagination.totalPages }}
          </button>
        </div>
      </li>
    </ul>
    <UiButton
      size="lg"
      :aria-label="t('common.navigation.nextAriaLabel')"
      :disabled="pagination.selectedPage >= pagination.totalPages || disabled"
      variant="tertiary"
      class="flex items-center justify-center !w-[40px] !h-[40px] md:!w-[50px] md:!h-[50px] !rounded-[20px] md:!rounded-[25px] !bg-[#F7F7F7] !p-0 disabled:opacity-50 disabled:cursor-not-allowed"
      data-testid="pagination-next"
      @click="nextPage"
    >
      <template #suffix>
        <svg class="shrink-0 rotate-180" xmlns="http://www.w3.org/2000/svg" width="8" height="11" viewBox="0 0 8 11"><path d="M9.843,0H1.158A1.16,1.16,0,0,0,.122.632a1.131,1.131,0,0,0,.109,1.2L4.573,7.543a1.168,1.168,0,0,0,1.853,0l4.317-5.682A1.128,1.128,0,0,0,11,1.143,1.15,1.15,0,0,0,9.843,0" transform="translate(8) rotate(90)"/></svg>
      </template>
    </UiButton>
  </nav>
</template>

<script setup lang="ts">
import { SfIconChevronLeft, SfIconChevronRight, usePagination } from '@storefront-ui/vue';
import { nextTick } from 'vue';
import type { PaginationProps } from '~/components/ui/Pagination/types';

const { updatePage } = useCategoryFilter();

const {
  currentPage,
  currentPageName = 'page',
  pageSize,
  totalItems,
  maxVisiblePages: maxVisiblePagesProperty,
  disabled = false,
} = defineProps<PaginationProps>();

const pagination = computed(() =>
  reactive(
    usePagination({
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      maxPages: maxVisiblePagesProperty,
    }),
  ),
);

const getAriaLabel = (isCurrent: boolean, page: number) => {
  return t(isCurrent ? 'common.navigation.currentPage' : 'common.navigation.goToPage', { page });
};

const setPage = (page: number) => {
  updatePage(page.toString(), currentPageName);
  pagination.value.setPage(page);
  
  nextTick(() => {
    window.scrollTo(0, 0);
  });
};

const previousPage = () => {
  setPage(pagination.value.selectedPage - 1);
};

const nextPage = () => {
  setPage(pagination.value.selectedPage + 1);
};

const shouldDisplayPreviousLink: boolean =
  maxVisiblePagesProperty === 1 &&
  pagination.value.totalPages > 1 &&
  pagination.value.selectedPage === pagination.value.totalPages;

const shouldDisplayNextLink: boolean =
  maxVisiblePagesProperty === 1 && pagination.value.totalPages > 1 && pagination.value.selectedPage === 1;
</script>
