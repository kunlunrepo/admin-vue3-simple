import {AvatarMenuProps} from "@/components/Avatar/types";
import {LocaleItem, ThemeSettingsProps} from "@/components/Themes/types";

export interface HeaderProps extends Partial<AvatarMenuProps> {
    collapse: boolean
    // availableLocales: string[]
    locales: LocaleItem[]
    settings?: ThemeSettingsProps
}
