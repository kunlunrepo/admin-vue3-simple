// 网络icon
export interface NetIconProps {
    url: string
    prefix: string
    fontFamily: string
    type: string
}
// icon采集器提交数据类型
export interface IconPickerSubmitDataProps {
    icon: string
    color: string
    fontSize: number
}
// icon列表类型
export interface IconListProps {
    iconData: string[] // 数组比较特殊
    collection: string
    itemClass: string
    iconClass: string
    activeClass: string
    showText: boolean
}
