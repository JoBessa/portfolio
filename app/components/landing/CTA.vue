<script setup lang="ts">
const { t } = useI18n()
const links = {
    email: 'mailto:jonathan@email.com',
    projects: '/projects',
    linkedin: 'https://www.linkedin.com/in/ton-profil',
    github: 'https://github.com/ton-profil'
}
</script>

<template>
    <UPageSection>
        <UPageCard class="overflow-hidden" variant="naked">
            <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div class="max-w-2xl">
                    <UBadge :label="t('home.contact.eyebrow')" color="neutral" variant="subtle" class="mb-4" />

                    <h2 class="text-3xl font-semibold tracking-tight text-(--ui-text-highlighted) sm:text-4xl">
                        {{ t('home.contact.title') }}
                    </h2>

                    <p class="mt-4 text-base leading-7 text-(--ui-text-muted) sm:text-lg">
                        {{ t('home.contact.description') }}
                    </p>

                    <div class="mt-6 flex flex-wrap gap-2">
                        <UBadge :label="t('home.contact.fulltime')" color="primary" variant="soft" />
                        <UBadge label="Paris" color="neutral" variant="subtle" />
                        <UBadge :label="t('home.contact.hybrid')" color="neutral" variant="subtle" />
                        <UBadge :label="t('home.contact.status')" color="neutral" variant="subtle" />
                    </div>
                </div>

                <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <UButton :to="links.email" icon="i-lucide-mail" size="lg">
                        {{ t('home.contact.cta') }}
                    </UButton>

                    <UButton :to="links.projects" color="neutral" variant="subtle" trailing-icon="i-lucide-arrow-right"
                        size="lg">
                        {{ t('projects.button') }}
                    </UButton>
                </div>
            </div>
        </UPageCard>
    </UPageSection>
</template>