<script setup lang="ts">

const { t } = useI18n()

interface PhilosophyStat {
    id: string
    title: string
    description: string
    icon: string,
    labels: string[]
}

const stats = computed<PhilosophyStat[]>(() => [
    {
        id: "01",
        title: t('home.philosophy.visibility.title'),
        description: t('home.philosophy.visibility.description'),
        icon: 'lucide:activity', // monitoring / signals / observability
        labels: ['Datadog', 'Logging', 'Metrics', 'Alerting']
    },
    {
        id: '02',
        title: t('home.philosophy.reproduce.title'),
        description: t('home.philosophy.reproduce.description'),
        icon: 'lucide:layers', // infra as code / layered systems
        labels: ['Terraform', 'Docker', 'CI/CD', 'AWS', 'GitOps']
    },
    {
        id: '03',
        title: t('home.philosophy.scalable.title'),
        description: t('home.philosophy.scalable.description'),
        icon: 'lucide:gauge', // performance / speed / scaling
        labels: ['Node.js', 'Nuxt', 'PostgreSQL', 'Redis', 'DX']
    }
])
</script>

<template>
    <UPageSection :title="t('home.philosophy.title')" :description="t('home.philosophy.description')">
        <UPageGrid>
            <Motion v-for="(stat, index) in stats" :key="stat.id"
                :initial="{ opacity: 0, transform: 'translateY(20px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
                :transition="{ delay: 0.2 + 0.15 * index, duration: 0.5 }"
                :in-view-options="{ once: true }"
            >
                <UPageCard class="overflow-hidden" variant="subtle"
                    :highlight="stat.id == '01' || stat.id == '03'">
                    <div class="text-7xl font-bold text-muted flex justify-between">
                        <p>{{ stat.id }}</p>
                        <UIcon :name="stat.icon" class="size-8 text-primary item-center my-auto" />
                    </div>
                    <div class="text-lg text-neutral font-semibold">
                        {{ stat.title }}
                    </div>
                    <div class="text-xs text-muted">
                        {{ stat.description }}
                    </div>

                    <div class="flex gap-2 flex-wrap">
                        <UBadge v-for="label in stat.labels" :key="label" variant="outline" size="md" color="neutral">
                            {{ label }}
                        </UBadge>
                    </div>
                </UPageCard>
            </Motion>
        </UPageGrid>
    </UPageSection>
</template>