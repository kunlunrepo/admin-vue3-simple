<template>
  <el-row class="items-center">
      <Iconify :icon="collapse ? 'ep:expand' : 'ep:fold'" class="text-2xl cursor-pointer"></Iconify>
      <div class="flex-grow"></div>
      <el-row class="items-center">
          <DarkModeToggle class="mr-2"></DarkModeToggle>
          <ChangeLocale :locales="locales" class="mr-2"></ChangeLocale>
          <FullScreen></FullScreen>
      </el-row>
  </el-row>
</template>

<script setup lang="ts">
import Iconify from "@/components/Icon/Iconify.vue";
import DarkModeToggle from "@/components/Themes/DarkModeToggle.vue";
import FullScreen from "@/components/Themes/FullScreen.vue";
import ChangeLocale from "@/components/Themes/ChangeLocale.vue";
import type {LocaleItem} from "@/components/Themes/types";

interface HeaderProps {
    collapse: boolean
    // availableLocales: string[]
    locales: LocaleItem[]
}

defineProps<HeaderProps>()
</script>

<style scoped>

</style>
