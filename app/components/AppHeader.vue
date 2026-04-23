<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()

const colorMode = useColorMode()
const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))
const themeIcon = `i-lucide-${nextTheme === 'dark' ? 'sun' : 'moon'}`

const mobileMenuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'controls',
      slot: 'controls' as const,
      type: 'label' as const,
    },
  ],
  [
    {
      label: 'Dark Mode',
      icon: themeIcon,
      slot: 'theme' as const,
      type: 'label' as const,
    },
    {
      label: 'Télécharger mon CV',
      icon: 'i-lucide-download',
      to: '/cv.pdf',
      target: '_blank',
    },
    {
      label: 'GitHub',
      icon: 'i-lucide-github',
      to: 'https://github.com/jbessa',
      target: '_blank',
    },
  ],
])
</script>

<template>
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 -translate-x-1/2 z-10">

    <!-- Desktop -->
    <div
      class="hidden md:flex items-center bg-muted/80 backdrop-blur-sm rounded-md px-3 shadow-lg shadow-neutral-950/5">
      <UNavigationMenu :items="links" variant="link" color="primary"
        :ui="{ link: 'px-2 py-1', linkLeadingIcon: 'hidden' }" highlight highlight-color="primary" />
      <USeparator orientation="vertical" class="h-4 mx-2 opacity-30" />
      <UButton to="/cv.pdf" target="_blank" icon="i-lucide-download" label="CV" variant="ghost" size="sm"
        color="primary" />
      <LangSelector />
      <ColorModeButton />
      <UButton to="https://github.com/jbessa" target="_blank" icon="i-lucide-github" variant="ghost" size="sm" />
    </div>

    <!-- Mobile -->
    <div
      class="flex md:hidden items-center bg-muted/80 backdrop-blur-sm rounded-md px-3 shadow-lg shadow-neutral-950/5">
      <UNavigationMenu :items="links" variant="link" color="primary"
        :ui="{ link: 'px-2 py-1', linkLeadingIcon: 'hidden' }" highlight highlight-color="primary" />
      <USeparator orientation="vertical" class="h-4 mx-2 opacity-30" />
      <MobileMenu />
    </div>

  </div>
</template>