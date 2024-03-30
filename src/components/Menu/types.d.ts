import {IconifyIcon} from "@iconify/vue";
import {MenuProps as ElMenuProps} from "element-plus/es/components/menu/src/menu";
import {SubMenuProps} from "element-plus";
type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<T>) | (() => Promise<typeof import("*.vue")>)
import type {CSSProperties} from "vue";
export interface RouteMeta extends Record<string | number | symbol, unknown>{
    title?: string
    layout?: string
    order?: number // 菜单排序
    icon?: string | IconifyIcon
    hideMenu?: boolean // 针对404这种页面
    disabled?: boolean // 禁用
}

export interface AppRouteMenuItem {
    name?: string | Symbol
    meta?: RouteMeta
    children?: AppRouteMenuItem[]
    alias?: string
    path: string
    component?: Component
}

export interface MenuProps extends Partial<ElMenuProps> {
    data: AppRouteMenuItem[],
    subMenuProps?: Partial<SubMenuProps>
    collapse?: boolean,
    iconProps?: IconOptions
}

export interface IconOptions {
    style: CSSProperties
    class?: string
}

export type EmitSelectType = [
    index: string,
    indexPath: string[],
    item: MenuItemClicked,
    routerResult?: Promise<void | NavigationFailure>
]
export type OpenCloseType = [index: string, indexPath: string[]]
