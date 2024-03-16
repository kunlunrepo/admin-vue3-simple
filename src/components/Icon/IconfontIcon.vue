<template>
    <NetIcon v-bind="props"></NetIcon>
</template>

<script setup lang="ts">
import NetIcon from "@/components/Icon/NetIcon.vue";
/**
 * v-bind="$attrs" 透传所有传递父组件属性给子组件
 */
import type {NetIconProps} from "@/components/Icon/types";

const props = withDefaults(defineProps<NetIconProps>(), {
    url: '//at.alicdn.com/t/font_1791095_hy6b9xbrdsk.css',
    prefix: 'iconfont-',
    fontFamily: 'iconfont',
    type: ''
})
</script>
