<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

const { t } = useI18n()

const links = computed<ButtonProps[]>(() => [
  {
    label: t('projects.button'),
    to: '/projects',
    trailingIcon: 'lucide-arrow-right',
    variant: 'solid'
  },
  {
    label: t('hero.download_resume'),
    to: "/documents/Jonathan_Bessa_CV.pdf",
    external: true,
    download: "Jonathan_Bessa_CV.pdf",
    icon: 'lucide-download',
    variant: 'outline'
  }
]);
</script>

<template>
  <UPageHero :title="t('hero.name')" :links="links" orientation="horizontal" :ui="{
    container: 'h-full lg:grid-cols-[2fr_1fr] lg:items-center',
    wrapper: 'flex flex-col justify-center',
  }">
    <template #headline>
      <Motion :initial="{ opacity: 0, transform: 'translateY(-10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }" :transition="{ delay: 0.1, duration: 0.5 }"
        :in-view-options="{ once: true }">
        <UButton color="success" variant="ghost" class="gap-2 cursor-pointer" :label="t('hero.available_badge')">
          <template #leading>
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full rounded-full opacity-75 bg-success animate-ping" />
              <span class="relative inline-flex size-2 scale-90 rounded-full bg-success" />
            </span>
          </template>
        </UButton>
      </Motion>
    </template>
    <template #description>
      <Motion :initial="{ opacity: 0, transform: 'translateY(15px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }" :transition="{ delay: 0.3, duration: 0.5 }"
        :in-view-options="{ once: true }">
        <p class="text-pretty">{{ t('hero.tagline') }}</p>
        <p class="text-pretty">{{ t('hero.role') }}</p>
      </Motion>
    </template>
    <template #links>
      <Motion v-for="(link, index) in links" :key="link.label" :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.5 + 0.1 * index, duration: 0.4 }" :in-view-options="{ once: true }">
        <UButton size="lg" :to="link.to" :external="link.external" :download="link.download" :icon="link.icon"
          :variant="link.variant" :trailing-icon="link.trailingIcon">
          {{ link.label }}
        </UButton>
      </Motion>
    </template>
    <Motion :initial="{ opacity: 0, transform: 'scale(0.95)' }" :while-in-view="{ opacity: 1, transform: 'scale(1)' }"
      :transition="{ delay: 0.4, duration: 0.6 }" :in-view-options="{ once: true }"
      class="flex items-center justify-end h-full">
      <UColorModeImage width="300" height="300" class="rounded-md aspect-square object-cover"
        light="/images/me-light.png" dark="/images/me-dark.jpg" />
    </Motion>
  </UPageHero>
</template>