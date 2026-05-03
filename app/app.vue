<script setup lang="ts">
const { t, locale } = useI18n()
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/images/signature-dark.png' }
  ],
  htmlAttrs: {
    lang: locale
  }
})

useSeoMeta({
  titleTemplate: '%s | Jonathan Bessa',
  ogImage: '/images/me-light.png',
  twitterImage: '/images/me-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage :transition="{
          name: 'page',
          mode: 'out-in'
        }" />
      </UMain>
    </NuxtLayout>
  </UApp>
</template>
