<script setup lang="ts">
const { t, locale } = useI18n()

const { data: projects } = await useAsyncData(
    `projects-featured-${locale.value}`,
    () => queryCollection('projects')
        .where('path', 'LIKE', `%/${locale.value}/%`)
        .where('featured', '=', true)
        .order('order', 'ASC')
        .all(),
    { watch: [locale] }
)
</script>

<template>
    <UPageSection :title="t('projects.title')" :description="t('projects.description')" :links="[{
        label: t('home.projects.viewAll'),
        to: '/projects',
        color: 'neutral',
        variant: 'outline',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'sm'
    }]">
        <div v-if="projects?.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <UCard v-for="project in projects" :key="project.path" class="group overflow-hidden p-0" :ui="{
                body: 'sm:p-0',
            }">
                <!-- Image -->
                <div class="relative overflow-hidden aspect-video bg-muted">
                    <NuxtImg v-if="project.image" :src="project.image" :alt="project.title"
                        class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                    <div v-else class="w-full h-full flex items-center justify-center">
                        <UIcon name="i-lucide-image-off" class="size-8 text-muted" />
                    </div>
                </div>

                <!-- Content -->
                <div class="p-5 flex flex-col gap-4">
                    <!-- Title + description -->
                    <div class="flex flex-col gap-1.5">
                        <h3 class="font-semibold text-base text-highlighted leading-snug">
                            {{ project.title }}
                        </h3>
                        <p class="text-sm text-muted leading-relaxed line-clamp-3">
                            {{ project.description }}
                        </p>
                    </div>

                    <!-- Tags -->
                    <div v-if="project.tags?.length" class="flex flex-wrap gap-1.5">
                        <UBadge v-for="tag in project.tags" :key="tag" :label="tag" variant="subtle" color="neutral"
                            size="sm" />
                    </div>

                    <!-- Divider -->
                    <USeparator />

                    <!-- Links -->
                    <div class="flex items-center justify-between gap-4">
                        <UButton v-if="project.slug" :to="'projects/' + project.slug" target="_blank" variant="subtle">
                            {{ t('home.projects.readMore') }}
                        </UButton>
                        <UButton v-if="project.demo" :to="project.demo" target="_blank" variant="link">
                            {{ t('home.projects.liveDemo') }}
                        </UButton>
                    </div>
                </div>
            </UCard>
        </div>

        <!-- Empty state -->
        <UPageCard v-else title="Aucun projet épinglé"
            description="Ajoutez pinned: true dans le frontmatter de vos projets." variant="subtle"
            orientation="horizontal" />
    </UPageSection>
</template>