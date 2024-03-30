<template>
    <el-menu v-bind="menuProps" :style="{'--bg-color': backgroundColor}" class="border-r-0!"
             @select="handleSelect" @open="handleOpen" @close="handleClose">
        <slot name="icon"></slot>
        <!--左右logo+菜单的情况-->
        <div class="flex-grow" v-if="isDefined(slots['icon'])"></div>
        <sub-menu v-for="menu in filterMenus"
                  :key="menu.path"
                  v-bind:data="menu"
                  v-bind="subMenuProps"
                  :collapse="collapse"
        ></sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import SubMenu from "@/components/Menu/SubMenu.vue";
import type {AppRouteMenuItem, EmitSelectType, MenuProps, OpenCloseType} from "@/components/Menu/types";
import {useMenu} from "@/components/Menu/useMenu";
import {isDefined} from "@vueuse/core";
import {onMounted} from "vue";


const props = withDefaults(defineProps<MenuProps>(), {
    data: () => [],
    iconProps: () => {
        return {
            style: { fontSize: '22px'},
            class: 'mr-3'
        }
    },
    backgroundColor: 'transparent'
})

onMounted(() => {
    console.log("🚀 菜单路由", props, props.iconProps)
})

const iconProps = reactive(props.iconProps)

watch(() => props.collapse, () => {
    console.log("🚀 菜单图标 前", props.iconProps)
    iconProps.class = props.collapse ? '' : 'mr-3'
    console.log("🚀 菜单图标 后", props.iconProps)
})

provide('iconProps', props.iconProps)

const {generateMenuKeys, getItem} = useMenu()

const filterMenus = computed(() => generateMenuKeys(props.data))

const slots = useSlots()

const menuProps = computed(() => {
    const {subMenuProps, data, ...restProps} = props
    return restProps
})

// 定义菜单弹射事件
const emits = defineEmits<{
    select: [item: AppRouteMenuItem]
    open: [args: OpenCloseType]
    close: [args: OpenCloseType]
}>()

const handleSelect = (...args: EmitSelectType) => {
    const [index] = args
    const item = getItem(filterMenus.value, index)
    if (item) emits('select', item)
}
const handleOpen = (...args: OpenCloseType) => {
    emits('open', args)
}
const handleClose = (...args: OpenCloseType) => {
    emits('close', args)
}

</script>

<style lang="scss">
.el-menu--vertical .el-sub-menu__title{
    padding-right: 0 !important;
}

.el-menu--horizontal.el-menu {
    border-bottom: 0 !important;
}
</style>
