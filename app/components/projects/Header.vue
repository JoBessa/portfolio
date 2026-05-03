<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
    <UPageHero :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        container: 'pb-0 sm:pb-0 lg:pb-0'
    }">
        <template #title>
            <MotionInView>
                {{ t('projects.title_page') }}
            </MotionInView>
        </template>
        <template #description>
            <MotionInView :delay="0.15">
                {{ t('projects.description_page') }}
            </MotionInView>
        </template>
    </UPageHero>
</template>