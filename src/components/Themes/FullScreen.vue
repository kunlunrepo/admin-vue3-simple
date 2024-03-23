<template>
    <!--动态组件-->
    <component :is="tag" @click="toggle"
               :class="[!isFullscreen? 'i-ep:full-screen' : 'i-ri:fullscreen-exit-fill', 'cursor-pointer']"/>
</template>

<script setup lang="ts">
const {isFullscreen, toggle} = useFullscreen()

// 使用动态组件
defineProps({
    tag: {
        type: String,
        default: 'i'
    },
    iconClass: {
        type: String,
        default: 'text-xl'
    }
})

</script>

<style scoped>

</style>
