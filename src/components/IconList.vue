<template>
    <div class="w-full flex justify-end px-4">
        <el-checkbox v-model="copyElement" label="复制Icon组件" class="mb-2"/>
        <el-switch v-model="copyTypeFlay" active-text="复制Icon名称" inactive-text="复制Icon图标" class="mb-2 mx-4"/>
        <el-switch v-model="showText" active-text="显示名称" inactive-text="隐藏文字" class="mb-2"/>
    </div>
    <ul class="flex flex-wrap border rounded">
        <li class="w-1/8 border-r border-b flex flex-col justify-center items-center cursor-pointer hover:bg-sky-100 py-4"
            v-for="(i, index) in iconData" :key="index" @click="handleClick(i)">
            <component :is="Icon" :icon="'ep:'+i" class="text-3xl mb-3"/>
            <div v-if="showText" class="text-sm">{{ convertString(i) }}</div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import {Icon, loadIcons, loadIcon} from '@iconify/vue'
import iconData from './icon-ep.json'
import { ElMessage } from 'element-plus'

// 渲染前提前加载图标,避免出现图标闪烁的问题
onBeforeMount(async () => {
    await loadIcons(iconData)
})

// false - CopySvgData
// true - CopyName
const copyTypeFlay = ref(true)
const source = ref('')
// 导入内容
const { copy, copied} = useClipboard({source})

const copyElement = ref(false)
const showText = ref(true)

// 图标事件
async function handleClick(i : string) {
    console.log()
    if (copyElement.value) {
        const ele = `<div class="i-ep:${i}"></div>`;
        source.value = ele;
        console.log("🚀 复制ICON组件 ele = ",ele)
    } else if (!copyTypeFlay.value) {
        const res = await loadIcon('ep:' + i)
        source.value = objectToSvg(res)
        console.log("🚀 复制ICON图标 res = ",res)
    } else {
        source.value = convertString(i)
        console.log("🚀 复制ICON名称")
    }
    copy()
    copied && ElMessage({
        message: '复制成功',
        type: 'success'
    })
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

// 转换为svg格式
function objectToSvg(svgObject: any) {
    const {body, hFlip, height, left, rotate, top, vFlip, width} = svgObject;
    let svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" transform="translate(${left} ${top})
 rotate(${rotate}) ${hFlip?' scale(-1 1)' : ''} ${vFlip?' scale(1 -1)' : ''}">
        ${body}
        </svg>`
    return svgString
}

</script>
