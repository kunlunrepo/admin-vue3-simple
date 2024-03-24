<template>
    <el-row class="items-center">
        <Iconify :icon="collapseModel ? 'ep:expand' : 'ep:fold'" class="text-2xl cursor-pointer" @click="collapseModel = !collapseModel"></Iconify>
        <div class="flex-grow">
            <slot></slot>
        </div>
        <el-row class="items-center">
            <ThemeSettings v-bind="settings" @change="handleChange"></ThemeSettings>
            <DarkModeToggle :dark="settings?.darkMode" @change="handleDarkModeToggle" class="mr-2"></DarkModeToggle>
            <ChangeLocale :locales="locales" class="mr-2"></ChangeLocale>
            <FullScreen></FullScreen>
            <el-divider direction="vertical"></el-divider>
            <!--用户头像下拉菜单-->
            <AvatarMenu
                    v-if="username || src" class="mr-4"
                    v-bind="avatarProps"
                    @command="handleCommand"
            ></AvatarMenu>
        </el-row>
    </el-row>
</template>

<script setup lang="ts">
import Iconify from "@/components/Icon/Iconify.vue";
import DarkModeToggle from "@/components/Themes/DarkModeToggle.vue";
import FullScreen from "@/components/Themes/FullScreen.vue";
import ChangeLocale from "@/components/Themes/ChangeLocale.vue";
import type {LocaleItem} from "@/components/Themes/types";
import AvatarMenu from "@/components/Avatar/AvatarMenu.vue";
import type {AvatarMenuProps} from "@/components/Avatar/types";
import ThemeSettings from "@/components/Themes/ThemeSettings.vue";
import {ThemeSettingsProps} from "@/components/Themes/types";
import type {HeaderProps} from "@/components/Layouts/types";


const props = withDefaults(defineProps<HeaderProps>(), {
    collapse: false
})

const collapseModel = defineModel('collapse', {
    default: false
})

const localProps = reactive({...props})

const avatarProps = computed(() => {
    const {collapse, locales, ...restProps} = props
    return restProps
})

const emits = defineEmits<{
    menuChange: [arg: string | number | object],
    settingsChange: [settings: ThemeSettingsProps]
}>()

const handleCommand = (command: string | number | object) => emits('menuChange', command)

watch(
    () => localProps.settings,
    () => {
        emits('settingsChange', localProps.settings)
    },
    {
        deep: true
    }
)

// 获取菜单设置
const handleChange = (settings: ThemeSettingsProps) => {
    console.log("🚀 主题设置 头部", settings)
    localProps.settings = settings
    // emits('settingsChange', localProps.settings)
}

const handleDarkModeToggle = (dark: boolean) => {
    localProps.settings.darkMode = dark
    // emits('settingsChange', localProps.settings)
}
</script>

<style scoped>

</style>
