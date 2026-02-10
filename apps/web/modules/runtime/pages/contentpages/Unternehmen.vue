<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <div class="text-center space-y-4">
      <h1 class="text-3xl md:text-4xl font-extrabold italic text-gray-900">
        Wannsee-Electronic
      </h1>
      <p class="text-xl text-primary-500 font-extrabold italic">
        Ihr Spezialist für mobile Energie
      </p>
    </div>

    <div class="space-y-6">
      <div class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg 
              class="w-6 h-6 text-primary-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <p class="text-gray-700 leading-relaxed flex-1">
            Wannsee-Electronic und die PolarCell Akkumarke stehen seit über 20 Jahren für Kompetenz und High-End Technologie in Sachen Akkumulatoren. Als einer der wenigen deutschen Akkuhändler verfügen wir über ein eigenes Akkuprüflabor, in welchem unser qualifiziertes Fachpersonal täglich dafür sorgt, dass Sie als Endkunde nur die hochwertigsten und sichersten Produkte erhalten.
          </p>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg 
              class="w-6 h-6 text-green-600" 
              fill="none" 
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <p class="text-gray-700 leading-relaxed flex-1">
            Profitieren Sie nicht nur von unserem technischen Know-How, sondern auch von unserer langjährigen Erfahrung im Onlinehandel. So bieten wir Ihnen eine einfache Abwicklung Ihrer Onlinebestellung, kurze Lieferzeiten sowie jederzeit einen unbürokratisch kundenorientierten Service, der keine Fragen offen lassen wird.
          </p>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-lg p-6 mt-8">
      <div class="flex items-center justify-center gap-8 flex-wrap">
        <div class="text-center">
          <p class="text-3xl font-extrabold italic text-primary-500">20+</p>
          <p class="text-sm text-gray-600">Jahre Erfahrung</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-extrabold italic text-primary-500">500k+</p>
          <p class="text-sm text-gray-600">Zufriedene Kunden</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-extrabold italic text-primary-500">100%</p>
          <p class="text-sm text-gray-600">Qualitätskontrolle</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const details = useCategoryDetails();
</script>