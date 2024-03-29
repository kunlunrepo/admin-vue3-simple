<template>
    <DropDown :items="locales"
              :icon-props="iconPropsComputed"
              :icon-class="iconClass"
              @change="handleCommand"
              :v-model="current">
        <template #header>
            <span class="mr-2">
                <Iconify icon="ion:language"  v-bind="iconPropsComputed" :class="iconClass"></Iconify>
            </span>
        </template>
        <template #item="{ item }">
            {{ item.text }}
        </template>
    </DropDown>
</template>

<script setup lang="ts">
import Iconify from "@/components/Icon/Iconify.vue";
import type {LocaleItem} from "@/components/Themes/types";
import type {IconProps} from "@iconify/vue";
import DropDown from "@/components/Menu/DropDown.vue";



interface ChangeLocaleProps extends Partial<IconProps> {
    locales: LocaleItem[]
    iconClass?: string
}

const props = withDefaults(defineProps<ChangeLocaleProps>(), {
    iconClass: 'text-xl'
})

// const dropDownItemIcon = (icon: IconifyIcon | string) => <Iconify icon={icon}></Iconify>

// const dropDownItemIcon = (icon: IconifyIcon | string) => h('Iconify', {
//     icon
// })

const emits = defineEmits<{
    change: [ command: string]
}>()

const handleCommand = (locale: LocaleItem) => {
    // current.value = index
    emits('change', locale.name)
}

const iconPropsComputed = computed(() => {
    const { locales, icon, ...restProps } = props
    console.log("🚀🚀🚀 国际化测试", restProps)
    return restProps
})

const current = ref(0)

</script>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item) {
    &.active {
        background-color: var(--el-dropdown-menuItem-hover-fill);
        color: var(--el-dropdown-menuItem-hover-color);
    }
}
</style>
