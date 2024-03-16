<template>
    <div>home</div>
    <el-row class="mb-4">
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
    </el-row>
    <Icon icon="mdi:home" class="text-sky text-3xl" @click="handleClick" style="cursor: pointer"/>
    <component :is="Icon" :icon="iconRef"/>
</template>

<script setup lang="ts">
import {registerSW} from 'virtual:pwa-register'
// import {Icon, loadIcons} from '@iconify/vue';
import {Icon, addAPIProvider} from '@iconify/vue';
import json from '@iconify/json/json/mdi.json'

// const arr = Object.keys(json.icons)
// const iconRef = ref(arr[0])
const arr = ['123','0-circle','0-circle-fill']
const iconRef = ref('')

const handleClick = () => {
    alert('hello')
}

// addAPIProvider从本地加载图标  loadIcons从远端加载图标
addAPIProvider('local', {
    resources: ['http://localhost:5173'],
})

// 渲染前提前加载图标,避免出现图标闪烁的问题
// onBeforeMount(async () => {
//     await loadIcons(arr.map(o => json.prefix + ':' + o))
// })

onMounted(() => {
    // 定时修改图标
    setInterval(() => {
        // iconRef.value = json.prefix + ':' +arr[Math.floor(Math.random() * arr.length)]
        iconRef.value = '@local:bi:' +arr[Math.floor(Math.random() * arr.length)]
    }, 1000)
    registerSW({
        immediate: true,
        onRegisteredSW(_url, registration) {
            console.log('🚀 ~ onRegisteredSW ~ registration:', registration)
            console.log('🚀 ~ onRegisteredSW ~ _url:', _url)
            setInterval(() => {
                registration && registration.update()
            }, 3600000)
        }
    })
})
</script>

<style scoped></style>

<route lang="yaml">
meta:
layout: default
</route>
