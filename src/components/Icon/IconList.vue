<template>
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(1.825rem,1fr))] border-l border-t rounded">
        <li :class="['border-r border-b flex flex-col justify-center items-center cursor-pointer', itemClass] "
            v-for="(i, index) in iconData" :key="index" @click="handleClick(`${collection}:${i}`, index)">
            <component :is="Icon" :icon="`${collection}:${i}`"
                       :class="[iconClass, { [activeClass]: modelValue ? modelValue === `${collection}:${i}` : choose === index}]"/>
            <div v-if="showText" class="text-sm">{{ convertString(i) }}</div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import {Icon, loadIcons, loadIcon} from '@iconify/vue'
import data from './icon-ep.json'
import {ElMessage} from 'element-plus'
import type {IconListProps} from "@/components/Icon/types";

// VUE3.3后的新API
const modelValue = defineModel(
)

const props = withDefaults(defineProps<IconListProps>(), {
    iconData: () => data,
    collection: 'ep',
    iconClass: 'text-3xl mb-3',
    itemClass: 'hover:bg-sky-100 w-1/8 py-4',
    showText: true
})

// 渲染前提前加载图标,避免出现图标闪烁的问题
onBeforeMount(async () => {
    props.iconData && props.iconData.length && (await loadIcons(props.iconData.map(o => `${props.collection}:${o}`)))
})

// 回调事件
const emits = defineEmits(['click'])

// 选中图标下标
const choose = ref<number>()

// 图标事件
async function handleClick(i: string, num: number) {
    choose.value = num
    modelValue.value = i
    emits('click', i)
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
