<script setup lang="ts">
const { locale, setLocale } = useI18n()

type AppLocale = 'en' | 'fr' | 'pt'

const localeItems: { label: string; value: AppLocale }[] = [
    { label: 'EN', value: 'en' },
    { label: 'FR', value: 'fr' },
    { label: 'PT', value: 'pt' }
]
</script>

<template>
    <div class="flex items-center">
        <template v-for="(l, index) in localeItems" :key="l.value">

            <!-- bouton langue -->
            <UButton variant="ghost"
                :class="locale === l.value ? 'text-primary font-semibold p-0 cursor-pointer' : 'text-gray-500 p-0 cursor-pointer'"
                @click="setLocale(l.value)">
                {{ l.label }}
            </UButton>

            <!-- séparateur -->
            <span v-if="index < localeItems.length - 1" class="mx-2 text-gray-400">
                ·
            </span>

        </template>
    </div>
</template>