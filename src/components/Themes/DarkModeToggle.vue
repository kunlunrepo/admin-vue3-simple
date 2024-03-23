<template>
    <el-switch
        style="--el-switch-on-color: #333"
        v-model="isDark" :active-action-icon="Moon" :inactive-action-icon="Sun" size="large"/>
</template>

<script setup lang="ts">
import {onMounted} from "vue";

// 设置默认值
const props = defineProps({
    dark: Boolean
})
// 主题模式
// const isDark = ref(props.dark)
const isDark = useStorage('dark-mode-flag', props.dark)
// 跟随系统
const preferredDark = usePreferredDark()
// 月亮图标
const Moon = () => h('i', {
    class: 'i-prime:moon text-3xl',
})
// 太阳图标
const Sun = () => h('i', {
    class: 'i-octicon:sun-24 text-3xl',
})

function toggleMode(flag: boolean) {
    if (flag) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

watch([isDark],()=> {
    nextTick(()=> {
        toggleMode(isDark.value)
    })
}, {
    immediate: true
})

watch([preferredDark],()=> {
    nextTick(()=> {
        toggleMode(preferredDark.value)
        isDark.value=preferredDark.value
    })
})

onMounted(() => {
    // 如果用户未设置过darkmode，则使用系统的暗黑模式
    if (typeof isDark.value === 'undefined' && !props.dark) {
        toggleMode(preferredDark.value)
        isDark.value = preferredDark.value
    }
})


</script>

<style scoped>

</style>
