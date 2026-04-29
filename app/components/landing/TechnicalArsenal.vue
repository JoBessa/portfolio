<script setup lang="ts">

const { t } = useI18n()

interface TechIcon {
    name: string
    label: string
}

interface ArsenalCard {
    title: string
    description: string
    techs: TechIcon[]
    class?: string
}

const cards: ArsenalCard[] = [
    {
        title: t('home.arsenal.fullstack.title'),
        description: t('home.arsenal.fullstack.description'),
        techs: [
            { name: 'simple-icons:nuxt', label: 'Nuxt' },
            { name: 'simple-icons:nextdotjs', label: 'Next' },
            { name: 'simple-icons:symfony', label: 'Symfony' },
            { name: 'simple-icons:laravel', label: 'Laravel' },
            { name: 'simple-icons:trpc', label: 'tRPC' },
            { name: 'simple-icons:openapiinitiative', label: 'API Design' }
        ],
        class: 'lg:col-span-2',
    },
    {
        title: t('home.arsenal.backend.title'),
        description: t('home.arsenal.backend.description'),
        techs: [
            { name: 'simple-icons:postgresql', label: 'PostgreSQL' },
            { name: 'simple-icons:redis', label: 'Redis' },
            { name: 'simple-icons:prisma', label: 'Prisma' },
            { name: 'simple-icons:rabbitmq', label: 'Queues / RabbitMQ' },
            { name: 'simple-icons:graphql', label: 'GraphQL' },
            { name: 'lucide:database', label: 'SQL Optimization' }
        ],
        class: 'lg:col-span-2',
    },
    {
        title: t('home.arsenal.cloud.title'),
        description: t('home.arsenal.cloud.description'),
        techs: [
            { name: 'simple-icons:amazonwebservices', label: 'AWS' },
            { name: 'simple-icons:docker', label: 'Docker' },
            { name: 'simple-icons:terraform', label: 'Terraform' },
            { name: 'simple-icons:amazonrds', label: 'RDS' },
            { name: 'simple-icons:amazons3', label: 'S3' },
            { name: 'lucide:network', label: 'Networking' }
        ],
        class: 'lg:col-span-2',
    },
    {
        title: t('home.arsenal.cicd.title'),
        description: t('home.arsenal.cicd.description'),
        techs: [
            { name: 'simple-icons:github', label: 'GitHub' },
            { name: 'simple-icons:githubactions', label: 'GitHub Actions' },
            { name: 'simple-icons:docker', label: 'Docker Build' },
            { name: 'lucide:workflow', label: 'Pipelines' },
            { name: 'simple-icons:vitest', label: 'Testing' },
            { name: 'lucide:cpu', label: 'Automation' }
        ],
        class: 'lg:col-span-3',
    },
    {
        title: t('home.arsenal.performance.title'),
        description: t('home.arsenal.performance.description'),
        techs: [
            { name: 'simple-icons:datadog', label: 'Datadog' },
            { name: 'simple-icons:sentry', label: 'Sentry' },
            { name: 'lucide:activity', label: 'Monitoring' },
            { name: 'lucide:search', label: 'Debugging' },
            { name: 'lucide:zap', label: 'Performance' },
            { name: 'lucide:shield-check', label: 'Reliability' }
        ],
        class: 'lg:col-span-3',
    }
]
</script>

<template>
    <UPageSection :title="t('home.arsenal.title')" :description="t('home.arsenal.description')" :ui="{
        container: 'py-0 sm:py-0 lg:py-0'
    }">
        <UPageGrid :ui="{
            base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4'
        }">
            <UPageCard :class="card.class" v-for="(card, index) in cards" :key="index" :title="card.title"
                variant="subtle" :description="card.description">
                <template #footer>
                    <div class="flex items-center gap-3">
                        <UTooltip v-for="tech in card.techs" :key="tech.name" :text="tech.label" class="cursor-pointer">
                            <UBadge color="primary">
                                <UIcon :name="tech.name" class="size-6" />
                            </UBadge>
                        </UTooltip>
                    </div>
                </template>
            </UPageCard>
        </UPageGrid>
    </UPageSection>
</template>