<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({ title: t('contact.seo.title') })

const name = ref('')
const email = ref('')
const message = ref('')
const loading = ref(false)
const sent = ref(false)
const toast = useToast()

const submit = async () => {
    loading.value = true
    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: { name: name.value, email: email.value, message: message.value }
        })
        sent.value = true
        toast.add({
            title: t('contact.toast.success.title'),
            description: t('contact.toast.success.description'),
            color: 'success',
            icon: 'lucide-check-circle'
        })
        name.value = ''
        email.value = ''
        message.value = ''
        setTimeout(() => sent.value = false, 4000)
    } catch {
        toast.add({
            title: t('contact.toast.error.title'),
            description: t('contact.toast.error.description'),
            color: 'error',
            icon: 'lucide-alert-circle'
        })
    } finally {
        loading.value = false
    }
}

const socials = [
    { name: 'GitHub', url: 'https://github.com/JBessa', icon: 'simple-icons:github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jonathan-bessa-137691216/', icon: 'simple-icons:linkedin' }
]
</script>

<template>
    <UPage>
        <UPageHero class="relative overflow-hidden" :ui="{
            container: 'pb-8 sm:pb-8 lg:pb-8'
        }">
            <template #title>
                <Motion :initial="{ opacity: 0, y: 24 }" :while-in-view="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.55 }" :in-view-options="{ once: true }">
                    <span class="block">{{ t('contact.hero.title_1') }}</span>
                    <span class="block text-primary">{{ t('contact.hero.title_2') }}</span>
                </Motion>
            </template>
            <template #description>
                <Motion :initial="{ opacity: 0, y: 20 }" :while-in-view="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.15, duration: 0.5 }" :in-view-options="{ once: true }">
                    <span v-html="t('contact.hero.description')"></span>
                </Motion>
            </template>
        </UPageHero>
        <UPageSection :ui="{
            container: 'py-0 sm:py-0 lg:py-0'
        }">
            <div class="mx-auto max-w-5xl">
                <div class="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

                    <!-- Left column — info cards -->
                    <div class="lg:col-span-2 flex flex-col gap-5 justify-between h-full">

                        <!-- Email -->
                        <Motion :initial="{ opacity: 0, x: -20 }" :while-in-view="{ opacity: 1, x: 0 }"
                            :transition="{ delay: 0.1, duration: 0.5 }" :in-view-options="{ once: true }">
                            <UPageCard spotlight
                                class="group relative overflow-hidden transition-shadow hover:shadow-lg hover:shadow-primary/5">
                                <UIcon name="lucide-mail"
                                    class="absolute -right-4 -top-4 size-24 text-(--ui-text-muted) opacity-10 pointer-events-none transition-transform group-hover:scale-110" />

                                <div class="relative z-10 min-w-0">
                                    <p class="text-sm font-semibold text-(--ui-text)">{{ t('contact.cards.direct.title')
                                        }}</p>
                                    <p class="mt-1 text-xs text-(--ui-text-muted) leading-relaxed">
                                        {{ t('contact.cards.direct.description') }}
                                    </p>
                                    <a href="mailto:jonathan.bessa@gmail.com"
                                        class="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline underline-offset-4 transition-colors">
                                        jonathan.bessa@gmail.com
                                        <UIcon name="lucide-arrow-up-right" class="size-3 opacity-70" />
                                    </a>
                                </div>
                            </UPageCard>
                        </Motion>

                        <!-- Availability -->
                        <Motion :initial="{ opacity: 0, x: -20 }" :while-in-view="{ opacity: 1, x: 0 }"
                            :transition="{ delay: 0.2, duration: 0.5 }" :in-view-options="{ once: true }">
                            <UPageCard spotlight
                                class="group relative overflow-hidden transition-shadow hover:shadow-lg hover:shadow-primary/5">
                                <UIcon name="lucide-calendar-check"
                                    class="absolute -right-4 -top-4 size-24 text-(--ui-text-muted) opacity-10 pointer-events-none transition-transform group-hover:scale-110" />

                                <div class="relative z-10">
                                    <div class="flex items-center gap-2">
                                        <p class="text-sm font-semibold text-(--ui-text)">{{
                                            t('contact.cards.availability.title') }}</p>
                                        <span
                                            class="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500">
                                            <span class="size-1.5 rounded-full bg-green-500 animate-pulse" />
                                            {{ t('contact.cards.availability.status') }}
                                        </span>
                                    </div>
                                    <p class="mt-2 text-xs text-(--ui-text-muted) leading-relaxed"
                                        v-html="t('contact.cards.availability.description')"></p>
                                </div>
                            </UPageCard>
                        </Motion>

                        <!-- Socials -->
                        <Motion :initial="{ opacity: 0, x: -20 }" :while-in-view="{ opacity: 1, x: 0 }"
                            :transition="{ delay: 0.3, duration: 0.5 }" :in-view-options="{ once: true }">
                            <UPageCard spotlight
                                class="group relative overflow-hidden transition-shadow hover:shadow-lg hover:shadow-primary/5">
                                <UIcon name="lucide-share-2"
                                    class="absolute -right-4 -top-4 size-24 text-(--ui-text-muted) opacity-10 pointer-events-none transition-transform group-hover:scale-110" />

                                <div class="relative z-10 w-full">
                                    <p class="text-sm font-semibold text-(--ui-text) mb-3">{{
                                        t('contact.cards.socials.title')
                                        }}</p>
                                    <div class="flex gap-2">
                                        <UTooltip v-for="social in socials" :key="social.name" :text="social.name">
                                            <UButton :to="social.url" target="_blank" color="neutral" variant="soft"
                                                :icon="social.icon" size="md"
                                                class="hover:text-primary transition-colors" />
                                        </UTooltip>
                                    </div>
                                </div>
                            </UPageCard>
                        </Motion>

                    </div>

                    <!-- Right column — form -->
                    <Motion class="lg:col-span-3" :initial="{ opacity: 0, y: 24 }" :while-in-view="{ opacity: 1, y: 0 }"
                        :transition="{ delay: 0.25, duration: 0.55 }" :in-view-options="{ once: true }">
                        <UPageCard spotlight
                            class="group relative overflow-hidden transition-shadow hover:shadow-lg hover:shadow-primary/5">
                            <template #header>
                                <div class="gap-3 pt-6 pb-1">
                                    <p class="text-base font-semibold text-(--ui-text)">{{
                                        t('contact.form.header.title') }}</p>
                                    <p class="text-sm mt-1 text-(--ui-text-muted)">{{
                                        t('contact.form.header.description') }}</p>
                                </div>
                            </template>

                            <form class="flex flex-col gap-4" @submit.prevent="submit">
                                <div class="grid sm:grid-cols-2 gap-4">
                                    <UFormField :label="t('contact.form.fields.name.label')" required>
                                        <UInput v-model="name" placeholder="John Doe" size="lg" class="w-full"
                                            required />
                                    </UFormField>
                                    <UFormField :label="t('contact.form.fields.email.label')" required>
                                        <UInput v-model="email" type="email" placeholder="john.doe@example.com"
                                            size="lg" class="w-full" required />
                                    </UFormField>
                                </div>

                                <UFormField :label="t('contact.form.fields.message.label')" required>
                                    <UTextarea v-model="message"
                                        :placeholder="t('contact.form.fields.message.placeholder')" :rows="6" size="lg"
                                        class="w-full resize-none" required />
                                </UFormField>

                                <div class="flex items-center justify-between gap-4 pt-1">
                                    <p class="text-xs text-(--ui-text-muted)">
                                        <UIcon name="lucide-lock" class="inline size-3 mr-1 opacity-60" />
                                        {{ t('contact.form.footer.privacy') }}
                                    </p>
                                    <UButton type="submit" size="lg" :loading="loading"
                                        :icon="sent ? 'lucide-check' : 'lucide-send'"
                                        :color="sent ? 'success' : 'primary'" class="shrink-0 transition-all">
                                        {{ sent ? t('contact.form.buttons.sent') : t('contact.form.buttons.submit') }}
                                    </UButton>
                                </div>
                            </form>
                        </UPageCard>
                    </Motion>

                </div>
            </div>
        </UPageSection>
    </UPage>
</template>