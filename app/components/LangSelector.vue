<script setup lang="ts">
const { locale, availableLocales, setLocale } = useI18n()

type AppLocale = 'en' | 'fr' | 'pt'

const localeItems: SelectItem[] = [
    { label: 'en', value: 'en' },
    { label: 'fr', value: 'fr' },
    { label: 'pt', value: 'pt' }
]
</script>

<template>
    <USelect
        :model-value="locale"
        :items="localeItems"
        size="md"
        variant="none"
        class="w-fit cursor-pointer uppercase"
        :content="{ align: 'start', bodyLock: false }"
        :ui="{
            item: 'uppercase data-[state=checked]:bg-primary data-[state=checked]:text-white cursor-pointer rounded-md',
            itemTrailingIcon: 'hidden'
        }"
        @update:model-value="(v) => v && setLocale(v as AppLocale)"
    />
</template>