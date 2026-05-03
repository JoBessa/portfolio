<script setup lang="ts">
const { t, locale } = useI18n()

const { data: projects } = await useAsyncData(
    () => `projects-featured-${locale.value}`, // ← réactif
    () => queryCollection('projects')
        .where('path', 'LIKE', `%/${locale.value}/%`)
        .where('featured', '=', true)
        .order('order', 'ASC')
        .all()
)
</script>

<template>
    <UPageSection :description="t('projects.description')" :links="[{
        label: t('home.projects.viewAll'),
        to: '/projects',
        color: 'neutral',
        variant: 'outline',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'sm'
    }]" :ui="{
        container: 'sm:gap-0 lg:gap-8 py-6 sm:py-12 lg:py-18'
    }">
        <template #title>
            <Motion :key="`title-${locale}`" :initial="{ opacity: 0, transform: 'translateY(20px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateY(0)' }" :transition="{ duration: 0.5 }"
                :in-view-options="{ once: true }">
                {{ t('projects.title') }}
            </Motion>
        </template>
        <div v-if="projects?.length" :key="`projects-${locale}`" class="grid grid-cols-1 gap-6">
            <Motion v-for="(project, index) in projects" :key="project.path"
                :initial="{ opacity: 0, transform: 'translateY(20px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
                :transition="{ delay: 0.2 + 0.15 * index, duration: 0.5 }" :in-view-options="{ once: true }">
                <UPageCard variant="soft" class="group overflow-hidden p-0 h-full" :ui="{
                    root: 'md:bg-transparent md:ring-0',
                    container: 'sm:p-0 p-0 md:grid md:grid-cols-2 md:items-center'
                }">
                    <!-- Image -->
                    <div class="relative overflow-hidden aspect-video bg-muted"
                        :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'">
                        <NuxtImg v-if="project.image" :src="project.image" :alt="project.title"
                            class="object-cover w-full h-full" />
                        <div v-else class="w-full h-full flex items-center justify-center">
                            <UIcon name="i-lucide-image-off" class="size-8 text-muted" />
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-5 flex flex-col gap-4" :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'">
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
                            <UButton v-if="project.slug" :to="'projects/' + project.slug" variant="subtle">
                                {{ t('home.projects.readMore') }}
                            </UButton>
                            <UButton v-if="project.demo" :to="project.demo" target="_blank" variant="link">
                                {{ t('home.projects.liveDemo') }}
                            </UButton>
                        </div>
                    </div>
                </UPageCard>
            </Motion>
        </div>

        <!-- Empty state -->
        <UPageCard v-else title="Aucun projet épinglé"
            description="Ajoutez pinned: true dans le frontmatter de vos projets." variant="subtle"
            orientation="horizontal" />
    </UPageSection>
</template>