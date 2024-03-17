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

</script>

<style scoped>

</style>
