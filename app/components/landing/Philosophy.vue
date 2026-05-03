<script setup lang="ts">

const { t } = useI18n()

interface PhilosophyStat {
    id: string
    title: string
    description: string
    icon: string,
    labels: string[],
    class?: string
}

const stats = computed<PhilosophyStat[]>(() => [
    {
        id: "01",
        title: t('home.philosophy.visibility.title'),
        description: t('home.philosophy.visibility.description'),
        icon: 'lucide:activity',
        labels: ['Datadog', 'Logging', 'Metrics', 'Alerting'],
        class: "col-span-1"
    },
    {
        id: '02',
        title: t('home.philosophy.reproduce.title'),
        description: t('home.philosophy.reproduce.description'),
        icon: 'lucide:layers',
        labels: ['Terraform', 'Docker', 'CI/CD', 'AWS', 'GitOps'],
        class: "col-span-1"
    },
    {
        id: '03',
        title: t('home.philosophy.scalable.title'),
        description: t('home.philosophy.scalable.description'),
        icon: 'lucide:gauge',
        labels: ['Node.js', 'Nuxt', 'PostgreSQL', 'Redis', 'DX'],
        class: "col-span-1 sm:col-span-2"
    }
])
</script>

<template>
    <UPageSection>
        <template #title>
            <MotionInView>
                {{ t('home.philosophy.title') }}
            </MotionInView>
        </template>
        <template #description>
            <MotionInView>
                {{ t('home.philosophy.description') }}
            </MotionInView>
        </template>
        <UPageGrid class="grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <MotionInView v-for="(stat, index) in stats" :key="stat.id" :delay="0.15 + 0.1 * index" :class="stat.class">
                <UPageCard class="overflow-hidden h-full" variant="subtle"
                    :class="(index === 2) ? 'ring-2 ring-primary' : ''">
                    <div class=" text-7xl font-bold text-muted flex justify-between">
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
            </MotionInView>
        </UPageGrid>
    </UPageSection>
</template>