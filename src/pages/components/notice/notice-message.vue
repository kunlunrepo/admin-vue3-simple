<template>
  <div>
      通知组件示例
      <Notification value="123456" :scale="scale">
      </Notification>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      {{scale}}
      <el-button @click="scale=0.5">点击</el-button>
      <el-button @click="scale=1">点击</el-button>
      <el-button @click="scale=1.5">点击</el-button>
  </div>
</template>

<script setup lang="ts">
import Notification from "@/components/Notice/Notification.vue";

const scale = ref(0.5);
</script>

<style scoped lang="scss">
</style>
