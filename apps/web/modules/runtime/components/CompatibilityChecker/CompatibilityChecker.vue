<template>
  <div class="pt-[40px] xl:pt-[60px]">
    <button @click.stop.prevent="isOpen = true"
        class="
            flex items-center justify-center
            w-full px-[20px]
            border-[2px] border-primary-500 xl:border-[3px]
            rounded-[20px] xl:rounded-[30px]
            text-[14px] xl:text-[18px] text-primary-500
            min-h-[40px] xl:min-h-[60px]
        ">
      <span class="sm:hidden">{{ t('Produktseite.Kompatibilitäts-Checker.text1') }}</span>
      <span class="hidden sm:inline">{{ t('Produktseite.Kompatibilitäts-Checker.text2') }}</span>
      <strong class="flex items-center gap-[5px] xl:gap-[10px]">&nbsp;{{ t('Produktseite.Kompatibilitäts-Checker.button') }} <svg class="xl:w-[8px] xl:h-auto" xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10"><path d="M8.948,0h-7.9A1.1,1.1,0,0,0,.111.474a.729.729,0,0,0,.1.9L4.157,5.657a1.206,1.206,0,0,0,1.684,0L9.765,1.4A.762.762,0,0,0,10,.857.969.969,0,0,0,8.948,0" transform="translate(0 10) rotate(-90)" fill="#00a4cc"/></svg></strong>
    </button>

    <Teleport to="body">
      <!-- Backdrop -->
      <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/50" @click="isOpen = false" />
      </Transition>

      <!-- Panel -->
      <Transition name="slide">
        <div v-if="isOpen" class="fixed top-0 right-0 z-50 h-full w-[calc(100%-20px)] max-w-md bg-white shadow-xl ml-[20px]">
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 class="font-semibold">{{ t('Produktseite.Kompatibilitäts-Checker.title') }}</h2>
            <button @click.stop.prevent="isOpen = false">✕</button>
          </div>
          <div class="p-4 space-y-4 overflow-y-auto h-[calc(100%-57px)] technical-data [&_ul>br]:hidden" v-html="technicalData" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* Slide panel */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Backdrop fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Technical data styles */
.technical-data :deep(p) {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.technical-data :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.technical-data :deep(li) {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.technical-data :deep(li):last-child {
  border-bottom: none;
}

.technical-data :deep(li):nth-child(even) {
  background-color: #f9fafb;
}

.technical-data :deep(li)::before {
  content: '✓';
  color: #16a34a;
  font-weight: 700;
}
</style>

<script setup lang="ts">
const props = defineProps<{
  technicalData: string
}>()

const isOpen = ref(false)
</script>