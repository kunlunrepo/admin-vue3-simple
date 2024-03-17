<template>
    <el-badge :value="value" :style="{
        '--toimc-notice-bg-color': color || 'var(--el-color-danger)',
        '--toimc-notice-font-size': size + 'px' || 'var(--el-badge-size)'
    }">
        <slot>
            <Icon icon="ep:bell" class="text-3xl"
                  :style="{color: iconColor ?? '#333',
                  fontSize: iconSize ? `${iconSize}px` : '18px'}"></Icon>
        </slot>
    </el-badge>
</template>

<script setup lang="ts">
import Icon from "../Icon/Iconify.vue";
import {BadgeProps} from "element-plus";
import type {IconifyIcon} from "@iconify/vue";

interface NotificationProps extends Partial<BadgeProps> {
    icon: string | IconifyIcon
    iconSize?: number
    iconColor?: string
    size: number
    color: string
}

withDefaults(defineProps<NotificationProps>(), {
    icon: 'ep:bell',
    size: 12,
    color: ''
})


</script>

<style scoped lang="scss">
$color: var(--toimc-notice-bg-color);
$size: var(--toimc-notice-font-size);
:deep(.el-badge__content) {
    background-color: $color;
    font-size: $size;
}
</style>
