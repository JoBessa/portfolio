<script setup lang="ts">
const localePath = useLocalePath()
const { t, locale } = useI18n()
const { data: projects } = await useAsyncData(
    `projects-featured-${locale.value}`,
    () => queryCollection('projects')
        .where('path', 'LIKE', `%/${locale.value}/%`)
        .order('order', 'ASC')
        .all(),
    { watch: [locale] }
)
</script>

<template>
    <UPageSection>
        <div v-if="projects?.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Motion v-for="(project, index) in projects" :key="project.path"
                :initial="{ opacity: 0, transform: 'translateY(20px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
                :transition="{ delay: 0.2 + 0.15 * index, duration: 0.5 }" :in-view-options="{ once: true }">
                <UCard variant="soft" class="group overflow-hidden p-0 h-full" :ui="{
                    body: 'sm:p-0',
                }">
                    <!-- Image -->
                    <div class="relative overflow-hidden aspect-video bg-muted">
                        <NuxtImg v-if="project.image" :src="project.image" :alt="project.title"
                            class="object-cover w-full h-full" />
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
                            <UButton v-if="project.slug" :to="localePath(`/projects/${project.slug}`)" variant="subtle">
                                {{ t('home.projects.readMore') }}
                            </UButton>
                            <UButton v-if="project.demo" :to="project.demo" target="_blank" variant="link">
                                {{ t('home.projects.liveDemo') }}
                            </UButton>
                        </div>
                    </div>
                </UCard>
            </Motion>
        </div>
    </UPageSection>
</template>