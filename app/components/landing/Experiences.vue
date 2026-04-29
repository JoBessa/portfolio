<script setup lang="ts">
const { t } = useI18n()
interface Experience {
    company: string
    logo?: string
    role: {
        short: string
        full: string
    }
    period: string
    link: string
}

const experiences: Experience[] = [
    {
        company: 'EthiFinance',
        role: {
            short: t('home.aboutme.seniorDev.short'),
            full: t('home.aboutme.seniorDev.full')
        },
        period: '2025 — Present',
        link: '',
    },
    {
        company: 'EthiFinance',
        role: {
            short: t('home.aboutme.juniorDev.short'),
            full: t('home.aboutme.juniorDev.full')
        },
        period: '2022 — 2025',
        link: '',
    },
    {
        company: 'EthiFinance',
        role: {
            short: t('home.aboutme.apprenticeDev.short'),
            full: t('home.aboutme.apprenticeDev.full')
        },
        period: '2019 — 2022',
        link: '',
    },
]
</script>

<template>
    <UPageSection :ui="{
        container: 'py-0 sm:py-0 lg:py-0'
    }">
        <UPageGrid :ui="{
            base: 'lg:grid-cols-2'
        }">
            <Motion :initial="{ opacity: 0, transform: 'translateY(20px)' }"
                :while-in-view="{ opacity: 1, transform: 'translateY(0)' }" :transition="{ delay: 0.2, duration: 0.5 }"
                :in-view-options="{ once: true }" class="w-full">
                <p class="text-neutral font-bold text-xl mb-4 text-center sm:test-start">About Me</p>
                <p class="text-muted text-balance">{{ t('home.aboutme.summary') }}</p>
            </Motion>
            <div class="w-full">
                <p class="text-neutral font-bold text-xl mb-4 text-center sm:text-start">Work Experience</p>
                <div class="flex flex-col gap-4 text-neutral text-xs sm:text-sm">
                    <Motion v-for="(experience, index) in experiences" :key="index"
                        :initial="{ opacity: 0, transform: 'translateY(20px)' }"
                        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
                        :transition="{ delay: 0.4 + 0.2 * index }" :in-view-options="{ once: true }"
                        class="text-muted flex items-center text-nowrap gap-2">
                        <p class="text-sm">
                            {{ experience.period }}
                        </p>
                        <USeparator />
                        <ULink class="flex items-center gap-1 cursor-pointer" :to="experience.link" target="_blank">
                            <span class="text-sm">
                                <span class="sm:hidden">
                                    {{ experience.role.short }}
                                </span>
                                <span class="hidden sm:inline">
                                    {{ experience.role.full }}
                                </span>
                                &nbsp;{{ t('home.aboutme.at') }}&nbsp;
                            </span>
                            <div class="inline-flex items-center gap-1 text-primary">
                                <span class="font-medium text-neutral">{{ experience.company }}</span>
                            </div>
                        </ULink>
                    </Motion>
                </div>
            </div>
        </UPageGrid>
    </UPageSection>
</template>