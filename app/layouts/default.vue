<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t('nav.home'),
    icon: 'i-lucide-home',
    to: '/',
    class: 'sm:hidden'
  },
  {
    label: t('nav.projects'),
    icon: 'i-lucide-folder',
    to: '/projects'
  }, {
    label: t('nav.about'),
    icon: 'i-lucide-file-text',
    to: '#about'
  },
  {
    label: t('nav.contact'),
    icon: 'i-lucide-user',
    to: '#contact'
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