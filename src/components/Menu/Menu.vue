<template>
    <el-menu v-bind="menuProps" :style="{'--bg-color': backgroundColor}" class="border-r-0!">
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
import type {MenuProps} from "@/components/Menu/types";
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

const {generateMenuKeys} = useMenu()

const filterMenus = computed(() => generateMenuKeys(props.data))

const slots = useSlots()

const menuProps = computed(() => {
    const {subMenuProps, data, ...restProps} = props
    return restProps
})

</script>

<style lang="scss">
.el-menu--vertical .el-sub-menu__title{
    padding-right: 0 !important;
}

.el-menu--horizontal.el-menu {
    border-bottom: 0 !important;
}
</style>
