<script setup lang="ts">
const { locale, t } = useI18n()
const { data: page } = await useAsyncData(
    () => `about-${locale.value}`,
    () => queryCollection('about')
        .where('locale', '=', locale.value)
        .first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// TypeScript sait qu'ici page.value ne peut pas être null
const aboutPage = computed(() => page.value!)

useSeoMeta({
    title: () => t('seo.about.title'),
    ogTitle: () => t('seo.about.title'),
    description: () => t('seo.about.description'),
    ogDescription: () => t('seo.about.description')
})
</script>

<template>
    <UPage v-if="page">
        <UPageHero orientation="horizontal" :ui="{
            container: 'lg:flex sm:flex-row items-center',
            title: 'mx-0! text-left',
            description: 'mx-0! text-left',
            links: 'justify-start'
        }">
            <template #title>
                <MotionInView>
                    {{ page.title }}
                </MotionInView>
            </template>
            <template #description>
                <MotionInView :delay="0.15">
                    {{ page.description }}
                </MotionInView>
            </template>
            <UColorModeAvatar class="sm:rotate-4 size-36 rounded-lg ring ring-default ring-offset-3 ring-offset-bg"
                light="/images/me-light.png" dark="/images/me-dark.jpg" alt="Me" />
        </UPageHero>
        <UPageSection :ui="{
            container: 'pt-0!'
        }">
            <MotionInView>
                <MDC :value="page.content ?? ''" unwrap="p" />
            </MotionInView>
        </UPageSection>
    </UPage>
</template>