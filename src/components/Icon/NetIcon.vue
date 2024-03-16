<template>
    <i :class="className" ></i>
</template>

<script setup lang="ts">
// fontFamily prefix+type
/*const props = defineProps({
    url: {
        type: String,
        default: '',
    },
    prefix: {
        type: String,
        default: 'iconfont-',
    },
    fontFamily: {
        type: String,
        default: 'iconfont',
    },
    type: {
        type: String,
        default: '',
    },
})*/
import type {NetIconProps} from "@/components/Icon/types";

const props = withDefaults(defineProps<NetIconProps>(), {
    url: '',
    prefix: 'iconfont-',
    fontFamily: 'iconfont',
    type: ''
})

const className= computed(() => {
    return `${props.fontFamily} ${props.prefix}${props.type}`
})

// 下载网络图标
onBeforeMount(() => {
    if (props.url) {
        const existingLink = document.querySelector(`link[href="${props.url}"]`) // head中是否存在标签
        if (!existingLink) {
            const link = document.createElement('link')
            link.href = props.url
            link.rel = 'stylesheet'
            document.head.appendChild(link)
        }
    }
})

</script>
