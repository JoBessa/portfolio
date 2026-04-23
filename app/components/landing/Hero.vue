<script setup lang="ts">
const { t } = useI18n()

const links = [
  {
    label: t('hero.download_resume'),
    to: "mailto:[EMAIL_ADDRESS]",
    icon: "i-lucide-download"
  }
];
</script>

<template>
  <UPageHero :title="t('hero.name')" :links="links" orientation="horizontal" :ui="{
    wrapper: 'order-last md:order-first',
    container: 'lg:grid-cols-[1fr_1fr] lg:items-center',
  }">
    <template #headline>
      <UBadge color="neutral" variant="subtle">{{ t('hero.greeting') }}</UBadge>
    </template>
    <template #description>
      <p>{{ t('hero.role') }}</p>
      <p>{{ t('hero.tagline') }}</p>
    </template>
    <template #links>
      <UButton v-for="link in links" :key="link.to" :href="link.to" :icon="link.icon">
        {{ link.label }}
      </UButton>
      <UButton color="success" variant="ghost" class="gap-2 cursor-pointer" :label="t('hero.available_badge')">
        <template #leading>
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full rounded-full opacity-75 bg-success animate-ping" />
            <span class="relative inline-flex size-2 scale-90 rounded-full bg-success" />
          </span>
        </template>
      </UButton>
    </template>
    <UColorModeImage class="rounded-md aspect-square object-cover mx-auto" light="/images/me-light.png"
      dark="/images/me-dark.jpg" />
  </UPageHero>
</template>