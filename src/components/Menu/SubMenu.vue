<template>
    <MenuItem :data="data" :collapse="collapse" v-if="!menuHasChildren(data)"/>
  <!--有下拉菜单item-->
    <el-sub-menu :index="getIndex(data)" v-if="menuHasChildren(data)">
        <template #title v-if="!data.meta?.icon">
            {{ $t(data.meta?.title || '') }}
        </template>
        <!--折叠,侧栏-->
        <template #title v-else>
            <Iconify :icon="data.meta?.icon" :style="iconProps?.style" :class="iconProps?.class"/>
            <span>{{ $t(data.meta?.title || '') }}</span>
        </template>
        <SubMenu v-for="child in data.children" :key="`${data.path}/${child.path}`" :data="child" v-bind="subAttrs"/>
    </el-sub-menu>
</template>

<script setup lang="ts">
import type {SubMenuProps as ElSubMenuProps} from "element-plus";
import type {AppRouteMenuItem} from "@/components/Menu/types";
import {useMenu} from "@/components/Menu/useMenu";
import MenuItem from "@/components/Menu/MenuItem.vue";
import {IconOptions} from "@/components/Menu/types";
import Iconify from "@/components/Icon/Iconify.vue";

interface SubMenuProps extends Partial<ElSubMenuProps> {
    data: AppRouteMenuItem
    collapse?: boolean
}

const props = defineProps<SubMenuProps>()

const iconProps = inject('iconProps') as IconOptions

const subAttrs = computed(() => {
    const {data, ...restProps} = props
    return restProps
})

const { getIndex, menuHasChildren } = useMenu()
</script>

<style scoped>

</style>
