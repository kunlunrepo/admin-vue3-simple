<template>
    <el-row class="items-center">
        <Iconify :icon="collapse ? 'ep:expand' : 'ep:fold'" class="text-2xl cursor-pointer"></Iconify>
        <div class="flex-grow"></div>
        <el-row class="items-center">
            <DarkModeToggle class="mr-2"></DarkModeToggle>
            <ChangeLocale :locales="locales" class="mr-2"></ChangeLocale>
            <FullScreen></FullScreen>
            <el-divider direction="vertical"></el-divider>
            <!--用户头像下拉菜单-->
            <AvatarMenu
                    v-if="username || src" class="mr-4"
                    v-bind="avatarProps"
                    @command="handleCommand"
            ></AvatarMenu>
        </el-row>
    </el-row>
</template>

<script setup lang="ts">
import Iconify from "@/components/Icon/Iconify.vue";
import DarkModeToggle from "@/components/Themes/DarkModeToggle.vue";
import FullScreen from "@/components/Themes/FullScreen.vue";
import ChangeLocale from "@/components/Themes/ChangeLocale.vue";
import type {LocaleItem} from "@/components/Themes/types";
import AvatarMenu from "@/components/Avatar/AvatarMenu.vue";
import type {AvatarMenuProps} from "@/components/Avatar/types";

interface HeaderProps extends Partial<AvatarMenuProps> {
    collapse: boolean
    // availableLocales: string[]
    locales: LocaleItem[]
}

const props = withDefaults(defineProps<HeaderProps>(), {
    collapse: false
})

const avatarProps = computed(() => {
    const {collapse, locales, ...restProps} = props
    return restProps
})

const emits = defineEmits<{
    command: [arg: string | number | object]
}>()

const handleCommand = (command: string | number | object) => emits('command', command)

</script>

<style scoped>

</style>
