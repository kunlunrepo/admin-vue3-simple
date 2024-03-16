<template>
  <component :is="Icon" v-bind="props" />
</template>

<script lang="ts" setup>
import {Icon, type IconProps} from "@iconify/vue";

const props = defineProps<IconProps>();


</script>

<style scoped>

</style>
