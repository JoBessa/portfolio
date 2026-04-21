// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/i18n'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'pt', name: 'Português', file: 'pt.json' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: 'i18n/'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})