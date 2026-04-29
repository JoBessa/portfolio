<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t('nav.projects'),
    icon: 'i-lucide-folder',
    to: localePath('/projects')
  }, {
    label: t('nav.about'),
    icon: 'i-lucide-file-text',
    to: '/blog'
  },
  {
    label: t('nav.contact'),
    icon: 'i-lucide-user',
    to: '/about'
  }])
</script>

<template>
  <div>
    <UContainer class="sm:border-x border-default">
      <AppHeader :links="navLinks" />
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>