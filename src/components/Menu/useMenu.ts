import type {AppRouteMenuItem} from "@/components/Menu/types";

export function useMenu() {

    // 过滤排序菜单
    function filterAndOrderMenus(menus: AppRouteMenuItem[]) {
        return menus.filter(item => item.meta?.hideMenu !== true)
            // 排序
            .sort((a, b) => {
                const orderA = a.meta?.order ?? 100
                const orderB = b.meta?.order ?? 100
                return orderA - orderB
            }).map(item => ({...item}))
    }

    // 生成菜单key
    function generateMenuKeys(menus: AppRouteMenuItem[], level = '0') {
        const filterMenus = filterAndOrderMenus(menus)
        let i = 1
        filterMenus.forEach(item => {
            const key = level.indexOf('-') !== -1 ? `${level}-${i}` : `${i}`
            item.meta = {
                ...item.meta,
                key,
            }
            i++
            if (item.children && item.children.length > 0) {
                return (item.children = generateMenuKeys(item.children, `${key}-`))
            }
        })
        return filterMenus
    }

    // 获取顶级菜单
    function getTopMenus(menus: AppRouteMenuItem[]) {
        const filterMenus = filterAndOrderMenus(menus)
        return filterMenus.map(item => {
            delete item.children
            return item
        })
    }

    // 获取子菜单
    function getSubMenus(menus: AppRouteMenuItem[]) {
        const route = useRoute()
        const path = computed(() => {
            if (route.path === '/') {
                return '/'
            }
            const routePath = route.path.split('/')[1]
            return routePath? `/${routePath}` : '/'
        })
        const filterMenus = filterAndOrderMenus(menus)
        return filterMenus.find((item) => item.path === path.value)?.children || []
    }

    // 获取当前需要激活的子菜单信息
    function getParentMenu(menus: AppRouteMenuItem[]): AppRouteMenuItem | undefined {
        const route = useRoute()
        const path = computed(() => route.path)
        return getItemCondition(menus, (item) => {
            const arr = path.value.split('/')
            if (arr.length < 3) return false
            arr.pop() // 移除最后一个
            return arr.join('/') === item.name
        })
    }

    function getItemCondition(menus: AppRouteMenuItem[], fn: (item: AppRouteMenuItem) => boolean) {
        for (let i = 0; i < menus.length; i++) {
            if (fn(menus[i])) {
                return menus[i]
            } else {
                if (menus[i].children && Array.isArray(menus[i].children)) {
                    const item = getItemCondition(menus[i].children!, fn) as AppRouteMenuItem | undefined
                    if (item) {
                        return item
                    }
                }
            }
        }
    }

    // 获取菜单索引
    function getIndex(item: AppRouteMenuItem): string {
        return `${item.meta?.key}`
    }

    // 菜单是否有子级菜单
    function menuHasChildren(item: AppRouteMenuItem): boolean {
        return !item.meta?.hideMenu && Array.isArray(item.children) && item.children.length > 0
    }

    // 获取菜单项
    function getItem(menus: AppRouteMenuItem[], index: string) {
        // for (let i = 0; i < menus.length; i++) {
        //     if (menus[i].meta?.key === index) {
        //         return menus[i]
        //     } else {
        //         if (menus[i].children && Array.isArray(menus[i].children)) {
        //            const item = getItem(menus[i].children!, index) as AppRouteMenuItem | undefined
        //             if (item) {
        //                 return item
        //             }
        //         }
        //     }
        // }
        return getItemCondition(menus, (item) => item.meta?.key === index)
    }

    return {
        generateMenuKeys,
        getIndex,
        menuHasChildren,
        getTopMenus,
        getSubMenus,
        filterAndOrderMenus,
        getItem,
        getParentMenu,
    }
}
