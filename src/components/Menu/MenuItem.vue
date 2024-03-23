<template>
  <!--单个item-->
    <el-menu-item :index="getIndex(data)" :disabled="data.meta?.disabled" v-if="!data.meta?.icon">
        {{ data.meta?.title }}
    </el-menu-item>
    <template v-else>
        <!--折叠-->
        <el-menu-item v-if="collapse" :index="getIndex(data)" :disabled="data.meta?.disabled">
            <Iconify :icon="data.meta?.icon"></Iconify>
            <template #title>{{ data.meta?.title }}</template>
        </el-menu-item>
        <!--侧栏-->
        <el-menu-item v-else :index="getIndex(data)" :disabled="data.meta?.disabled">
            <Iconify :icon="data.meta?.icon"></Iconify>
            <span>{{ data.meta?.title }}</span>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts">
import {useMenu} from "@/components/Menu/useMenu";
import type {AppRouteMenuItem} from "@/components/Menu/types";

interface MenuItemProps {
    data: AppRouteMenuItem
    collapse: boolean
}

const props = defineProps<MenuItemProps>()

const {getIndex, menuHasChildren} = useMenu()
</script>

<style scoped>

</style>
