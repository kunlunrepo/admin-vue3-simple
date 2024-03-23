<template>
    <div>
        <IconPicker @submit="handleSubmit" />
    </div>
</template>

<script lang="ts" setup>
import type {IconPickerSubmitDataProps} from "@/components/Icon/types";


// icon采集器弹窗返回的值
const handleSubmit = (data: IconPickerSubmitDataProps) => {
    console.log("🚀 ICON拾取器 data = ",data)
}
definePage({
    meta: {
        title: '图标选择器',
        icon: 'healthicons:i-exam-multiple-choice'
    }
})
</script>

<style scoped>

</style>
