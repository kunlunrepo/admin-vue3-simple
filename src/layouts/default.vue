<template>
    <div class="w-full h-screen overflow-hidden flex">
        <!--左右布局-->
        <!--sidebar-->
        <div :style="{width: typeof menuWidth === 'sting' ? menuWidth : menuWidth + 'px'}" class="h-full bg-sky">
            <el-scrollbar>
                <!--menu-->
                <Menu :data="menus"></Menu>
                <!--menu二级菜单-->
            </el-scrollbar>
        </div>
        <!--content-->
        <div class="flex-1 h-full">
            <!--header: fullscreen, darkmode, theme, menu-->
            <Header :locales="locales"></Header>
            <!--            <router-view></router-view>-->
        </div>
    </div>
</template>

<script setup lang="ts">
import {routes} from 'vue-router/auto-routes'
import type {RouteRecordRaw} from "vue-router";
import type {AppRouteMenuItem} from "@/components/Menu/types";
import Header from "@/components/Layouts/Header.vue";
import type {LocaleItem} from "@/components/Themes/types";



interface ThemeSettings {
    menuWidth: string | number;
    locales?: LocaleItem[]
}

const props = withDefaults(defineProps<ThemeSettings>(), {
    menuWidth: 240,
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
    ]
})

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

</script>

<style scoped></style>
