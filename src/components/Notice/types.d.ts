import type { IconifyIcon, IconProps } from "@iconify/vue";
import type { BadgeProps, AvatarProps, TagProps } from "element-plus";
import type { CSSProperties } from "vue";

export interface NotificationProps extends Partial<BadgeProps> {
    icon: string | IconifyIcon
    iconSize?: number
    iconColor?: string
    size: number
    scale: number
    color: string
}

export interface MessageListItem {
    avatar?: Partial<AvatarProps>
    title: string
    content?: string
    time?: string
    // tagProps?: Partial<TagProps>
    tagProps?: { type: string } | undefined;
    tag?: string
}

export interface NoticeActionsItem extends IconProps {
    title: string
    click: () => void
}

export interface NoticeMessageListOptions {
    title: string
    contents?: MessageListItem[]
}

export interface NoticeMessageListProps {
    lists: NoticeMessageListOptions[]
    actions: NoticeActionsItem[]
    wrapClass?: string
    wrapStyle?: CSSProperties
}

export interface NoticeProps extends NoticeMessageListProps, Partial<NotificationProps> {}
