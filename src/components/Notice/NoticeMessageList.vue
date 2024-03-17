<template>
    <div>
        <el-tabs>
            <el-tab-pane label="User" name="first">User</el-tab-pane>
            <ul>
                <li>
                    <el-row justify="center" align="middle">
                        <el-col :span="4" align="middle">
                            <!--头像-->
                            <el-avatar :size="'small'" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                        </el-col>
                        <el-col :span="20" class="px-3">
                            <!--消息-->
                            <el-row align="middle" class="flex-nowrap! mb-2">
                                <!--消息标题-->
                                <div class="text-base line-clamp-1">
                                    消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试,
                                    消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试,
                                    消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试
                                </div>
                                <el-tag class="ml-2"  type="success" size="small" effect="dark">Tag 1</el-tag>
                            </el-row>
                            <el-row>
                                <!--消息内容-->
                                <div class="text-sm text-gray-400 mb-2 line-clamp-2">
                                    消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试,
                                    消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试,
                                    消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试
                                    消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试,
                                    消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试,
                                    消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试，消息内容测试
                                </div>
                            </el-row>
                            <el-row>
                                <!--消息时间-->
                                <div class="text-sm text-gray-400">2024-03-17 12:00:00</div>
                            </el-row>
                        </el-col>
                    </el-row>
                </li>
            </ul>
        </el-tabs>
        <div class="flex! w-full justify-around border-t">
            <div class="flex flex-1 py-3 border-r items-center justify-center hover:bg-sky-100 cursor-pointer text-gray-500">
                <Delete/>
                <span class="ml-2">清空</span>
            </div>
            <div class="flex flex-1 py-3 items-center justify-center hover:bg-sky-100 cursor-pointer text-gray-500">
                <More/>
                <span class="ml-2">更多</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="tsx">

import type {MessageListItem} from "@/components/Notice/types";

// interface NoticeActionsItem extends IconProps {
//     title: string
//     click: () => void
// }
//
// interface NoticeMessageListOptions {
//     title: string
//     contents?: MessageListItem[]
// }
//
// interface NoticeMessageListProps {
//     lists: NoticeMessageListOptions[]
//     actions: NoticeActionsItem[]
//     wrapClass?: string
//     wrapStyle?: CSSProperties
// }

// 清空
const Delete = () => <i className="i-ep:delete"></i>
// 更多
const More = () => <i className="i-ep:more"></i>

</script>

<style scoped>

</style>
