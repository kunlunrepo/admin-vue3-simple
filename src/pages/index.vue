<template>
    <div>首页</div>
    <el-row class="mb-4">
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
        <Icon icon="mdi:home" class="text-sky text-3xl" @click="handleClick" style="cursor: pointer"/>
        <component :is="Icon" :icon="iconRef"/>
        <img :src="svg" class="text-red text-3xl w-5 h-5 bg-red">
        <SvgIcon type="advice" class="text-sky w-5 h-5"></SvgIcon>
        <SvgIcon type="record" class="text-red w-5 h-5"></SvgIcon>
        <SvgIcon type="setting" class="text-yellow w-5 h-5"></SvgIcon>
        <SvgIcon type="share" class="text-green w-5 h-5"></SvgIcon>
        <!--    <i class="iconfont iconfont-kefu"></i>-->
        <NetIcon url="//at.alicdn.com/t/font_1791095_hy6b9xbrdsk.css" type="kefu"/>
        <IconfontIcon type="yicaina"/>
    </el-row>
    <el-row class="mb-4">
        <IconList/>
    </el-row>
</template>

<script setup lang="ts">
import {registerSW} from 'virtual:pwa-register'
// import {Icon, loadIcons} from '@iconify/vue';
import {Icon, addAPIProvider} from '@iconify/vue';
import json from '@iconify/json/json/mdi.json'
import svg from '@/assets/icons/advice.svg'
import SvgIcon from "@/components/SvgIcon.vue";
import NetIcon from "@/components/NetIcon.vue";
import IconfontIcon from "@/components/IconfontIcon.vue";
import IconList from "@/components/IconList.vue";

// const arr = Object.keys(json.icons)
// const iconRef = ref(arr[0])
const arr = ['123', '0-circle', '0-circle-fill']
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
        iconRef.value = '@local:bi:' + arr[Math.floor(Math.random() * arr.length)]
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
