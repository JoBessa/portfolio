<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { t, locale, setLocale, availableLocales } = useI18n()
const colorMode = useColorMode()

const startViewTransition = (toDark: boolean) => {
    const switchTheme = () => {
        colorMode.preference = toDark ? 'dark' : 'light'
    }

    if (!document.startViewTransition) {
        switchTheme()
        return
    }

    document.startViewTransition(switchTheme).ready.then(() => {
        document.documentElement.animate(
            { clipPath: ['circle(0px at 50% 0%)', 'circle(150% at 50% 0%)'] },
            { duration: 600, easing: 'cubic-bezier(.76,.32,.29,.99)', pseudoElement: '::view-transition-new(root)' }
        )
    })
}

const items = computed<DropdownMenuItem[][]>(() => [
    [
        {
            label: colorMode.value === 'dark' ? t('nav.lightMode') : t('nav.darkMode'),
            icon: colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon',
            onSelect(e: Event) {
                e.preventDefault()
                startViewTransition(colorMode.value !== 'dark')
            },
        },
    ],
    [
        {
            label: t('nav.downloadCv'),
            icon: 'i-lucide-download',
            to: '/cv.pdf',
            target: '_blank',
        },
    ],
    [
        {
            label: t('nav.language'),
            icon: 'i-lucide-languages',
            children: availableLocales.map((loc) => ({
                label: loc === 'fr' ? 'Français' : loc === 'en' ? 'English' : 'Português',
                slot: loc as string,
                onSelect(e: Event) {
                    e.preventDefault()
                    setLocale(loc)
                },
            })),
        },
    ],
])
</script>

<template>
    <UDropdownMenu :items="items" :content="{ align: 'end' }" :ui="{ content: 'w-48' }">
        <UButton color="neutral" variant="ghost" icon="i-lucide-menu" />
        <template v-for="loc in availableLocales" :key="loc" #[`${loc}-trailing`]>
            <UIcon v-if="locale === loc" name="i-lucide-check" class="size-4 ms-auto" />
        </template>
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