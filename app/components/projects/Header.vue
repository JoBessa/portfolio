<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
    <UPageHero :title="t('projects.title_page')" :description="t('projects.description_page')" :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        container: 'pb-0 sm:pb-0 lg:pb-0'
    }" />
</template>