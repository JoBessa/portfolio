<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
    <UPageSection :ui="{
        container: 'pb-4 sm:pb-4 lg:pb-8 pt-12 sm:pt-12 lg:pt-18'
    }">
        <UPageCard class="overflow-hidden" variant="naked">
            <div class="flex flex-col gap-8">
                <MotionInView class="max-w-2xl">
                    <UBadge :label="t('home.contact.eyebrow')" color="neutral" variant="subtle" class="mb-4" />

                    <h2 class="text-2xl font-semibold tracking-tight text-(--ui-text-highlighted) sm:text-2xl">
                        {{ t('home.contact.title') }}
                    </h2>

                    <p class="mt-4 text-sm text-(--ui-text-muted)">
                        {{ t('home.contact.description') }}
                    </p>

                    <div class="mt-6 flex flex-wrap gap-2">
                        <UBadge :label="t('home.contact.fulltime')" color="primary" variant="soft" />
                        <UBadge label="Paris" color="neutral" variant="subtle" />
                        <UBadge :label="t('home.contact.hybrid')" color="neutral" variant="subtle" />
                        <UBadge :label="t('home.contact.status')" color="neutral" variant="subtle" />
                    </div>
                </MotionInView>
            </div>
        </UPageCard>
    </UPageSection>
</template>