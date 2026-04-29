<script setup lang="ts">
const year = new Date().getFullYear()

const footerLinks = {
    socials: [
        { label: 'LinkedIn', to: 'https://www.linkedin.com/in/jonathan-bessa', icon: 'i-simple-icons-linkedin' }
    ]
}
</script>

<template>
    <UFooter>
        <template #left>
            <p class="text-muted text-sm">© {{ year }}&nbsp;Jonathan&nbsp;Bessa</p>
        </template>
        <template #right>
            <div
                class="flex flex-col gap-3 text-sm text-(--ui-text-toned) sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <a href="https://www.linkedin.com/in/jonathan-bessa" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 hover:text-(--ui-text-highlighted)">
                    <UIcon name="i-simple-icons-linkedin" class="size-4" />
                    LinkedIn
                </a>
            </div>
        </template>
    </UFooter>
</template>