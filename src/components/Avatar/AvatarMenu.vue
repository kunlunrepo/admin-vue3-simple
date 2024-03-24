<template>
    <el-dropdown v-bind="props" @command="handleCommand" :size="menuSize">
        <div class="flex items-center">
            <!--用户头像-->
            <el-avatar :icon="icon" :size="size" :src="src" :alt="alt" :fit="fit" :src-set="srcSet"
                       :shape="shape">
                {{username? username[0].toUpperCase() : ''}}
            </el-avatar>
            <span class="ml-2" v-if="username">{{username}}</span>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <template  v-for="(menu, index) in data"
                           :key="index">
                    <el-dropdown-item
                        v-if="(typeof menu === 'object' && menu?.key ? menu.key : menu) !== 'divider'"
                        :command="typeof menu === 'object' && menu?.key ? menu.key : menu">
                        {{ typeof menu === 'object' && menu?.value ? menu.value : menu }}
                    </el-dropdown-item>
                    <el-divider class="my-0!" v-else></el-divider>
                </template>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
// 方法1
import type {AvatarMenuProps, DropMenuProps} from "@/components/Avatar/types";
import type {AvatarProps} from "element-plus";

// 交叉类型
// type AvatarMenuProps1 = DropMenuProps & AvatarProps;
// type DropDownMenuItem = string | number | { key: string | number | object, value: string }
//
// interface AvatarMenuProps extends DropMenuProps, Omit<AvatarProps, 'size'> {
//     userName: string
//     avatarSize: number | 'large' | 'default' | 'small'
//     data: DropDownMenuItem[]
// }

const props = withDefaults(defineProps<Partial<AvatarMenuProps>>(), {
    trigger: 'click',
    username: '',
    size: 'small',
})

const emits = defineEmits<{
    command: [arg: string | number | object]
}>()

const handleCommand = (command: string | number | object) => emits('command', command)



// 方法2
// import type {ExtractPropTypes} from "vue";
// import {dropdownProps} from "element-plus";
//
// type DropdownProps = ExtractPropTypes<typeof dropdownProps>
// interface AvatarMenuProps extends /* @vue-ignore */ Partial<DropdownProps> {
// }
// // withDefaults不生效
// const props = withDefaults(defineProps<AvatarMenuProps>(), {
//     trigger:() => ['click']
// })

</script>

<style scoped>

</style>
