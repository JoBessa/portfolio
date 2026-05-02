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
    <ClientOnly>
        <div class="flex items-center">
            <template v-for="(l, index) in localeItems" :key="l.value">
                <!-- bouton langue -->
                <UButton variant="ghost"
                    :class="locale === l.value ? 'text-primary font-semibold p-0 cursor-pointer' : 'text-muted p-0 cursor-pointer'"
                    @click="setLocale(l.value)">
                    {{ l.label }}
                </UButton>

                <!-- séparateur -->
                <span v-if="index < localeItems.length - 1" class="mx-2 text-muted">
                    ·
                </span>
            </template>
        </div>
        <template #fallback>
            <div class="flex items-center">
                <template v-for="(l, index) in localeItems" :key="l.value">
                    <UButton variant="ghost" class="text-muted p-0 cursor-pointer">
                        {{ l.label }}
                    </UButton>
                    <span v-if="index < localeItems.length - 1" class="mx-2 text-muted">
                        ·
                    </span>
                </template>
            </div>
        </template>
    </ClientOnly>
</template>