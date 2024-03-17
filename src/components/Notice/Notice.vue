<template>
    <div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
              <Notification v-bind="filterdProps"/>
          </span>
            <template #dropdown>
                <NoticeMessageList :lists="lists" :actions="actions" :wrap-class="wrapClass" :wrap-style="wrapStyle" v-on:="forwardedEvents"/>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import Notification from "@/components/Notice/Notification.vue";
import type {MessageListItem, NoticeProps} from "@/components/Notice/types";
import NoticeMessageList from './NoticeMessageList.vue'
import type {AvatarProps, TabsPaneContext} from "element-plus";

const props = defineProps<NoticeProps>()

// 事件传递
const emits = defineEmits< {
    clickAvatar: [avatar: AvatarProps],
    clickItem: [item: MessageListItem],
    clickTab: [tab: TabsPaneContext, event: Event],
}>()

const forwardedEvents = {
    clickAvatar: (avatar: AvatarProps) => emits('clickAvatar', avatar),
    clickItem: (item: MessageListItem) => emits('clickItem', item),
    clickTab: (tab: TabsPaneContext, event: Event) => emits('clickTab', tab, event)
}

const filterdProps = computed(() => {
    const {  actions, lists, ...restProps } = props
    return restProps
})
</script>

<style scoped>

</style>
