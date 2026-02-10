<template>
  <footer data-testid="footer" class="bg-black text-white mt-[40px] xl:mt-[80px] 4xl:mt-[120px] [&_a:hover]:text-primary-500">
    <!-- Upper part -->
    <div class="
      p-[20px] pb-0 sm:pt-[40px] xl:pt-[70px]
      max-w-[600px] xl:max-w-screen-3xl
      mx-auto
      xl:flex xl:justify-between xl:items-start
    ">
      <!-- Block 1 -->
      <div class="grid gap-[10px] xl:gap-[15px] leading-[1.25] xl:min-w-[350px]">
        <div class="font-extrabold italic text-[18px]">{{ companyName }}</div>
        <p class="text-[14px] xl:leading-[1.5]">{{ t('Footer.Straße') }}<br>{{ t('Footer.PLZ Ort') }}</p>
        <span class="grid gap-[10px] pt-[10px] xl:gap-[20px] text-[18px] xl:text-[30px] xl:leading-[1] font-bold">
          <a :href="'tel:' + t('Footer.Hotline')" class="flex items-center gap-[10px] xl:gap-[20px]">
            <svg class="xl:w-[30px] xl:h-auto" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M15.085,20a13.657,13.657,0,0,1-3.062-.455A17.117,17.117,0,0,1,4.96,15.007,17.029,17.029,0,0,1,.474,8.05C.017,6.127-.337,4.19.533,2.592A5.133,5.133,0,0,1,3.568.123,3.909,3.909,0,0,1,5.9.262,1.642,1.642,0,0,1,6.972,1.388L8.159,5.742a1.632,1.632,0,0,1-.345,1.5L6.119,9.3v0a14.073,14.073,0,0,0,2.072,2.5,11.537,11.537,0,0,0,2.539,2.071L12.8,12.145a1.6,1.6,0,0,1,1.454-.306l4.354,1.188A1.644,1.644,0,0,1,19.738,14.1a3.907,3.907,0,0,1,.138,2.334,5.13,5.13,0,0,1-2.47,3.035A4.763,4.763,0,0,1,15.085,20" transform="translate(0 0)" fill="#00a4cc"/></svg>
            {{ t('Footer.Hotline') }}
          </a>
          <a :href="'mailto:' + t('Footer.Email')" class="flex items-center gap-[10px] xl:gap-[20px]">
            <svg class="xl:w-[30px] xl:h-auto" xmlns="http://www.w3.org/2000/svg" width="20" height="20.001" viewBox="0 0 20 20.001"><path d="M7.83,9.545a3.2,3.2,0,0,0,4.361,0l7.8-6.425A3.334,3.334,0,0,0,16.678,0H3.344A3.334,3.334,0,0,0,.033,3.121Z" transform="translate(-0.011)" fill="#00a4cc"/><path d="M13.876,14.883a6.04,6.04,0,0,1-3.859,1.465,6.166,6.166,0,0,1-3.882-1.456L0,9.837V19.946A3.343,3.343,0,0,0,3.333,23.28H16.667A3.343,3.343,0,0,0,20,19.946V9.837Z" transform="translate(0 -3.279)" fill="#00a4cc"/></svg>
            {{ t('Footer.Email') }}
          </a>
        </span>
        <small class="block text-[12px] xl:text-[14px] pt-[10px] flex flex-col [&_strong]:text-primary-500">
          <span v-html="rt('Footer.Service-Zeiten.1')"></span>
          <span v-html="rt('Footer.Service-Zeiten.2')"></span>
        </small>
      </div>

      <!-- Block 2 -->
      <div class="text-[14px] grid gap-[10px] leading-[1.25] pt-[30px] xl:pt-0 xl:flex xl:gap-[40px] 2xl:gap-[60px] 4xl:gap-[80px]">
        <!-- Account -->
        <div class="links flex flex-col">
          <input type="checkbox" id="pc-account-footer">
          <label for="pc-account-footer" class="flex min-h-[30px] flex items-center text-[18px] font-extrabold italic whitespace-nowrap">{{ t('account.heading') }}</label>
          <ul class="pb-[20px] leading-[2] whitespace-nowrap">
            <li><NuxtLink :to="localePath(paths.account)">{{ t('account.heading') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath(paths.accountMyOrders)">{{ t('account.ordersAndReturns.section.myOrders') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath(paths.accountReturns)">{{ t('account.ordersAndReturns.section.returns') }}</NuxtLink></li>
          </ul>
        </div>
        <!-- Information -->
        <div class="links flex flex-col">
          <input type="checkbox" id="my-information-footer">
          <label for="my-information-footer" class="flex min-h-[30px] flex items-center text-[18px] font-extrabold italic whitespace-nowrap">{{ t('Footer.Listen Überschriften.1') }}</label>
          <ul class="pb-[20px] leading-[2] whitespace-nowrap">
            <li><NuxtLink to="/herstellergarantie">{{ t('Footer.Link Titel.1') }}</NuxtLink></li>
            <li><NuxtLink to="/versandinformationen">{{ t('Footer.Link Titel.2') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath(paths.cancellationRights)">{{ t('legal.cancellationRights') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath(paths.legalDisclosure)">{{ t('legal.legalDisclosure') }}</NuxtLink></li>
            <!-- <li><NuxtLink :to="localePath(paths.declarationOfAccessibility)">{{ t('legal.declarationOfAccessibility') }}</NuxtLink></li> -->
            <li><NuxtLink to="/batterieentsorgung">{{ t('Footer.Link Titel.3') }}</NuxtLink></li>
          </ul>
        </div>
        <!-- About us -->
        <div class="links flex flex-col">
          <input type="checkbox" id="pc-about-us-footer">
          <label for="pc-about-us-footer" class="flex min-h-[30px] flex items-center text-[18px] font-extrabold italic whitespace-nowrap">{{ t('Footer.Listen Überschriften.2') }}</label>
          <ul class="pb-[20px] leading-[2] whitespace-nowrap">
            <li><NuxtLink to="/service">{{ t('Footer.Link Titel.4') }}</NuxtLink></li>
            <li><NuxtLink to="/unternehmen">{{ t('Footer.Link Titel.5') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath(paths.termsAndConditions)">{{ t('legal.termsAndConditions') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath(paths.privacyPolicy)">{{ t('legal.privacyPolicy') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath(paths.contact)">{{ t('contact.label') }}</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Block 3 -->
      <div class="xl:min-w-[350px] xl:flex">
        <div class="grid gap-[10px] leading-[1.25] pt-[40px] xl:pt-0 xl:ml-auto xl:grow-0">
          <p class="text-[18px] font-extrabold italic">{{ t('Footer.Sicherheit') }}</p>
          <div class="flex gap-[15px] 2xl:gap-[20px] pt-[10px] xl:grid xl:grid-cols-2">
            <img class="rounded-[50%] w-[70px] h-[70px]" src="https://placehold.co/140x140/fff/fff" alt="">
            <img class="rounded-[50%] w-[70px] h-[70px]" src="https://placehold.co/140x140/fff/fff" alt="">
            <img class="rounded-[50%] w-[70px] h-[70px]" src="https://placehold.co/140x140/fff/fff" alt="">
            <img class="rounded-[50%] w-[70px] h-[70px]" src="https://placehold.co/140x140/fff/fff" alt="">
          </div>
        </div>
      </div>
    </div>

    <!-- Lower part -->
    <div class="">
      <div class="
        xl:flex xl:items-center xl:gap-[60px]
        text-center sm:text-left
        px-[20px] py-[40px] xl:pt-[50px] xl:pb-[70px]
        text-[12px] sm:text-[14px]
        max-w-[600px] xl:max-w-screen-3xl
        mx-auto
      ">
        <ul class="flex xl:hidden flex-wrap gap-[10px] pb-[40px]">
          <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 1"></li>
          <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 2"></li>
          <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 3"></li>
          <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 4"></li>
          <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 5"></li>
          <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 6"></li>
          <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 7"></li>
          <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 8"></li>
          <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 9"></li>
        </ul>

        <svg class="mx-auto xl:ml-0 sm:hidden xl:flex xl:shrink-0" xmlns="http://www.w3.org/2000/svg" width="300" height="80" viewBox="0 0 300 80"><path d="M33.167,28.121c-2.141-1.754-6.379-1.718-9.534-1.718H8.549L7.034,32.195c1.181.763.733,1.986.415,3.2L3.61,50.09a3.963,3.963,0,0,1-2.093,3.2L0,59.091H14.045l1.517-5.8c-1.183-.763-.735-1.986-.317-3.586h4.108c9.464,0,12.806-3.854,14.433-10.069l.677-2.591c.226-.841,2.192-6.067-1.3-8.926m-10.5,9.917c-.8,3.05-1.117,4.761-4.531,4.761h-1.08l2.5-9.573h1.079c3.415,0,2.837,1.716,2.032,4.807" fill="#fff"/><path d="M86.535,48.52c-.539,2.06-.9,3.627-3.844,3.627h-1.13L85.945,35.4a3.972,3.972,0,0,1,2.094-3.2l1.516-5.792H75.507L73.992,32.2c1.183.764.733,1.986.415,3.2L70.57,50.09a3.973,3.973,0,0,1-2.092,3.2l-1.52,5.792h26.97l4.15-15.873H87.923Z" fill="#fff"/><path d="M56.737,25.755c-8.171,0-14.319,2.019-16.432,10.105l-3.6,13.773C34.589,57.718,39.68,59.74,47.848,59.74s14.328-2.022,16.431-10.107l3.6-13.769C70,27.777,64.907,25.755,56.737,25.755m-.259,9.571-3.87,14.8a3.041,3.041,0,0,1-2.914,2.555c-2.376,0-1.646-2.326-1.581-2.555l3.872-14.8a3.008,3.008,0,0,1,2.907-2.518c2.378,0,1.647,2.288,1.588,2.518" fill="#fff"/><path d="M130.4,50.093l.79-23.687H114.766L103.82,49.6c-.676,1.261-1.241,2.937-2.695,3.7l-1.519,5.792h12.258l1.518-5.792a1.3,1.3,0,0,1-1.131-1.457v0a1.262,1.262,0,0,1,.086-.331,4.584,4.584,0,0,1,.421-.953h6.556a3.183,3.183,0,0,1-.079.953,2.474,2.474,0,0,1-1.811,1.792l-1.517,5.792h14.071l1.517-5.8c-1.206-.341-1.161-2.173-1.108-3.2m-10.45-5.914h-4.781L120,34.489h.087Z" fill="#fff"/><path d="M255.732,48.532c-.541,2.06-.9,3.627-3.845,3.627h-1.13l4.38-16.743a3.974,3.974,0,0,1,2.093-3.205l1.521-5.8H244.706L243.188,32.2c1.181.764.733,1.985.416,3.2l-3.842,14.684a3.962,3.962,0,0,1-2.091,3.2l-2.008,5.791h27.459l4.15-15.872H257.116Z" fill="#fff"/><path d="M289.839,43.229l-1.382,5.295c-.537,2.06-.9,3.627-3.842,3.627h-1.13l4.381-16.742a3.975,3.975,0,0,1,2.088-3.2l1.522-5.8H277.425L275.914,32.2c1.183.764.732,1.985.416,3.205l-3.843,14.684a3.961,3.961,0,0,1-2.09,3.2l-1.516,5.791H295.85L300,43.226Z" fill="#fff"/><path d="M226.382,37.472h9.648l2.893-11.062H211.175L209.659,32.2c1.183.764.735,1.985.415,3.205l-3.835,14.682a3.973,3.973,0,0,1-2.093,3.2l-1.516,5.792h27.742l3.1-11.814h-9.649l-.28,1.066c-.743,2.671-1,3.814-4.455,3.814H217.4l1.729-6.6h7.3l1.665-6.37h-7.3l1.527-5.835H224c3.112,0,3.218.915,2.635,3.126Z" fill="#fff"/><path d="M168.892,27.7c-2.157-1.336-5.754-1.3-8.606-1.3H144.248l-1.519,5.792c1.182.764.734,1.986.416,3.2L139.3,50.081a3.969,3.969,0,0,1-2.09,3.2l-1.518,5.792h14.046l1.519-5.792c-1.185-.764-.737-1.986-.417-3.2l.807-2.818h.97c3.129.076,3.272.471,2.589,3.059-1.555,5.461-1.647,6.983-1.647,8.771h11.914l1.516-5.8c-1.3-.5-.879-2.1-.588-3.2l.494-1.868c.868-3.318.017-4.693-3.414-5.46l.02-.077a9.5,9.5,0,0,0,7.531-7.664c.78-2.979.468-5.759-2.141-7.323m-10.01,8.7a3.836,3.836,0,0,1-4.186,3.432h-1.164l1.746-6.675h1.166c2.508,0,2.987,1.143,2.438,3.241" fill="#fff"/><path d="M190.981,38.4H202.13l2.377-9.078a22.756,22.756,0,0,0-11.858-3.546,21.585,21.585,0,0,0-11.623,2.482,11.746,11.746,0,0,0-5.191,7.777L172.86,47.4c-.939,3.586-1.966,7.018.544,9.649,1.792,1.908,6.047,2.823,10.7,2.707a28.225,28.225,0,0,0,13.354-3.475l2.854-10.91H189.15l-.967,3.7c-.349,1.336-.644,3.627-3.067,3.627s-1.52-2.288-1.169-3.627l3.3-12.626c.347-1.335.647-3.627,3.063-3.627s1.52,2.289,1.171,3.627Z" fill="#fff"/><path d="M23.294,0,11.57,17.426h4.992l1.992-3.268h6.158l.179,3.268H29.6L27.558,0ZM20.53,10.927,24.2,4.919l.325,6.008Z" fill="#00a4cc"/><path d="M52.4,0H46.524L41.05,5.386l-2.06,2.07L41.081,0H36.54L31.688,17.425h4.529l1.246-4.44,2.531-2,2.155,6.438h5.177L43.72,7.886Z" fill="#00a4cc"/><path d="M70.2,0H64.324L58.85,5.386l-2.06,2.07L58.881,0H54.34L49.488,17.425h4.529l1.246-4.44,2.531-2,2.155,6.438h5.177L61.52,7.886Z" fill="#00a4cc"/><path d="M82.075,0,78.94,11.39q-.869,3.139-3.775,3.055a2.205,2.205,0,0,1-1.51-.527,1.8,1.8,0,0,1-.5-1.377,5.031,5.031,0,0,1,.126-1.138L76.408,0H71.853L68.718,11.381a5.294,5.294,0,0,0,.213,3.262,4.442,4.442,0,0,0,2.092,2.214,7.863,7.863,0,0,0,3.583.819,9.413,9.413,0,0,0,5.765-1.651,7.792,7.792,0,0,0,3.1-4.655L86.6,0Z" fill="#00a4cc"/><path d="M135.037,68.886a5.848,5.848,0,0,0-3.087-.794h-3.87L125.1,79.781h3.87a8.681,8.681,0,0,0,2.7-.418,8.1,8.1,0,0,0,2.32-1.177,7.774,7.774,0,0,0,1.766-1.795,6.986,6.986,0,0,0,1.057-2.287,5.147,5.147,0,0,0-.037-3.1,4.091,4.091,0,0,0-1.74-2.119m-.919,4.887-.009,0a3.95,3.95,0,0,1-.633,1.392,5.152,5.152,0,0,1-1.076,1.111,4.739,4.739,0,0,1-2.875.977h-1.056l1.7-6.616h1.147a3.5,3.5,0,0,1,1.772.409,2.2,2.2,0,0,1,.984,1.109,2.628,2.628,0,0,1,.045,1.621" fill="#fff"/><path d="M137.169,79.781h7.778l.653-2.472h-5.1l.578-2.22h4.169l.611-2.387h-4.18l.555-2.138h4.994l.62-2.472h-7.7Z" fill="#fff"/><path d="M156.958,68.607a4.269,4.269,0,0,0-2.178-.52h-4.555l-2.983,11.689h2.718l1-3.925h1.46l1.273,3.925h3.038l-1.56-4.353c.049-.019.1-.026.153-.047a5.308,5.308,0,0,0,1.873-1.318,4.529,4.529,0,0,0,1.047-1.946,3.336,3.336,0,0,0-.049-2.079,2.786,2.786,0,0,0-1.233-1.426m-1.836,4.048a1.9,1.9,0,0,1-.763.543,2.7,2.7,0,0,1-1,.174h-1.772l.717-2.839h1.89a1.407,1.407,0,0,1,1.026.348.986.986,0,0,1,.261.893,1.63,1.63,0,0,1-.362.87Z" fill="#fff"/><path d="M156.956,68.605l0,0h0Z" fill="#fff"/><path d="M172.284,68.623v-.005A4.214,4.214,0,0,0,170.1,68.1h-4.558l-2.981,11.691h2.716l.942-3.689h2.111a5.554,5.554,0,0,0,2.329-.493,5.261,5.261,0,0,0,1.829-1.363,4.939,4.939,0,0,0,1.052-2,3.5,3.5,0,0,0-.025-2.154,2.809,2.809,0,0,0-1.232-1.462m-1.773,4.1H170.5a2.28,2.28,0,0,1-.729.642,2.109,2.109,0,0,1-1.062.26h-1.849l.772-3.073h1.956a1.149,1.149,0,0,1,1.263,1.419,1.838,1.838,0,0,1-.344.752" fill="#fff"/><path d="M182.806,68.605l0,0h0Z" fill="#fff"/><path d="M182.807,68.608a4.244,4.244,0,0,0-2.177-.521h-4.555l-2.983,11.688h2.717l1-3.923h1.46l1.274,3.923h3.037l-1.559-4.351c.049-.019.1-.026.153-.047a5.31,5.31,0,0,0,1.873-1.319,4.538,4.538,0,0,0,1.047-1.947,3.327,3.327,0,0,0-.05-2.078,2.775,2.775,0,0,0-1.233-1.425m-1.836,4.036v.011a1.887,1.887,0,0,1-.765.544,2.708,2.708,0,0,1-1,.173H177.44l.716-2.839h1.891a1.4,1.4,0,0,1,1.025.347.989.989,0,0,1,.261.894,1.63,1.63,0,0,1-.362.87" fill="#fff"/><path d="M184.3,79.781h7.778l.653-2.472h-5.1l.578-2.22h4.169l.611-2.387H188.8l.555-2.138h4.994l.619-2.472h-7.695Z" fill="#fff"/><path d="M202.3,72.7l-2-4.608H197.35l-2.981,11.687h2.716l1.935-7.58,2.218,5.008,4.57-4.859-1.889,7.431h2.717l2.981-11.687H206.6Z" fill="#fff"/><path d="M209.1,79.781h2.718L214.8,68.092H212.08Z" fill="#fff"/><path d="M222.424,75.34a2.66,2.66,0,0,1-.579,1.126,2.925,2.925,0,0,1-1.035.77,3.284,3.284,0,0,1-1.357.273,1.812,1.812,0,0,1-1.016-.257,1.231,1.231,0,0,1-.518-.744,2.344,2.344,0,0,1,.049-1.168l1.841-7.249h-2.716l-1.84,7.249a4.352,4.352,0,0,0-.01,2.462,2.88,2.88,0,0,0,1.345,1.621,5.041,5.041,0,0,0,2.55.574,6.583,6.583,0,0,0,2.739-.552,5.459,5.459,0,0,0,2.051-1.594,6.6,6.6,0,0,0,1.212-2.513l1.84-7.249h-2.716Z" fill="#fff"/><path d="M234.226,72.7l-2-4.608h-2.953l-2.981,11.687h2.716l1.936-7.58,2.217,5.008,4.57-4.859-1.889,7.431h2.718l2.98-11.687h-3.02Z" fill="#fff"/><path d="M254.569,68.09H251.7L244.13,79.779h3.07l1.4-2.22h4.616l.277,2.22h2.726L254.613,68.09Zm-4.481,7.1,2.361-3.745.473,3.745Z" fill="#fff"/><path d="M270.919,68.092H267.29l-5.01,4.234,1.08-4.234h-2.7l-2.982,11.689h2.7l.927-3.635,1.039-.871,2.387,4.506h3.29l-3.457-6.365Z" fill="#fff"/><path d="M279.135,68.092l-5.01,4.234,1.079-4.234h-2.7l-2.98,11.689h2.7l.927-3.635,1.039-.871,2.386,4.506h3.291l-3.458-6.365,6.356-5.324Z" fill="#fff"/><path d="M291.352,68.092l-1.84,7.248a2.673,2.673,0,0,1-.577,1.126,2.93,2.93,0,0,1-1.038.768,3.283,3.283,0,0,1-1.355.275,1.818,1.818,0,0,1-1.017-.258,1.239,1.239,0,0,1-.517-.743,2.332,2.332,0,0,1,.05-1.168l1.84-7.248H284.18l-1.84,7.248a4.361,4.361,0,0,0-.008,2.462,2.875,2.875,0,0,0,1.345,1.62,5.051,5.051,0,0,0,2.549.575,6.576,6.576,0,0,0,2.738-.55,5.47,5.47,0,0,0,2.053-1.6,6.65,6.65,0,0,0,1.213-2.512l1.838-7.248Z" fill="#fff"/></svg>

        <div class="copy text-[12px] pt-[30px] sm:pt-0 xl:text-right">
          <ul class="hidden xl:flex xl:flex-wrap xl:justify-end xl:gap-[10px] xl:pb-[20px]">
            <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 1"></li>
            <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 2"></li>
            <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 3"></li>
            <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 4"></li>
            <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 5"></li>
            <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 6"></li>
            <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 7"></li>
            <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 8"></li>
            <li><img src="https://placehold.co/90x60/fff/fff" class="rounded-[5px] w-[45px] h-[30px]" loading="lazy" alt="Logo 9"></li>
          </ul>

          <span>
            &copy; {{ new Date().getFullYear() }} {{ companyName }} / {{ t('Footer.copyRight.3') }}
          </span>
          <span>
            <sup> *</sup>
            <i18n-t keypath="Footer.copyRight.1">
              <template #inclExcl>
                {{ showNetPrices ? t('product.priceExclVAT') : t('product.priceInclVAT') }}.
              </template>
              <template #Versandkosten>
                <NuxtLink to="/versandinformationen" class="underline">
                  {{ $t('common.labels.delivery') }}
                </NuxtLink>
              </template>
            </i18n-t>
          </span>
          <span><sup> **</sup>{{ t('Footer.copyRight.2', {currency: currency}) }}</span>
          <a class="2xl:block" href="https://www.createyourtemplate.com" target="_blank" title="Lösungen für den eCommerce - Online Shops, eBay Shops und Templates, Widgets, Design, Programmierung, Fullservice, Branding - createyourtemplate GmbH & Co. KG - Berlin, Germany">
            powered by <span class="text-primary-500 font-extrabold">createyourtemplate</span>
          </a>
        </div>
      </div>
    </div>

    <!-- viewport info when localhost -->
    <span v-if="isDev" class="bg-black text-white flex items-center justify-center fixed right-2 bottom-2 rounded-[50%] w-[30px] h-[30px] px-2 py-1 border border-neutral-200 z-[1000] font-bold text-xs">
      <span class="xs:hidden">XXS</span>
      <span class="hidden xs:block sm:hidden">XS</span>
      <span class="hidden sm:block md:hidden">SM</span>
      <span class="hidden md:block lg:hidden">MD</span>
      <span class="hidden lg:block xl:hidden">LG</span>
      <span class="hidden xl:block 2xl:hidden">XL</span>
      <span class="hidden 2xl:block 3xl:hidden">2XL</span>
      <span class="hidden 3xl:block 4xl:hidden">3XL</span>
      <span class="hidden 4xl:block">4XL</span>
    </span>
  </footer>
</template>

<style scoped>
.links {
  & ul {
    height: 0;
    transition: height 0.3s ease-in-out;
    margin: 0;
    padding: 0;
    overflow: hidden;
    opacity: 0;

    @media (min-width: 1280px) {
      height: auto;
      min-height: 0;
      opacity: 1;

      overflow: auto;
      padding-top: 15px;
    }

    > li {
      &:last-child {
        padding-bottom: 20px;

        @media (min-width: 1280px) {
          padding-bottom: 0;
        }
      }
    }
  }

  label {
    &::after {
      content: "";
      background: 0 no-repeat transparent url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3e%3cpath d='M8.948,0h-7.9A1.06,1.06,0,0,0,.111.553.96.96,0,0,0,.21,1.6l3.947,5a1.087,1.087,0,0,0,1.684,0L9.765,1.628A.965.965,0,0,0,10,1,1.026,1.026,0,0,0,8.948,0' transform='translate(0)' fill='%23fff'/%3e%3c/svg%3e");
      width: 10px;
      height: 7px;
      margin-left: auto;
      transition: transform 0.3s ease-in-out;

      @media (min-width: 1280px) {
        display: none;
      }
    }
  }
}

.links input[type="checkbox"] {
  display: none;
}

.links input[type="checkbox"]:checked {
  + label {
    &::after {
      transform: rotate(180deg);
      transition: transform 0.3s ease-in-out;
    }
    + ul {
      height: auto;
      min-height: 0;
      opacity: 1;
      transition: height, opacity 0.3s ease-in-out;
      overflow: auto;
    }
  }
}
</style>

<script setup lang="ts">
import { useCustomViewport } from '../../../composables/viewportSingleton'
// for currency dynamic test in footer
import { cartGetters } from '@plentymarkets/shop-api';

const customViewport = useCustomViewport()

const viewport = useViewport();
const localePath = useLocalePath();

const storename: string = useRuntimeConfig().public.storename;
const companyName: string = storename;

const isDev: boolean = useRuntimeConfig().public.isPreview || useRuntimeConfig().public.shopCore.apiUrl.includes('localhost');

// for currency dynamic test in footer
const { data: cart } = useCart();
const currency = computed(() => cartGetters.getCurrency(cart.value) || (useAppConfig().fallbackCurrency as string));

// for inkl/exkl VAT
const { showNetPrices } = useCart();

// for rich translation
import { useRichTranslation } from '../../../composables/useRichTranslation';
const { rt } = useRichTranslation();

// hide cookie annoyance when isDev
onMounted(() => {
  if (isDev) {
    const cookieBtn = document.querySelector('[data-testid="cookie-bar-open-btn"]') as HTMLElement | null;
    if (cookieBtn) cookieBtn.style.display = 'none';
  }
});
</script>
