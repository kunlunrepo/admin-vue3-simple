<!--所有的element-plus的图标-->
<template>
    <div class="w-full flex justify-end px-4">
        <el-checkbox v-model="copyElement" label="复制Icon组件" class="mb-2"/>
        <el-switch v-model="copyTypeFlay" active-text="复制Icon名称" inactive-text="复制Icon图标" class="mb-2 mx-4"/>
        <el-switch v-model="showText" active-text="显示名称" inactive-text="隐藏文字" class="mb-2"/>
    </div>
    <IconList :show-text="showText" @click="handleClick"/>
</template>

<script setup lang="ts">
import { loadIcon} from '@iconify/vue'
import { ElMessage } from 'element-plus'

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

definePage({
    meta: {
        title: '图标列表',
        icon: 'mdi:bookmark-multiple'
    }
})
</script>
