<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

interface ImpactStat {
    value: string
    label: string
    icon: string
    description: string
}

const stats = computed<ImpactStat[]>(() => [
    {
        value: '99.9%',
        label: t('home.impact.SLA.title'),
        icon: 'boxicons:check-shield',
        description: t('home.impact.SLA.description')
    },
    {
        value: '−40%',
        label: t('home.impact.IaC.title'),
        icon: 'boxicons:trending-down',
        description: t('home.impact.IaC.description')
    },
    {
        value: '10mn',
        label: t('home.impact.CI/CD.title'),
        icon: 'boxicons:stopwatch',
        description: t('home.impact.CI/CD.description')
    },
    {
        value: '5+',
        label: t('home.impact.experience.title'),
        icon: 'solar:medal-ribbon-star-linear',
        description: t('home.impact.experience.description')
    },
])
</script>

<template>
    <UPageSection :ui="{
        container: 'py-0 sm:py-0 lg:py-0'
    }">
        <template #title>
            <MotionInView>
                {{ t('home.impact.title') }}
            </MotionInView>
        </template>
        <UPageGrid :ui="{
            base: 'lg:grid-cols-2'
        }">
            <MotionInView v-for="(stat, index) in stats" :key="stat.label" :delay="0.15 + 0.1 * index">
                <UPageCard class="overflow-hidden" variant="soft">
                    <div class="text-4xl font-black tracking-tight leading-none text-primary">
                        {{ stat.value }}
                    </div>
                    <div class="text-xs text-muted font-semibold">
                        {{ stat.label }}
                    </div>
                    <div class="text-xs text-muted">
                        {{ stat.description }}
                    </div>
                    <UIcon :name="stat.icon" class="size-18 text-muted/10 absolute -top-2 -right-2" />
                </UPageCard>
            </MotionInView>
        </UPageGrid>
    </UPageSection>
</template>