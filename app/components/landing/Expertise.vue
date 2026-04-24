<script setup lang="ts">
import type { PageFeatureProps } from '@nuxt/ui'

const features = ref<PageFeatureProps[]>([
    {
        title: 'Icons',
        description: 'Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.',
        icon: 'i-lucide-smile',
        to: '/docs/getting-started/integrations/icons'
    },
    {
        title: 'Fonts',
        description: 'Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.',
        icon: 'i-lucide-a-large-small',
        to: '/docs/getting-started/integrations/fonts'
    },
    {
        title: 'Color Mode',
        description: 'Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.',
        icon: 'i-lucide-sun-moon',
        to: '/docs/getting-started/integrations/color-mode'
    }
])
</script>

<template>
    <UPageSection title="Expertise" :features="features" :ui="{
        title: 'text-start',
        description: 'text-start'
    }">
        <template #headline>
            <UBadge variant="soft" color="primary">Expertise</UBadge>
        </template>
        <template #description>
            <p class="">Je suis développeur full stack avec 5 ans d'expérience dans le développement web.</p>
        </template>
        <template #features>
            <UPageCard v-for="feature in features" :title="feature.title" :description="feature.description"
                :icon="feature.icon" :to="feature.to">
            </UPageCard>
        </template>
    </UPageSection>
</template>
