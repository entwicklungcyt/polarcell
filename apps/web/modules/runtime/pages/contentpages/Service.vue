<template>
  <div class="max-w-7xl mx-auto p-6 space-y-8">
    <h1 class="text-3xl font-extrabold italic text-primary-500 text-center">
      Unser Service für Sie
    </h1>

    <h2 class="text-xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
      Bei uns ist Ihre Bestellung in besten Händen, über 500.000 Kunden bestätigen, wir sind:
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
      <div 
        v-for="(service, index) in services" 
        :key="index"
        class="
          bg-white border border-gray-200 rounded-lg p-6
          hover:shadow-lg hover:border-primary-300 transition-all duration-300
          group
        "
      >
        <h3 class="
          text-lg font-extrabold italic text-primary-500 mb-3
          group-hover:text-primary-600
        ">
          {{ service.title }}
        </h3>
        <p class="text-gray-700 text-sm leading-relaxed">
          {{ service.description }}
        </p>
      </div>
    </div>

    <div class="bg-primary-50 border border-primary-200 rounded-lg p-6 mt-12 text-center">
      <p class="text-gray-800 font-medium">
        Überzeugen Sie sich selbst von unserem erstklassigen Service und werden Sie Teil unserer zufriedenen Kundenfamilie!
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
    interface Service {
        title: string
        description: string
    }

    const services: Service[] = [
    {
        title: 'Schnell',
        description: 'Bestellungen mit Zahlung per Paypal vor 16 Uhr werden noch am selben Werktag versendet',
    },
    {
        title: 'Kompetent',
        description: 'Wir sind seit über 20 Jahren ausschließlich auf Akkutechnologien spezialisiert',
    },
    {
        title: 'Verlässlich',
        description: 'E-Mail Support innerhalb von 24 Stunden, selbstverständlich auch nach Kaufabschluss',
    },
    {
        title: 'Persönlich',
        description: 'Wir sind auch gerne telefonisch für Sie da und helfen weiter',
    },
    {
        title: 'Korrekt',
        description: 'Selbstverständlich Rechnung auf Ihren Namen mit ausgewiesener MwSt, auch bei Verbrauchern',
    },
    {
        title: 'PreisWERT',
        description: 'Spitzenqualität direkt vom Hersteller ohne Zwischenhändler zu fairen Preisen',
    },
    {
        title: 'Echt',
        description: 'Bei uns bekommen Sie keinen gefälschten Schund sondern geprüfte Markenware',
    },
    {
        title: 'Unkompliziert',
        description: 'Probleme lösen wir stets unbürokratisch und auf sinnvollstem Weg',
    },
    {
        title: 'Überzeugt',
        description: 'Dass auch Sie mit unserer Ware mehr als zufrieden sein werden!',
    },
    ]
</script>