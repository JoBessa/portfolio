<script setup lang="ts">
const { t } = useI18n()

const links = [
  {
    label: t('projects.button'),
    to: '/projects',
    trailingIcon: 'lucide-arrow-right',
    variant: 'solid'
  },
  {
    label: t('hero.download_resume'),
    to: "mailto:[EMAIL_ADDRESS]",
    icon: 'lucide-download',
    variant: 'outline'
  }
];
</script>

<template>
  <UPageHero :title="t('hero.name')" :links="links" orientation="horizontal" :ui="{
    container: 'h-full lg:grid-cols-[1fr_1fr] lg:items-center',
    wrapper: 'flex flex-col justify-center',
  }">
    <template #headline>
      <UButton color="success" variant="ghost" class="gap-2 cursor-pointer" :label="t('hero.available_badge')">
        <template #leading>
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full rounded-full opacity-75 bg-success animate-ping" />
            <span class="relative inline-flex size-2 scale-90 rounded-full bg-success" />
          </span>
        </template>
      </UButton>
    </template>
    <template #description>
      <p>{{ t('hero.role') }}</p>
      <p>{{ t('hero.tagline') }}</p>
    </template>
    <template #links>
      <UButton v-for="link in links" :key="link.to" :href="link.to" :icon="link.icon" :variant="link.variant"
        :trailing-icon="link.trailingIcon">
        {{ link.label }}
      </UButton>
    </template>
    <div class="flex items-center justify-center h-full">
      <UColorModeImage width="300" height="300" class="rounded-md aspect-square object-cover"
        light="/images/me-light.png" dark="/images/me-dark.jpg" />
    </div>
  </UPageHero>
</template>