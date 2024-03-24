import type {ButtonProps, ButtonType, PartialOptions, Placement} from "element-plus";
import {AvatarProps} from "element-plus";

export interface DropMenuProps {
    trigger?: 'click' | 'hover' | 'contextmenu';
    effect?: string;
    type?: ButtonType;
    placement?: Placement;
    popperOptions?: Partial<PartialOptions>;
    id?: string;
    size?: string;
    splitButton?: boolean;
    hideOnClick?: boolean;
    loop?: boolean;
    showTimeout?: number;
    hideTimeout?: number;
    tabindex?: number | string;
    maxHeight?: number | string;
    popperClass?: string;
    disabled?: boolean;
    role?: string
    buttonProps?: ButtonProps;
    teleported?: boolean;
}

export type DropDownMenuItem = string | number | { key: string | number | object, value: string }

export interface AvatarMenuProps extends Omit<DropMenuProps, 'size'>, AvatarProps {
    username: string
    menuSize: string | 'large' | 'default' | 'small'
    data: DropDownMenuItem[]
}
