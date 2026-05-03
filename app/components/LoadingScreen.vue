<script setup lang="ts">
const isLoading = ref(true)

onMounted(() => {
    // Timeout pour laisser le temps à l'interface de se monter et donner un effet doux
    setTimeout(() => {
        isLoading.value = false
    }, 800)
})
</script>

<template>
    <Transition
        enter-active-class="transition-opacity duration-300 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-500 ease-in-out delay-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div v-if="isLoading" class="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white dark:bg-[#020618]">
            <UIcon name="i-lucide-loader-circle" class="size-10 animate-spin text-primary" />
        </div>
    </Transition>
</template>
