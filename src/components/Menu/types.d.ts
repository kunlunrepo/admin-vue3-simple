import {IconifyIcon} from "@iconify/vue";
import {MenuProps as ElMenuProps} from "element-plus/es/components/menu/src/menu";
import {SubMenuProps} from "element-plus";
type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<T>) | (() => Promise<typeof import("*.vue")>)

export interface RouteMeta extends Record<string | number | symbol, unknown>{
    title?: string
    layout?: string
    order?: number // 菜单排序
    icon?: string | IconifyIcon
    hideMenu?: boolean // 针对404这种页面
    disabled?: boolean // 禁用
}

export interface AppRouteMenuItem {
    name: string
    meta?: RouteMeta
    children?: AppRouteMenuItem[]
    alias?: string
    path: string
    component?: Component
}

export interface MenuProps extends Partial<ElMenuProps> {
    data: AppRouteMenuItem[],
    subMenuProps?: Partial<SubMenuProps>
    collapse?: boolean
}
