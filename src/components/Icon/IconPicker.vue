<template>
    <div class="icon-picker">
        <el-button type="primary" @click="() => toggle(true)">
            <slot>{{ $t('components.icon-picker') }}</slot>
        </el-button>
        <el-dialog :width="width" v-model="show" :title="$t(title)">
            <!--icon列表-->
            <IconList item-class="hover:bg-sky-100" icon-class="text-2xl" :show-text="false" @click="handleClick"
                      active-class="text-sky"/>
            <!--设置-->
            <div class="p-2 flex">
                <div class="mr-4">
                    <span class="pr-2">color:</span>
                    <el-color-picker v-model="color" class="mr-2"/>
                </div>
                <div class="flex items-center flex-1">
                    <span class="pr-2">fontSize:</span>
                    <el-slider v-model="num" :step="1" show-input/>
                </div>
            </div>
            <div class="flex item-center">
                <span class="pr-2">{{ $t('components.choose-icon') }}：</span>
                <Icon :icon="iconRef" :style="{color: color, fontSize: `${num}px`}"/>
                <span class="pl-2">{{ iconRef }}</span>
            </div>
            <template #footer>
                <el-button @click="() => toggle(false)">{{ $t('components.cancel') }}</el-button>
                <el-button type="primary" @click="handleConfirm">{{ $t('components.submit') }}</el-button>
            </template>
        </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import type {IconPickerSubmitDataProps} from "@/components/Icon/types";

interface IconPickerProps {
    width?: string
    title?: string
}

withDefaults(defineProps<IconPickerProps>(), {
    width: '50%',
    title: 'components.icon-picker'
})

// 选中颜色
const color = ref("#409eff")
// 图标大小
const num = ref(16)
// icon
const iconRef = ref("")
// 模态框参数
const [show, toggle] = useToggle(false)
// 向外暴露事件
const emits = defineEmits<{
    submit: [IconPickerSubmitDataProps],
    cancel: []
}>()

// 测试数据
const test = ref("ep:apple")

// 点击事件
const handleClick = (i: string) => {
    console.log("🚀 点了图标 = ", i)
    iconRef.value = i
}

// 确定并关闭模态框
const handleConfirm = () => {
    toggle(false)
    emits('submit', {icon: iconRef.value, color: color.value, fontSize: num.value})
}

</script>

<style scoped lang="scss">
.icon-picker{
    :deep(.el-dialog__body){
        height: auto;
        padding-top: 0;
        padding-bottom: 0;
        max-height: 65vh;
        overflow-y: auto;
    }
}
</style>
