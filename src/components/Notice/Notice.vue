<template>
    <div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
              <Notification/>
          </span>
            <template #dropdown>
                <Lists/>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import Lists from '@/components/Notice/NoticeMessageList.vue'
import Notification from "@/components/Notice/Notification.vue";
</script>

<style scoped>

</style>
