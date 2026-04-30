<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()

const slug = computed(() =>
    Array.isArray(route.params.slug)
        ? route.params.slug.join('/')
        : route.params.slug
)

const { data: project } = await useAsyncData(
    `project-${slug.value}-${locale.value}`,
    () =>
        queryCollection('projects')
            .where('path', 'LIKE', `%/${locale.value}/${slug.value}`)
            .first(),
    { watch: [slug, locale] }
)

useSeoMeta({
    title: () => project.value?.title || t('seo.projects.title'),
    ogTitle: () => project.value?.title || t('seo.projects.title'),
    description: () => project.value?.description || t('seo.projects.description'),
    ogDescription: () => project.value?.description || t('seo.projects.description')
})
</script>

<template>
    <div v-if="project">
        <!-- Hero Section -->
        <UPageSection>
            <!-- Back link -->
            <Motion :initial="{ opacity: 0, transform: 'translateX(-10px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateX(0)' }" :transition="{ delay: 0.1, duration: 0.4 }"
                :in-view-options="{ once: true }">
                <UButton to="/projects" variant="ghost" color="neutral" icon="i-lucide-arrow-left" size="sm">
                    All projects
                </UButton>
            </Motion>

            <!-- Title + Meta -->
            <div class="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <Motion :initial="{ opacity: 0, transform: 'translateY(20px)' }"
                    :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
                    :transition="{ delay: 0.2, duration: 0.5 }" :in-view-options="{ once: true }" class="max-w-3xl">
                    <!-- Tags -->
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        <UBadge v-for="tag in project.tags" :key="tag" :label="tag" variant="subtle" color="neutral"
                            size="sm" />
                    </div>

                    <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-(--ui-text-highlighted)">
                        {{ project.title }}
                    </h1>

                    <p class="mt-4 text-lg text-(--ui-text-muted) leading-relaxed text-pretty">
                        {{ project.description }}
                    </p>
                </Motion>

                <!-- Meta info -->
                <Motion :initial="{ opacity: 0, transform: 'translateY(20px)' }"
                    :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
                    :transition="{ delay: 0.35, duration: 0.5 }" :in-view-options="{ once: true }"
                    class="flex flex-col gap-3 text-sm text-(--ui-text-muted) lg:text-right shrink-0">
                    <div v-if="project.role" class="flex items-center gap-2 lg:justify-end">
                        <UIcon name="i-lucide-briefcase" class="size-4" />
                        <span>{{ project.role }}</span>
                    </div>
                    <div v-if="project.duration" class="flex items-center gap-2 lg:justify-end">
                        <UIcon name="i-lucide-calendar" class="size-4" />
                        <span>{{ project.duration }}</span>
                    </div>
                    <div v-if="project.client" class="flex items-center gap-2 lg:justify-end">
                        <UIcon name="i-lucide-building-2" class="size-4" />
                        <span>{{ project.client }}</span>
                    </div>
                    <div class="flex gap-2 mt-1 lg:justify-end">
                        <UButton v-if="project.github" :to="project.github" target="_blank" icon="i-lucide-github"
                            variant="subtle" color="neutral" size="sm">
                            Source
                        </UButton>
                        <UButton v-if="project.demo" :to="project.demo" target="_blank"
                            trailing-icon="i-lucide-external-link" size="sm">
                            Live Demo
                        </UButton>
                    </div>
                </Motion>
            </div>
        </UPageSection>

        <!-- Cover Image -->
        <UPageSection v-if="project.image" :ui="{ container: 'py-6 sm:py-8 lg:py-10' }">
            <Motion :initial="{ opacity: 0, transform: 'scale(0.97)' }"
                :while-in-view="{ opacity: 1, transform: 'scale(1)' }" :transition="{ delay: 0.3, duration: 0.6 }"
                :in-view-options="{ once: true }">
                <div class="rounded-xl overflow-hidden border border-(--ui-border) bg-(--ui-bg-muted)">
                    <NuxtImg :src="project.image" :alt="project.title" class="w-full object-cover aspect-video" />
                </div>
            </Motion>
        </UPageSection>

        <!-- Key Highlights -->
        <UPageSection v-if="project.highlights?.length" :ui="{ container: 'py-6 sm:py-8 lg:py-10' }">
            <UPageGrid :ui="{ base: 'lg:grid-cols-4' }">
                <Motion v-for="(stat, index) in project.highlights" :key="stat.label"
                    :initial="{ opacity: 0, transform: 'translateY(20px)' }"
                    :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
                    :transition="{ delay: 0.15 + 0.1 * index, duration: 0.5 }" :in-view-options="{ once: true }">
                    <UPageCard variant="subtle" class="text-center h-full">
                        <div class="text-3xl font-black tracking-tight text-primary">
                            {{ stat.value }}
                        </div>
                        <div class="text-sm text-(--ui-text-muted) mt-1">
                            {{ stat.label }}
                        </div>
                    </UPageCard>
                </Motion>
            </UPageGrid>
        </UPageSection>

        <!-- Feature Sections (alternating image/text) -->
        <template v-if="project.sections?.length">
            <UPageSection v-for="(section, index) in project.sections" :key="index"
                :ui="{ container: 'py-8 sm:py-10 lg:py-14' }">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
                    :class="{ 'lg:[direction:rtl]': section.reverse }">
                    <!-- Image -->
                    <Motion
                        :initial="{ opacity: 0, transform: section.reverse ? 'translateX(30px)' : 'translateX(-30px)' }"
                        :while-in-view="{ opacity: 1, transform: 'translateX(0)' }"
                        :transition="{ delay: 0.2, duration: 0.6 }" :in-view-options="{ once: true }"
                        :class="{ 'lg:[direction:ltr]': section.reverse }">
                        <div v-if="section.image"
                            class="rounded-xl overflow-hidden border border-(--ui-border) bg-(--ui-bg-muted)">
                            <NuxtImg :src="section.image" :alt="section.title"
                                class="w-full object-cover aspect-video" />
                        </div>
                        <div v-else
                            class="rounded-xl overflow-hidden border border-(--ui-border) bg-(--ui-bg-muted) aspect-video flex items-center justify-center">
                            <UIcon name="i-lucide-image-off" class="size-12 text-(--ui-text-muted)" />
                        </div>
                    </Motion>

                    <!-- Text content -->
                    <Motion
                        :initial="{ opacity: 0, transform: section.reverse ? 'translateX(-30px)' : 'translateX(30px)' }"
                        :while-in-view="{ opacity: 1, transform: 'translateX(0)' }"
                        :transition="{ delay: 0.35, duration: 0.6 }" :in-view-options="{ once: true }"
                        :class="{ 'lg:[direction:ltr]': section.reverse }">
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center gap-3">
                                <span
                                    class="text-xs font-mono font-bold text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
                                    {{ String(index + 1).padStart(2, '0') }}
                                </span>
                            </div>

                            <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-(--ui-text-highlighted)">
                                {{ section.title }}
                            </h2>

                            <p class="text-base text-(--ui-text-muted) leading-relaxed">
                                {{ section.description }}
                            </p>

                            <ul v-if="section.features?.length" class="flex flex-col gap-2 mt-2">
                                <li v-for="feature in section.features" :key="feature"
                                    class="flex items-start gap-2 text-sm text-(--ui-text-muted)">
                                    <UIcon name="i-lucide-check" class="size-4 text-primary shrink-0 mt-0.5" />
                                    <span>{{ feature }}</span>
                                </li>
                            </ul>
                        </div>
                    </Motion>
                </div>
            </UPageSection>
        </template>

        <!-- Markdown Body (Technical Deep Dive) -->
        <UPageSection :ui="{ container: 'py-8 sm:py-10 lg:py-14' }">
            <Motion :initial="{ opacity: 0, transform: 'translateY(20px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateY(0)' }" :transition="{ delay: 0.2, duration: 0.5 }"
                :in-view-options="{ once: true }">

                <div class="prose prose-neutral dark:prose-invert max-w-none">
                    <ContentRenderer :value="project" />
                </div>
            </Motion>
        </UPageSection>

        <!-- Bottom Navigation -->
        <UPageSection :ui="{ container: 'py-8 sm:py-10 lg:py-14' }">
            <Motion :initial="{ opacity: 0, transform: 'translateY(15px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateY(0)' }" :transition="{ delay: 0.2, duration: 0.5 }"
                :in-view-options="{ once: true }">
                <div class="flex items-center justify-between">
                    <UButton to="/projects" variant="ghost" color="neutral" icon="i-lucide-arrow-left">
                        All projects
                    </UButton>
                    <div class="flex gap-2">
                        <UButton v-if="project.github" :to="project.github" target="_blank" icon="i-lucide-github"
                            variant="subtle" color="neutral">
                            Source
                        </UButton>
                        <UButton v-if="project.demo" :to="project.demo" target="_blank"
                            trailing-icon="i-lucide-external-link">
                            Live Demo
                        </UButton>
                    </div>
                </div>
            </Motion>
        </UPageSection>
    </div>

    <!-- 404 -->
    <UPageSection v-else>
        <div class="text-center py-20">
            <h1 class="text-4xl font-bold text-(--ui-text-highlighted)">Project not found</h1>
            <p class="mt-4 text-(--ui-text-muted)">The project you're looking for doesn't exist.</p>
            <UButton to="/projects" class="mt-6" icon="i-lucide-arrow-left">
                Back to projects
            </UButton>
        </div>
    </UPageSection>
</template>