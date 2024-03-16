<template>
    <ul class="flex flex-wrap border rounded">
        <li :class="['border-r border-b flex flex-col justify-center items-center cursor-pointer', itemClass] "
            v-for="(i, index) in iconData" :key="index" @click="handleClick(i)">
            <component :is="Icon" :icon="`${collection}:${i}`" :class="iconClass"/>
            <div v-if="showText" class="text-sm">{{ convertString(i) }}</div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import {Icon, loadIcons, loadIcon} from '@iconify/vue'
import data from './icon-ep.json'
import { ElMessage } from 'element-plus'

interface IconListType {
    iconData: string[] // 数组比较特殊
    collection: string
    itemClass: string
    iconClass: string
    showText: boolean
}

const props = withDefaults(defineProps<IconListType>(), {
    iconData: () => data,
    collection: 'ep',
    iconClass: 'text-3xl mb-3',
    itemClass: 'hover:bg-sky-100 w-1/8 py-4',
    showText: true
})

// 渲染前提前加载图标,避免出现图标闪烁的问题
onBeforeMount(async () => {
    props.iconData && props.iconData.length && (await loadIcons(props.iconData.map(o=>`${props.collection}:${o}`)))
})

// 回调事件
const emits = defineEmits(['click'])

// 图标事件
async function handleClick(i : string) {
    emits('click',i)
}

// 下划线转驼峰
function convertString(input: string): string {
    const words = input.split('-')
    const capitalizedWords = words.map((word, index) => {
        if (index === 0) {
            return capitalize(word)
        } else {
            return capitalize(word, true)
        }
    })
    return capitalizedWords.join('')
}

function capitalize(word: string, capitalizeFirstLetter = false): string {
    if (capitalizeFirstLetter) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    } else {
        return word.toLowerCase().replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase())
    }
}

</script>
