<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()
</script>

<template>
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 -translate-x-1/2 z-10">
    <div
      class="flex items-center bg-muted/80 backdrop-blur-sm rounded-md px-3 py-1 shadow-lg shadow-neutral-950/5">
      <ULink to="/" class="p-0 mr-8">
         <UColorModeImage light="/images/signature-light.png" dark="/images/signature-dark.png" class="h-8"/>
      </ULink>
      <UNavigationMenu :items="links" variant="link" color="primary"
        :ui="{ link: 'px-2 py-1', linkLeadingIcon: 'hidden' }" highlight highlight-color="primary" />
      <USeparator orientation="vertical" class="h-4 mx-2 opacity-30" />
      <div class="hidden md:flex items-center gap-2">
        <LangSelector />
        <USeparator orientation="vertical" class="h-5 ml-2" type="solid" color="primary" size="xs" />
        <ThemeSwitcher />
        <UButton to="/cv.pdf" target="_blank" icon="i-lucide-download" :label="$t('nav.downloadCv')" variant="solid" size="sm" color="primary" />
      </div>

      <div class="flex md:hidden items-center">
        <MobileMenu />
      </div>
    </div>
  </div>
</template>