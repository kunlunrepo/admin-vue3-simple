import type {IconifyIcon} from "@iconify/vue";

export interface LocaleItem {
    // 显示名称
    text: string
    icon?: IconifyIcon | string
    name: string // locales文件夹中的文件名 zh-CN -> 中文
}
