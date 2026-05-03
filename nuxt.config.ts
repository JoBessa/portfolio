// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
    strict: true,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/turnstile'
  ],

  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'pt', name: 'Português', file: 'pt.json' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: 'i18n/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false
    },
  }
})
