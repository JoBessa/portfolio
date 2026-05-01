<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import { isJSDocNamepathType } from 'typescript'

const { t } = useI18n()
useSeoMeta({ title: computed(() => t('contact.seo_title')) })

// ── Types ────────────────────────────────────────────────────────────────────
type ContractType = 'CDI' | 'CDD' | 'freelance' | 'stage'

// ── Form state ───────────────────────────────────────────────────────────────
const senderName = ref('')
const email = ref('')
const company = ref('')
const contractType = ref<ContractType | undefined>(undefined)
const message = ref('')
const turnstileToken = ref('')

const loading = ref(false)
const sent = ref(false)
const toast = useToast()

// ── Computed Translations ───────────────────────────────────────────────────
const contractItems = computed<SelectItem[]>(() => [
    { label: 'CDI', value: 'CDI' },
    { label: 'CDD', value: 'CDD' },
    { label: t('contact.form.contract_freelance'), value: 'freelance' },
    { label: t('contact.form.contract_internship'), value: 'stage' },
])

const socials = [
    { name: 'GitHub', url: 'https://github.com/Jonatbes', icon: 'simple-icons:github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jonathan-bessa-137691216/', icon: 'simple-icons:linkedin' },
]

// ── Validation ───────────────────────────────────────────────────────────────
const isFormValid = computed(() =>
    !!senderName.value.trim() &&
    !!email.value.trim() &&
    !!company.value.trim() &&
    contractType.value !== undefined &&
    !!message.value.trim() &&
    !!turnstileToken.value
)

const isNonCdi = computed(() =>
    contractType.value !== undefined && contractType.value !== 'CDI'
)

// ── Submit ───────────────────────────────────────────────────────────────────
const reset = () => {
    senderName.value = ''
    email.value = ''
    company.value = ''
    contractType.value = undefined
    message.value = ''
    turnstileToken.value = ''
}

const submit = async () => {
    if (!isFormValid.value) return
    loading.value = true
    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: {
                name: senderName.value,
                email: email.value,
                company: company.value,
                contractType: contractType.value,
                message: message.value,
                turnstileToken: turnstileToken.value,
            },
        })
        sent.value = true
        toast.add({
            title: t('contact.notifications.success_title'),
            description: t('contact.notifications.success_desc'),
            color: 'success',
            icon: 'lucide-check-circle',
        })
        reset()
        setTimeout(() => { sent.value = false }, 5000)
    } catch {
        toast.add({
            title: t('contact.notifications.error_title'),
            description: t('contact.notifications.error_desc'),
            color: 'error',
            icon: 'lucide-alert-circle',
        })
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <UPage>
        <!-- ── HERO ──────────────────────────────────────────────────────── -->
        <UPageHero :ui="{
            container: 'pb-0 sm:pb-0 lg:pb-0'
        }">
            <template #title>
                <Motion :initial="{ opacity: 0, y: 24 }" :while-in-view="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.55 }" :in-view-options="{ once: true }">
                    <span>{{ t('contact.hero.title_line1') }}</span><br><span class="text-primary">{{
                        t('contact.hero.title_line2') }}</span>
                </Motion>
            </template>
            <template #description>
                <Motion :initial="{ opacity: 0, y: 20 }" :while-in-view="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.15, duration: 0.5 }" :in-view-options="{ once: true }">
                    {{ t('contact.hero.description') }}
                </Motion>
            </template>
        </UPageHero>

        <!-- ── MAIN CONTENT ──────────────────────────────────────────────── -->
        <UPageSection :ui="{
            container: 'py-6 sm:py-8 lg:py-8'
        }">
            <div class="mx-auto">
                <div class="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

                    <!-- Left — info cards -->
                    <div class="lg:col-span-2 flex flex-col gap-4">
                        <Motion :initial="{ opacity: 0, x: -20 }" :while-in-view="{ opacity: 1, x: 0 }"
                            :transition="{ delay: 0.1, duration: 0.5 }" :in-view-options="{ once: true }">
                            <UPageCard class="relative overflow-hidden" spotlight>
                                <UIcon name="lucide-mail"
                                    class="absolute -top-2 -right-2 size-18 text-muted opacity-10 pointer-events-none select-none" />
                                <div class="flex flex-col gap-1">
                                    <p class="text-sm font-semibold text-default">{{ t('contact.cards.direct_title')
                                    }}
                                    </p>
                                    <p class="text-xs text-muted leading-relaxed">
                                        {{ t('contact.cards.direct_desc') }}
                                    </p>
                                    <a href="mailto:dbessa.jonathan@gmail.com"
                                        class="mt-1.5 text-xs font-medium text-primary hover:underline underline-offset-4 transition-colors w-fit">
                                        dbessa.jonathan@gmail.com
                                    </a>
                                </div>
                            </UPageCard>
                        </Motion>

                        <Motion :initial="{ opacity: 0, x: -20 }" :while-in-view="{ opacity: 1, x: 0 }"
                            :transition="{ delay: 0.2, duration: 0.5 }" :in-view-options="{ once: true }">
                            <UPageCard class="relative overflow-hidden" spotlight>
                                <UIcon name="lucide-calendar-check"
                                    class="absolute -top-2 -right-2 size-18 text-muted opacity-10 pointer-events-none select-none" />
                                <div class="flex flex-col gap-1">
                                    <div class="flex items-center gap-2">
                                        <p class="text-sm font-semibold text-default">{{
                                            t('contact.cards.availability_title')
                                        }}</p>
                                        <UBadge color="success" variant="soft" size="xs">
                                            <span class="size-1.5 rounded-full bg-green-500 animate-pulse mr-1" />
                                            {{ t('contact.cards.availability_status') }}
                                        </UBadge>
                                    </div>
                                    <p class="text-xs text-muted leading-relaxed">{{
                                        t('contact.cards.availability_desc_line1')
                                    }}</p>
                                    <p class="text-xs text-muted leading-relaxed">{{
                                        t('contact.cards.availability_desc_line2')
                                    }}</p>
                                </div>
                            </UPageCard>
                        </Motion>

                        <Motion :initial="{ opacity: 0, x: -20 }" :while-in-view="{ opacity: 1, x: 0 }"
                            :transition="{ delay: 0.3, duration: 0.5 }" :in-view-options="{ once: true }">
                            <UPageCard class="relative overflow-hidden" spotlight>
                                <UIcon name="lucide-share-2"
                                    class="absolute -top-2 -right-2 size-18 text-muted opacity-10 pointer-events-none select-none" />
                                <div class="flex flex-col gap-2">
                                    <p class="text-sm font-semibold text-default">{{
                                        t('contact.cards.socials_title') }}
                                    </p>
                                    <div class="flex gap-2">
                                        <UTooltip v-for="social in socials" :key="social.name" :text="social.name">
                                            <UButton :to="social.url" target="_blank" color="neutral" variant="ghost"
                                                :icon="social.icon" size="md" />
                                        </UTooltip>
                                    </div>
                                </div>
                            </UPageCard>
                        </Motion>
                    </div>

                    <!-- Right — form -->
                    <Motion class="lg:col-span-3" :initial="{ opacity: 0, y: 24 }" :while-in-view="{ opacity: 1, y: 0 }"
                        :transition="{ delay: 0.2, duration: 0.55 }" :in-view-options="{ once: true }">
                        <UPageCard class="relative overflow-hidden" spotlight>
                            <UIcon name="lucide-message-square-text"
                                class="absolute -top-2 -right-2 size-18 text-muted opacity-15 pointer-events-none select-none" />

                            <template #header>
                                <div class="px-1 pt-1">
                                    <p class="font-semibold text-default">{{ t('contact.form.header_title') }}</p>
                                    <p class="text-xs text-muted mt-0.5">
                                        {{ t('contact.form.header_subtitle') }}
                                    </p>
                                </div>
                            </template>

                            <form class="flex flex-col gap-5" @submit.prevent="submit">
                                <div class="grid sm:grid-cols-2 gap-4">
                                    <UFormField :label="t('contact.form.label_name')" required>
                                        <UInput v-model="senderName" :placeholder="t('contact.form.placeholder_name')"
                                            size="lg" class="w-full" autocomplete="name" required />
                                    </UFormField>
                                    <UFormField :label="t('contact.form.label_email')" required>
                                        <UInput v-model="email" type="email" placeholder="john.doe@john.com" size="lg"
                                            class="w-full" autocomplete="email" required />
                                    </UFormField>
                                </div>

                                <UFormField :label="t('contact.form.label_company')" required>
                                    <UInput v-model="company" :placeholder="t('contact.form.placeholder_company')"
                                        size="lg" class="w-full" autocomplete="organization" required />
                                </UFormField>

                                <UFormField :label="t('contact.form.label_contract')" required>
                                    <USelect v-model="contractType" :items="contractItems"
                                        :placeholder="t('contact.form.placeholder_select')" size="lg" class="w-full" />
                                    <Transition enter-active-class="transition-all duration-200"
                                        enter-from-class="opacity-0 -translate-y-1"
                                        enter-to-class="opacity-100 translate-y-0"
                                        leave-active-class="transition-all duration-150"
                                        leave-from-class="opacity-100 translate-y-0"
                                        leave-to-class="opacity-0 -translate-y-1">
                                        <p v-if="isNonCdi" class="mt-1.5 text-xs text-warning flex items-center gap-1">
                                            <UIcon name="lucide-alert-triangle" class="size-3 shrink-0" />
                                            {{ t('contact.form.warning_cdi') }}
                                        </p>
                                    </Transition>
                                </UFormField>

                                <UFormField :label="t('contact.form.label_message')" required>
                                    <UTextarea v-model="message" :placeholder="t('contact.form.placeholder_message')"
                                        :rows="5" size="lg" class="w-full" required />
                                </UFormField>

                                <NuxtTurnstile v-model="turnstileToken" :options="{ theme: 'auto' }" class="hidden" />

                                <div class="flex items-center justify-between gap-4 pt-1">
                                    <p class="text-xs text-muted flex items-center gap-1.5">
                                        <UIcon name="lucide-lock" class="size-3 shrink-0" />
                                        {{ t('contact.form.privacy_note') }}
                                    </p>
                                    <UButton type="submit" size="lg" :loading="loading" :disabled="!isFormValid"
                                        :icon="sent ? 'lucide-check' : 'lucide-send'"
                                        :color="sent ? 'success' : 'primary'" class="shrink-0">
                                        {{ sent ? t('contact.form.btn_sent') : t('contact.form.btn_send') }}
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