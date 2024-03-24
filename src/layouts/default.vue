<template>
    <div class="w-full h-screen overflow-hidden flex">
        <!--左右布局-->
        <!--sidebar-->
        <div :style="{
            width: typeof menuWidth === 'sting' ? menuWidth : menuWidth + 'px',
            backgroundColor: settings?.backgroundColor,
            }" class="h-full">
            <el-scrollbar>
                <!--menu-->
                <Menu :data="menus"></Menu>
                <!--menu二级菜单-->
            </el-scrollbar>
        </div>
        <!--content-->
        <div class="flex-1 h-full">
            <!--header: fullscreen, darkmode, theme, menu-->
            <Header :locales="locales"
                    :username="username"
                    :src="avatar"
                    :data="avatarMenu"
                    :settings="settings"
                    @settings-change="handleSettingsChange"></Header>
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



interface ThemeSettingsOption extends HeaderProps{
    menuWidth: string | number;
    locales?: LocaleItem[]
    username: string,
    avatar: string,
    avatarMenu: DropDownMenuItem[]
}

const localSettings = reactive<ThemeSettingsOption>({
    locales: () => [
        {
            text: 'English',
            name: 'en',
            icon: 'ri:english-input'
        },
        {
            text: '中文',
            name: 'zh-CN',
            icon: 'uil:letter-chinese-a'
        }
    ],
    username: '管理员',
    settings: {
        menuWidth: 280
    } as ThemeSettingsProps
})

const { locales, username, avatar, avatarMenu} = toRefs(localSettings)

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
    const data: AppRouteMenuItem[] = [
        {
            name: "Home",
            path: "/home",
            meta: {
                title: "首页",
                layout: "default",
                order: 1,
                icon: "ep:apple",
                hideMenu: false,
                disabled: false
            },
            children: [
                {
                    name: "About",
                    path: "/home/about",
                    meta: {
                        title: "关于我们",
                        layout: "default",
                        order: 2,
                        hideMenu: false,
                        disabled: false
                    },
                    children: [
                        {
                            name: "Contact",
                            path: "/home/about/contact",
                            meta: {
                                title: "联系我们",
                                layout: "default",
                                order: 3,
                                hideMenu: false,
                                disabled: false
                            },
                        },
                    ]
                },
            ]
        },
        {
            name: "Dashboard",
            path: "/dashboard",
            meta: {
                title: "大屏",
                layout: "default",
                order: 4,
                icon: "ep:bell",
                hideMenu: false,
                disabled: false
            },
        }
    ]
    console.log("布局菜单数据", routes)
    generateMenuData(routes)
})

const menus = computed(() => {
    console.log("布局菜单数据", routes)
    return generateMenuData(routes)
})

const menuWidth = computed(() => localSettings.settings ? localSettings.settings.menuWidth : 240)

const settings = computed(() => localSettings.settings)

const handleSettingsChange = (themeSettings: ThemeSettingsProps) => {
    console.log("布局菜单数据", themeSettings)
    localSettings.settings = themeSettings
}

</script>

<style scoped></style>
