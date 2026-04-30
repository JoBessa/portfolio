<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({
  title: () => t('seo.projects.title'),
  ogTitle: () => t('seo.projects.title'),
  description: () => t('seo.projects.description'),
  ogDescription: () => t('seo.projects.description')
})
</script>

<template>
    <UPage>
        <ProjectsHeader />
        <ProjectsList />
    </UPage>
</template>