import type {AppRouteMenuItem} from "@/components/Menu/types";

export function useMenu() {
    function generateMenuKeys(menus: AppRouteMenuItem[], level = '0') {
        const filterMenus = menus.filter(item => item.meta?.hideMenu !== true)
        let i = 0
        filterMenus.forEach(item => {
            const key = level.indexOf('-') !== -1 ? `${level}-${i}` : `${i}`
            item.meta = {
                ...item.meta,
                key,
            }
            if (item.children && item.children.length > 0) {
                return (item.children = generateMenuKeys(item.children, `${key}-`))
            }
           i++
        })
        return filterMenus
    }

    function getIndex(item: AppRouteMenuItem): string {
        return `${item.meta?.key}`
    }

    function menuHasChildren(item: AppRouteMenuItem): boolean {
        return !item.meta?.hideMenu && Array.isArray(item.children) && item.children.length > 0
    }

    return {
        generateMenuKeys,
        getIndex,
        menuHasChildren
    }
}
