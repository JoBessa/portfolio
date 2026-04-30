<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({
  title: () => t('seo.home.title'),
  ogTitle: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogDescription: () => t('seo.home.description')
});
</script>

<template>
  <UPage>
    <LandingHero />
    <LandingMesurableImpact />
    <LandingPhilosophy />
    <LandingTechnicalArsenal />
    <LandingProject />
    <LandingExperiences />
    <LandingCTA />
  </UPage>
</template>