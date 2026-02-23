<template>
  <div class="max-w-6xl mx-auto p-6 space-y-8">
    <h1 class="text-3xl font-extrabold italic text-primary-500">Versand & Lieferung nach {{ countries.find(c => c.code === selectedCountry)?.name }}</h1>

    <div class="space-y-4">
      <p class="text-gray-700">Bitte wählen Sie Ihr Lieferland.</p>
      
      <select 
        v-model="selectedCountry"
        class="
          w-full max-w-md px-4 py-3 
          border border-gray-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          bg-white text-gray-900
        "
      >
        <option 
          v-for="country in countries" 
          :key="country.code" 
          :value="country.code"
        >
          {{ country.name }}
        </option>
      </select>
    </div>

    <!-- Shipping Methods -->
    <div class="space-y-8">
      <!-- Shipping Method Cards -->
      <div 
        v-for="method in currentShippingMethods" 
        :key="method.name"
        class="bg-white border border-gray-200 rounded-lg p-6 space-y-4"
      >
        <h3 class="text-xl font-extrabold italic text-primary-500">{{ method.name }}</h3>
        
        <p class="text-gray-600 text-sm">{{ method.description }}</p>
        
        <img 
          :src="method.logo" 
          :alt="method.name"
          class="h-14 xl:h-16 border border-gray-200 rounded-md object-contain"
        >

        <!-- Pricing Table -->
        <div class="overflow-x-auto mx-[-1.5rem]">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-50">
                <th class="
                  text-left px-4 py-3 
                  text-sm font-extrabold italic text-gray-900
                  border-b border-gray-200
                ">
                  Zahlungsart
                </th>
                <th 
                  v-for="tier in method.tiers" 
                  :key="tier.value"
                  class="
                    text-left px-4 py-3 
                    text-sm font-extrabold italic text-gray-900
                    border-b border-gray-200
                  "
                >
                  Ab Warenwert {{ formatPrice(tier.value) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(payment, index) in method.payments" 
                :key="payment.name"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              >
                <td class="px-4 py-3 text-sm text-gray-900 border-b border-gray-100">
                  {{ payment.name }}
                </td>
                <td 
                  v-for="price in payment.prices" 
                  :key="price"
                  class="px-4 py-3 text-sm font-medium text-gray-900 border-b border-gray-100"
                >
                  {{ formatPrice(price) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Delivery Information -->
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
      <h4 class="text-lg font-extrabold italic">² Informationen zur Lieferfrist:</h4>
      
      <div class="space-y-4 text-sm text-gray-700 leading-relaxed">
        <div>
          <p class="font-extrabold italic mb-2">a. Informationen zu den Lieferzeiten:</p>
          <p>
            Wenn Sie bei uns im Rahmen einer Bestellung mehrere Artikel bestellen,
            für die unterschiedliche Lieferzeiten gelten, versenden wir die Ware in
            einer gemeinsamen Sendung, sofern wir mit Ihnen nichts anderes
            vereinbart haben. In diesem Fall gilt für die Warensendung insgesamt
            die Lieferzeit, die für den Artikel Ihrer Bestellung mit der längsten Lieferzeit gilt.
          </p>
        </div>

        <div>
          <p class="font-extrabold italic mb-2">b. Information zur Berechnung des Liefertermins:</p>
          <p>
            Die Frist für die Lieferung beginnt bei Zahlung per Vorkasse am Tag
            nach Erteilung des Zahlungsauftrags an das überweisende Kreditinstitut
            bzw. bei anderen Zahlungsarten am Tag nach Vertragsschluss zu laufen und
            endet mit dem Ablauf des letzten Tages der Frist. Fällt der letzte Tag
            der Frist auf einen Samstag, Sonntag oder einen am Lieferort staatlich
            anerkannten allgemeinen Feiertag, so tritt an die Stelle eines solchen Tages der nächste Werktag.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface Country {
  code: string
  name: string
}

interface PriceTier {
  value: number
}

interface PaymentMethod {
  name: string
  prices: number[]
}

interface ShippingMethod {
  name: string
  description: string
  logo: string
  tiers: PriceTier[]
  payments: PaymentMethod[]
}

interface ShippingData {
  [key: string]: ShippingMethod[]
}

const countries: Country[] = [
  { code: 'be', name: 'Belgien' },
  { code: 'dk', name: 'Dänemark' },
  { code: 'de', name: 'Deutschland' },
  { code: 'fr', name: 'Frankreich' },
  { code: 'ie', name: 'Irland' },
  { code: 'lu', name: 'Luxemburg' },
  { code: 'nl', name: 'Niederlande' },
  { code: 'no', name: 'Norwegen' },
  { code: 'at', name: 'Österreich' },
  { code: 'pl', name: 'Polen' },
  { code: 'pt', name: 'Portugal' },
  { code: 'ro', name: 'Rumänien' },
  { code: 'se', name: 'Schweden' },
  { code: 'ch', name: 'Schweiz' },
  { code: 'sk', name: 'Slowakei' },
  { code: 'sl', name: 'Slowenien' },
  { code: 'es', name: 'Spanien' },
  { code: 'hu', name: 'Ungarn' },
]

const selectedCountry = ref<string>('de')

const shippingData: ShippingData = {
  de: [
    {
      name: 'Standard Briefversand',
      description: 'Der Versand erfolgt per Deutsche Post Briefsendung (Lieferzeiten² in Tagen: Deutschland: 1-2 | EU: 2-8 | Weltweit: 5-25)',
      logo: 'https://cdn02.plentymarkets.com/91tuepbzlonh/frontend/Icons/shipping/deutsche-post.jpg',
      tiers: [{ value: 0 }, { value: 50 }, { value: 100 }],
      payments: [
        { name: 'Vorauskasse', prices: [0, 0, 0] },
        { name: 'PayPal Plus', prices: [0, 0, 0] },
        { name: 'PayPal Express', prices: [0, 0, 0] },
      ],
    },
    {
      name: 'Einschreiben',
      description: 'Der Versand erfolgt per Deutsche Post Einschreibensendung (Lieferzeiten² in Tagen: Deutschland: 1-2 | EU: 2-8 | Weltweit: 5-25)',
      logo: 'https://cdn02.plentymarkets.com/91tuepbzlonh/frontend/Icons/shipping/deutsche-post-einschreiben.jpg',
      tiers: [{ value: 0 }, { value: 50 }, { value: 100 }],
      payments: [
        { name: 'Vorauskasse', prices: [2.50, 0, 0] },
        { name: 'PayPal Plus', prices: [2.50, 0, 0] },
        { name: 'PayPal Express', prices: [2.50, 0, 0] },
      ],
    },
    {
      name: 'DHL',
      description: 'Der Versand erfolgt per DHL Paketsendung (Lieferzeiten² in Tagen: Deutschland: 1-2 | EU: 2-8 | Weltweit: 5-25)',
      logo: 'https://cdn02.plentymarkets.com/91tuepbzlonh/frontend/Icons/shipping/dhl.jpg',
      tiers: [{ value: 0 }, { value: 50 }, { value: 100 }],
      payments: [
        { name: 'Vorauskasse', prices: [5.90, 5.90, 0] },
        { name: 'PayPal Plus', prices: [5.90, 5.90, 0] },
        { name: 'PayPal Express', prices: [5.90, 5.90, 0] },
      ],
    },
    {
      name: 'Abholung',
      description: 'Holen Sie einfach Ihre Bestellung von unserem Lager in Berlin ab.',
      logo: 'https://cdn02.plentymarkets.com/91tuepbzlonh/frontend/Icons/shipping/abholer.jpg',
      tiers: [{ value: 0 }, { value: 50 }, { value: 100 }],
      payments: [
        { name: 'Vorauskasse', prices: [0, 0, 0] },
        { name: 'Bezahlung bei Abholung', prices: [0, 0, 0] },
        { name: 'PayPal Plus', prices: [0, 0, 0] },
        { name: 'PayPal Express', prices: [0, 0, 0] },
      ],
    },
  ],
  // Other countries - DHL only
  be: [createDHLMethod(12.90)],
  dk: [createDHLMethod(13.90)],
  fr: [createDHLMethod(12.90)],
  ie: [createDHLMethod(13.90)],
  lu: [createDHLMethod(12.90)],
  nl: [createDHLMethod(12.90)],
  no: [createDHLMethod(14.90)],
  at: [createDHLMethod(12.90)],
  pl: [createDHLMethod(12.90)],
  pt: [createDHLMethod(13.90)],
  ro: [createDHLMethod(12.90)],
  se: [createDHLMethod(13.90)],
  ch: [createDHLMethod(14.90)],
  sk: [createDHLMethod(12.90)],
  sl: [createDHLMethod(12.90)],
  es: [createDHLMethod(12.90)],
  hu: [createDHLMethod(14.90)],
}

function createDHLMethod(price: number): ShippingMethod {
  return {
    name: 'DHL',
    description: 'Der Versand erfolgt per DHL Paketsendung (Lieferzeiten² in Tagen: Deutschland: 1-2 | EU: 2-8 | Weltweit: 5-25)',
    logo: 'https://cdn02.plentymarkets.com/91tuepbzlonh/frontend/Icons/shipping/dhl.jpg',
    tiers: [{ value: 0 }],
    payments: [
      { name: 'Vorauskasse', prices: [price] },
      { name: 'PayPal Plus', prices: [price] },
      { name: 'PayPal Express', prices: [price] },
    ],
  }
}

const currentShippingMethods = computed(() => {
  return shippingData[selectedCountry.value] || []
})

function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
</script>