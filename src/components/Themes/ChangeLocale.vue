<template>
    <el-dropdown trigger="click" @command="handleCommand">
        <slot name="header">
            <span class="el-dropdown-link">
                <Iconify icon="ion:language"  v-bind="iconPropsComputed" :class="iconClass"></Iconify>
            </span>
        </slot>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="(locale, index) in locales" :key="index" :command="locale.name">
                    <div class="flex items-center">
                        <Iconify v-if="locale.icon" :icon="locale.icon" v-bind="iconPropsComputed" class="mr-2" :class="iconClass"></Iconify>
                        {{ locale.text }}
                    </div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import Iconify from "@/components/Icon/Iconify.vue";
import type {LocaleItem} from "@/components/Themes/types";
import type {IconProps} from "@iconify/vue";



interface ChangeLocaleProps extends Partial<IconProps> {
    locales: LocaleItem[]
    iconClass?: string
}

const props = withDefaults(defineProps<ChangeLocaleProps>(), {
    iconClass: 'text-xl'
})

// const dropDownItemIcon = (icon: IconifyIcon | string) => <Iconify icon={icon}></Iconify>

// const dropDownItemIcon = (icon: IconifyIcon | string) => h('Iconify', {
//     icon
// })

const handleCommand = (command: string | number | object) => {
    console.log("🚀 国际化", command)
}

const iconPropsComputed = computed(() => {
    const { locales, icon, ...restProps } = props
    return restProps
})

</script>

<style scoped>

</style>
