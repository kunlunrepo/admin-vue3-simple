<template>
    <div class="w-full h-screen overflow-hidden flex">
        <!--左右布局-->
        <!--sidebar-->
        <div :style="{
            width: mixMenuWidth,
            backgroundColor: settings?.backgroundColor,
            }" class="h-full transition-width"
             v-if="settings?.mode !== 'top'"
        >
            <el-row class="h-full">
                <!--menu 左侧 左侧菜单混合-->
                <el-scrollbar
                    v-if="settings?.mode !== 'mix'"
                    :class="[settings?.mode !== 'mixbar' ? 'flex-1' : 'w-[64px] py-4']"
                    :style="{
                    backgroundColor: settings?.mode !== 'mixbar' ? 'auto' : darken(settings?.backgroundColor, 0.2)
                }"
                >
                    <Menu
                            :class="[{mixbar: settings?.mode === 'mixbar'}]"
                            v-if="settings?.mode === 'siderbar' || settings?.mode === 'mixbar'"
                            :data="mixMenus"
                            :collapse="settings?.mode !== 'mixbar' && localSettings.collapse"
                            text-color="#b8b8b8"
                            :background-color="settings?.mode !== 'mixbar' ? settings?.backgroundColor : 'transparent'"
                    ></Menu>
                </el-scrollbar>
                <!--menu二级菜单 左侧菜单混合 顶部左侧菜单混合-->
                <el-scrollbar v-if="settings?.mode === 'mixbar' || settings?.mode === 'mix'">
                    <Menu
                            :data="getSubMenus(menus)"
                            :collapse="localSettings.collapse"
                            text-color="#b8b8b8"
                            :background-color="settings?.backgroundColor"
                    ></Menu>
                </el-scrollbar>
            </el-row>
        </div>
        <!--content-->
        <div class="flex-1 h-full">
            <!--header: fullscreen, darkmode, theme, menu-->
            <Header
                    :locales="locales"
                    :username="username"
                    :src="avatar"
                    :data="avatarMenu"
                    :settings="settings"
                    @settings-change="handleSettingsChange"
                    v-model:collapse="localSettings.collapse"
            >
                <!--menu 顶部左侧菜单混合 顶部模式-->
                <Menu
                        v-if="settings?.mode === 'mix' || settings?.mode === 'top'"
                        :data="settings?.mode === 'mix' ? getTopMenus(menus) : menus"
                        :collapse="false"
                        mode="horizontal"
                ></Menu>
            </Header>
            <IconPicker/>
            <!--            <router-view></router-view>-->
        </div>
    </div>
</template>

<script setup lang="ts">
import {routes} from 'vue-router/auto-routes'
import type {RouteRecordRaw} from "vue-router";
import type {AppRouteMenuItem} from "@/components/Menu/types";
import Header from "@/components/Layouts/Header.vue";
import type {LocaleItem, ThemeSettingsProps} from "@/components/Themes/types";
import type {DropDownMenuItem} from "@/components/Avatar/types";
import type {HeaderProps} from "@/components/Layouts/types";
import {useMenu} from "@/components/Menu/useMenu";
import {darken} from "@/utils";


interface ThemeSettingsOption extends HeaderProps {
    menuWidth: string | number;
    locales?: LocaleItem[]
    username: string,
    avatar: string,
    avatarMenu: DropDownMenuItem[]
}

const localSettings = reactive<ThemeSettingsOption>({
    collapse: false, // 折叠菜单
    locales: [
        {
            text: '中文',
            name: 'zh-CN',
            icon: 'uil:letter-chinese-a'
        },
        {
            text: 'English',
            name: 'en',
            icon: 'ri:english-input'
        },
    ],
    username: '管理员',
    settings: {
        menuWidth: 280
    } as ThemeSettingsProps
})

const {locales, username, avatar, avatarMenu} = toRefs(localSettings)

function generateMenuData(routes: RouteRecordRaw[]): AppRouteMenuItem[] {
    const menuData: AppRouteMenuItem[] = [];
    routes.forEach((item: any) => {
        let menuItem: AppRouteMenuItem = {
            path: item.path,
            name: item.name,
            meta: item.meta,
            alias: typeof item.redirect === 'string' ? item.redirect : undefined,
        }
        if (item.children && Array.isArray(item.children) && item.children.length > 0) {
            menuItem.children = generateMenuData(item.children);
        }
        menuData.push(menuItem);
    });
    return menuData;
}

onMounted(() => {
    // generateMenuData(routes)
    console.log("默认布局菜单数据 顶级", getTopMenus(menus.value))
    console.log("默认布局菜单数据 子级", getSubMenus(menus.value))
})

const { getTopMenus, getSubMenus } = useMenu()

// 菜单数据
const menus = computed(() => {
    console.log("布局菜单数据", routes)
    return generateMenuData(routes)
})

// 菜单宽度
const menuWidth = computed(() => localSettings.settings ? localSettings.settings.menuWidth : 240)

const settings = computed(() => localSettings.settings)

// 混合菜单
const mixMenus = computed(() => settings.value?.mode === 'mixbar'? getTopMenus(menus.value) : menus.value)

// 判断二组菜单的顶级是否所有菜单项都设置了icon
const isFullIcons = computed(() => getSubMenus(menus.value)
    .every(item=> typeof item.meta?.icon !== 'undefined' && item.meta?.icon))

// 混合左侧双菜单模式下的菜单宽度
const mixMenuWidth = computed(() => {
    if (settings.value?.mode === 'mixbar' && isFullIcons.value) {
        return localSettings.collapse ? 'auto' : menuWidth.value + 'px'
    } else {
        return localSettings.collapse ? '64px' : menuWidth.value + 'px'
    }
})

const handleSettingsChange = (themeSettings: ThemeSettingsProps) => {
    console.log("布局菜单数据", themeSettings)
    localSettings.settings = themeSettings
}

</script>

<style scoped lang="scss">
.mixbar {
  :deep(.el-menu-item) {
    height: auto;
    line-height: unset !important;
    flex-direction: column;
    margin-bottom: 15px;
    padding: 4px 0 !important;

    svg {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}
</style>
