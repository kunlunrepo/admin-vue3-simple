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
        title: 'pages.pick-icon',
        icon: 'healthicons:i-exam-multiple-choice'
    }
})
</script>

<style scoped>

</style>
