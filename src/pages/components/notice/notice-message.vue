<template>
    <div>
        <Notice :lists="lists" :actions="actions" wrap-class="w-[300px]" @click-item="handleClickItem"/>
        通知组件示例
        <Notification value="123456" :scale="scale" :size="28" :color="'blue'">
        </Notification>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        {{scale}}
        <el-button @click="scale=0.5">点击</el-button>
        <el-button @click="scale=1">点击</el-button>
        <el-button @click="scale=1.5">点击</el-button>
    </div>
</template>

<script setup lang="ts">
import Notification from "@/components/Notice/Notification.vue";
import Notice from "@/components/Notice/Notice.vue";
import type {NoticeActionsItem, NoticeMessageListOptions} from "@/components/Notice/types";

const scale = ref(0.5);

const actions = ref<NoticeActionsItem[]>([
    {
        title: '清空',
        icon: 'ep:delete',
        click: () => console.log('清空')
    },
    {
        title: '更多',
        icon: 'ep:more',
        click: () => console.log('更多')
    }
])

const lists = ref<NoticeMessageListOptions[]>([
    {
        title: '通知',
        contents: [
            {
                title: '消息1',
                avatar: { src: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' },
                content: '消息内容1',
                time: '2022-01-03 14:55:33',
                tagProps: { type: 'danger' },
                tag: '紧急'
            },
            {
                title: '消息1',
                avatar: { src: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' },
                content: '消息内容1',
                time: '2022-01-02 14:55:33'
            },
            {
                title: '消息1',
                avatar: { src: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' },
                content: '消息内容1',
                time: '2022-01-01 14:55:33'
            }
        ]
    },
    {
        title: '关注',
        contents: [
            {
                title: '消息3',
                avatar: { src: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' },
                content: '消息内容3',
                time: '2022-01-02 14:55:33',
                tagProps: { type: 'info' },
                tag: '通知'
            },
            {
                title: '消息3',
                avatar: { src: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' },
                content: '消息内容3',
                time: '2022-01-01 14:55:33'
            }
        ]
    },
    {
        title: '待办',
        contents: [
            {
                title: '消息2',
                avatar: { src: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' },
                content: '消息内容2',
                time: '2022-01-02 14:55:33',
                tagProps: { type: 'info' },
                tag: '通知'
            },
            {
                title: '消息2',
                avatar: { src: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' },
                content: '消息内容2',
                time: '2022-01-01 14:55:33'
            }
        ]
    }
])

const handleClickItem = (item: any) => {
    console.log("handleClickItem",item)
}

definePage({
    meta: {
        title: '消息通知',
        icon: 'mdi:message'
    }
})

</script>

<style scoped lang="scss">
</style>
