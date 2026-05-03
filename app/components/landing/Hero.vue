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
  <UPageHero :links="links" orientation="horizontal" reverse :ui="{
    container: 'h-full lg:grid-cols-[2fr_1fr] lg:items-center gap-2 md:gap-y-0 lg:gap-y-24',
    wrapper: 'flex flex-col lg:justify-center lg:order-first',
    title: 'text-center lg:text-start text-4xl',
    headline: 'text-center lg:text-start m-0 ',
    links: 'justify-center lg:justify-start',
  }">
    <template #title>
      <MotionInView>
        {{ t('hero.name') }}
      </MotionInView>
    </template>
    <template #headline>
      <MotionInView>
        <UButton color="success" variant="ghost" class="gap-2 cursor-pointer" :label="t('hero.available_badge')">
          <template #leading>
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full rounded-full opacity-75 bg-success animate-ping" />
              <span class="relative inline-flex size-2 scale-90 rounded-full bg-success" />
            </span>
          </template>
        </UButton>
      </MotionInView>
    </template>
    <template #description>
      <MotionInView>
        <p class="text-pretty text-center lg:text-start">{{ t('hero.tagline') }}</p>
        <p class="text-pretty text-center lg:text-start">{{ t('hero.role') }}</p>
      </MotionInView>
    </template>
    <template #links>
      <MotionInView v-for="(link, index) in links" :key="link.label" :delay="0.5 + 0.1 * index">
        <UButton size="lg" :to="link.to" :external="link.external" :download="link.download" :icon="link.icon"
          :variant="link.variant" :trailing-icon="link.trailingIcon">
          {{ link.label }}
        </UButton>
      </MotionInView>
    </template>
    <MotionInView :delay="0.4" class="flex items-center justify-center lg:justify-end">
      <UColorModeImage width="300" height="300"
        class="rounded-full w-1/2 h-1/2 md:w-1/3 md:h-1/3 lg:w-full lg:h-full lg:rounded-md aspect-square object-cover"
        light="/images/me-light.png" dark="/images/me-dark.jpg" />
    </MotionInView>
  </UPageHero>
</template>