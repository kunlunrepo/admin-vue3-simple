<template>
    <Iconify icon="ri:brush-2-line" class="text-xl mr-2 cursor-pointer" @click="drawer = true"></Iconify>
    <el-drawer v-model="drawer" title="主题设置" @close="handleClose">
        <el-form :model="form" label-position="left">
            <!--主题颜色-->
            <el-form-item label="主题颜色">
                <el-color-picker v-model="form.theme"></el-color-picker>
            </el-form-item>
            <!--暗黑模式-->
            <el-form-item label="暗黑模式">
                <el-switch v-model="form.darkMode"></el-switch>
            </el-form-item>
            <!--导航模式-->
            <el-form-item label="导航模式" class="flex-col">
                <div class="flex justify-around flex-1">
                    <el-tooltip content="左侧菜单">
                        <div class="item" @click="form.mode = 'siderbar'">
                            <div class="bg-dark w-1/4 h-100 left-0 top-0 absolute z-30"></div>
                            <div class="bg-white w-full h-1/4 left-0 top-0 absolute z-10"></div>
                        </div>
                    </el-tooltip>
                    <el-tooltip content="顶部左侧菜单混合">
                        <div class="item" @click="form.mode = 'mix'">
                            <div class="bg-white w-1/4 h-full left-0 top-0 absolute z-10"></div>
                            <div class="bg-dark w-full h-1/4 left-0 top-0 absolute z-30"></div>
                        </div>
                    </el-tooltip>
                    <el-tooltip content="顶部菜单">
                        <div class="item" @click="form.mode = 'top'">
                            <div class="bg-dark w-full h-1/4 left-0 top-0 absolute z-10"></div>
                        </div>
                    </el-tooltip>
                    <el-tooltip content="左侧菜单混合">
                        <div class="item" @click="form.mode = 'mixbar'">
                            <div class="bg-dark w-1/5 h-full left-0 top-0 absolute z-30"></div>
                            <div class="bg-white w-1/3 h-full left-0 top-0 absolute z-10"></div>
                            <div class="bg-white w-full h-1/4 left-0 top-0 absolute z-20 border-b"></div>
                        </div>
                    </el-tooltip>
                </div>
            </el-form-item>
            <!--菜单背景-->
            <el-form-item label="菜单背景">
                <el-color-picker v-model="form.backgroundColor"></el-color-picker>
            </el-form-item>
            <!--菜单宽度-->
            <el-form-item label="菜单宽度">
                <el-slider class="ml-3" :max="600" :min="220" v-model="form.menuWidth" show-input input-size="mini"></el-slider>
            </el-form-item>
            <!--显示logo-->
            <el-form-item label="显示logo">
                <el-switch v-model="form.showLogo"></el-switch>
            </el-form-item>
            <!--切换动画-->
            <el-form-item label="切换动画">
            </el-form-item>
            <!--标签页-->
            <el-form-item label="标签页">
                <el-switch v-model="form.showTabs"></el-switch>
            </el-form-item>
            <!--头部固定-->
            <el-form-item label="头部固定">
                <el-switch v-model="form.fixedHead"></el-switch>
            </el-form-item>
            <!--面包屑-->
            <el-form-item label="显示面包屑导航">
                <el-switch v-model="form.showBreadcrumb"></el-switch>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup lang="ts">
import Iconify from "@/components/Icon/Iconify.vue";
import type {ThemeSettingsProps} from "@/components/Themes/types";
import {onMounted} from "vue";


const drawer = ref(false)

const props = withDefaults(defineProps<ThemeSettingsProps>(), {
    theme: '#409EFF',
    menuWidth: 240,
    darkMode: false,
    showLogo: false,
    showTabs: true,
    fixedHead: false,
    showBreadcrumb: true,
    mode: 'siderbar',
    backgroundColor: '#001529'
})

const form = reactive<ThemeSettingsProps>({
    ...props
})

const emits = defineEmits<{
    change: [settings: ThemeSettingsProps]
}>()

const handleClose = () => {
    console.log("🚀 主题设置 关闭", form)
    emits('change', form)
}

onMounted(() => {
    emits('change', form)
})

</script>

<style lang="scss" scoped>
:deep(.el-form-item__content) {
    justify-content: flex-end;
}

.item{
    @apply bg-gray-100 rounded w-15 h-12 relative overflow-hidden shadow border border-gray-100 cursor-pointer;
    &.active {
        @apply border-sky-800 border-2;
    }
}
</style>
