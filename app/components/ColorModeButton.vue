<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
const { locale, setLocale, availableLocales } = useI18n()
const colorMode = useColorMode()

const localeLabels: Record<string, { label: string; icon: string }> = {
  fr: { label: 'Français', icon: 'i-lucide-flag' },
  en: { label: 'English', icon: 'i-lucide-flag' },
  pt: { label: 'Português', icon: 'i-lucide-flag' },
}

const startViewTransition = (toDark: boolean, event?: Event) => {
  const switchTheme = () => {
    colorMode.preference = toDark ? 'dark' : 'light'
  }

  const mouseEvent = event as MouseEvent | undefined
  if (!document.startViewTransition || !mouseEvent) {
    switchTheme()
    return
  }

  const x = mouseEvent.clientX
  const y = mouseEvent.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  document.startViewTransition(switchTheme).ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 600,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  })
}

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Mode sombre',
      icon: colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun',
      type: 'checkbox' as const,
      checked: colorMode.value === 'dark',
      onUpdateChecked(checked: boolean) {
        startViewTransition(checked)
      },
      onSelect(e: Event) {
        e.preventDefault()
      },
    },
  ],
  [
    {
      label: 'Langue',
      icon: 'i-lucide-languages',
      children: availableLocales.map((loc) => ({
        label: localeLabels[loc]?.label ?? loc,
        icon: locale.value === loc ? 'i-lucide-check' : undefined,
        onSelect(e: Event) {
          e.preventDefault()
          setLocale(loc)
        },
      })),
    },
  ],
  [
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
  <UDropdownMenu :items="items" :content="{ align: 'end' }" :ui="{ content: 'w-48' }">
    <UButton color="neutral" variant="ghost" icon="i-lucide-menu" />
  </UDropdownMenu>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}

::view-transition-old(root) {
  z-index: 1;
}
</style>