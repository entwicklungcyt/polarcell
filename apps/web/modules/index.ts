import { defineNuxtModule, addComponent, createResolver, extendPages, addImportsDir, addPlugin } from '@nuxt/kit';
import type { NuxtPage, AppConfig } from '@nuxt/schema';
import tailwindPlugin from 'tailwindcss/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';

export default defineNuxtModule({
  async setup(options, nuxt) {
    // Add custom fonts
    nuxt.options.app.head = nuxt.options.app.head || {};
    nuxt.options.app.head.link = nuxt.options.app.head.link || [];
    nuxt.options.app.head.link.push(
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      { 
        rel: 'stylesheet', 
        href: 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap'
      }
    );

    /**
     * register components
     */
    const {resolve} = createResolver(import.meta.url);

    const components = [
      {
        name: 'HomeEyeCatcher',
        path: 'HomeEyeCatcher/HomeEyeCatcher.vue',
        global: false,
      },
      {
        name: 'Ticker',
        path: 'Ticker/TickerCyt.vue',
        global: true,
      },
      {
        name: 'Finder',
        path: 'Finder/Finder.vue',
        global: false,
      },
      {
        name: 'SecondLevelCategories',
        path: 'SecondLevelCategories/SecondLevelCategories.vue',
        global: false,
      },
      {
        name: 'HomeCategories',
        path: 'HomeCategories/HomeCategories.vue',
        global: false,
      },
      {
        name: 'TrustedShops',
        path: 'TrustedShops/TrustedShops.vue',
        global: false,
      },
      {
        name: 'UspSlider',
        path: 'UspSlider/UspSlider.vue',
        global: false,
      },
      {
        name: 'Faqs',
        path: 'Faqs/Faqs.vue',
        global: false,
      },
      {
        name: 'Seo',
        path: 'Seo/Seo.vue',
        global: false,
      },
      {
        name: 'NavChildren',
        path: 'NavChildren/NavChildren.vue',
        global: false,
      },
      {
        name: 'NavChildrenLeft',
        path: 'NavChildren/NavChildrenLeft.vue',
        global: false,
      },
      {
        name: 'BreadcrumbsCyt',
        path: 'Breadcrumbs/BreadcrumbsCyt.vue',
        global: true,
      },
    ];

    for (const { name, path, global } of components) {
      await addComponent({
        name,
        filePath: resolve(`./runtime/components/${path}`),
        ...(global === false ? { global: false } : {}),
      });
    }

    // customJS (not needed at the moment)
    // addPlugin(resolve('./runtime/plugins/customJS'));

    /**
     * override components
     */
    nuxt.hook('components:extend', (components) => {
      // Header
      const Header = components.find((c) => c.pascalName === 'UiHeader');
      if (Header) {
        Header.filePath = resolve('./runtime/components/ui/Header/HeaderCyt.vue');
      }
      // MegaMenu
      const MegaMenu = components.find((c) => c.pascalName === 'MegaMenu');
      if (MegaMenu) {
        MegaMenu.filePath = resolve('./runtime/components/MegaMenu/MegaMenuCyt.vue');
      }
      // SimplifiedHeader
      const SimplifiedHeader = components.find((c) => c.pascalName === 'UiSimplifiedHeader');
      if (SimplifiedHeader) {
        SimplifiedHeader.filePath = resolve('./runtime/components/ui/SimplifiedHeaderCyt.vue');
      }
      // Search Input
      const Search = components.find((c) => c.pascalName === 'UiSearch');
      if (Search) {
        Search.filePath = resolve('./runtime/components/ui/SearchCyt.vue');
      }
      // ProductCard
      const ProductCard = components.find((c) => c.pascalName === 'UiProductCard');
      if (ProductCard) {
        ProductCard.filePath = resolve('./runtime/components/ui/ProductCard/ProductCardCyt.vue');
      }
      // ProductSlider
      const ProductSlider = components.find((c) => c.pascalName === 'ProductSlider');
      if (ProductSlider) {
        ProductSlider.filePath = resolve('./runtime/components/ProductSlider/ProductSliderCyt.vue');
      }
      // CategoryPageContent
      const CategoryPageContent = components.find((c) => c.pascalName === 'CategoryPageContent');
      if (CategoryPageContent) {
        CategoryPageContent.filePath = resolve('./runtime/components/CategoryPageContent/CategoryPageContentCyt.vue');
      }
      // NarrowContainer
      const NarrowContainer = components.find((c) => c.pascalName === 'NarrowContainer');
      if (NarrowContainer) {
        NarrowContainer.filePath = resolve('./runtime/components/NarrowContainer/NarrowContainerCyt.vue');
      }
      // CategorySorting
      const CategorySorting = components.find((c) => c.pascalName === 'CategorySorting');
      if (CategorySorting) {
        CategorySorting.filePath = resolve('./runtime/components/CategorySortings/CategorySortingCyt.vue');
      }
      // Footer
      const Footer = components.find((c) => c.pascalName === 'UiFooter');
      if (Footer) {
        Footer.filePath = resolve('./runtime/components/ui/Footer/FooterCyt.vue');
      }
      // Pagination
      const Pagination = components.find((c) => c.pascalName === 'UiPagination');
      if (Pagination) {
        Pagination.filePath = resolve('./runtime/components/ui/Pagination/PaginationCyt.vue');
      }
    });

    /**
     * override tailwindcss config
     */
    nuxt.hook('tailwindcss:config', (config) => {
      // Colors
      if (config?.theme?.extend?.colors) {
        (config.theme.extend.colors as any)['primary']['500'] = '#00A4CC';
        (config.theme.extend.colors as any)['secondary']['500'] = '#000';
      }

      // FontFamily
      if (config?.theme?.extend) {
        // Set Figtree as the default font
        config.theme.extend.fontFamily = {
          ...config.theme.extend.fontFamily,
          sans: ['Figtree', ...defaultTheme.fontFamily.sans],
          body: ['Figtree', ...defaultTheme.fontFamily.sans],
        };
      }

      // Screens
      if (config?.theme?.extend?.screens) {
        (config.theme.extend.screens as any).xxs = '320px';
        (config.theme.extend.screens as any).xs = '380px';
        (config.theme.extend.screens as any).sm = '640px';
        (config.theme.extend.screens as any).md = '768px';
        (config.theme.extend.screens as any).lg = '1024px';
        (config.theme.extend.screens as any).xl = '1280px';
        (config.theme.extend.screens as any)['2xl'] = '1440px';
        (config.theme.extend.screens as any)['3xl'] = '1640px';
        (config.theme.extend.screens as any)['4xl'] = '1840px';
      }
    });

    /**
     * override layouts
     */
    nuxt.hook('app:resolve', (app) => {
      // default
      app.layouts['default'] = {
        name: 'default',
        file: resolve('./runtime/layouts/defaultCyt.vue'),
      };
    });

    /**
     * override pages
     */
    extendPages((pages: NuxtPage[]) => {
      // console.log(pages);

      // Homepage
      const overrideHomePage = pages.find((p) => p.name === 'index');
      if (overrideHomePage) {
        overrideHomePage.file = resolve('./runtime/pages/homepage/indexCyt.vue');
      }

      // SearchPage
      const overrideSearchPage = pages.find((p) => p.name === 'search');
      if (overrideSearchPage) {
        overrideSearchPage.file = resolve('./runtime/pages/search/searchCyt.vue');
      }

      // CategoryPage
      const overrideCategoryPage = pages.find((p) => p.name === 'slug');
      if (overrideCategoryPage) {
        overrideCategoryPage.file = resolve('./runtime/pages/category/[...slug]Cyt.vue');
      }

      // Contentpages
      const customPages = [
        { name: 'unternehmen', file: 'Unternehmen.vue', path: '/unternehmen' },
        { name: 'herstellergarantie', file: 'Herstellergarantie.vue', path: '/herstellergarantie' },
        { name: 'versandinformationen', file: 'Versandinformationen.vue', path: '/versandinformationen' },
        { name: 'batterieentsorgung', file: 'Batterieentsorgung.vue', path: '/batterieentsorgung' },
        { name: 'service', file: 'Service.vue', path: '/service' },
      ];
      customPages.forEach(({ name, file, path }) => {
        pages.push({
          name,
          file: resolve(`./runtime/pages/contentpages/${file}`),
          path,
        });
      });
    });

    /**
     * extend i18n
     */
    nuxt.hook('i18n:registerModule', (register) => {
      register({
        langDir: resolve('./runtime/lang'),
        locales: [
          {
            code: 'de',
            file: 'de.json',
          },
        ],
      });
    });

    /**
     * add composable imports
     */
    addImportsDir(resolve('./runtime/composables'));

    /**
     * Override composables
     */
    nuxt.options.alias['~/composables/defaults'] = resolve(
      __dirname,
      './runtime/composables/defaultsCyt.ts'
    );
  },
});