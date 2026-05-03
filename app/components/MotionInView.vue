<!-- components/MotionInView.vue -->
<script setup lang="ts">
defineProps<{
    delay?: number
    duration?: number
}>()

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })
</script>

<template>
    <Motion v-if="isMounted" :initial="{ opacity: 0, transform: 'translateY(20px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: delay ?? 0, duration: duration ?? 0.5 }" :in-view-options="{ once: true }">
        <slot />
    </Motion>
    <!-- Fallback SSR : visible direct, pas d'observer -->
    <slot v-else />
</template>