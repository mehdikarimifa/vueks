<script setup lang="ts">
import { SidebarRoutes } from '@/constants'
import KsSidebarRoute from './KsSidebarRoute.vue'
</script>

<template>
  <div class="ks-sidebar-route-list">
    <KsSidebarRoute
      v-for="(sidebarRoute, index) in SidebarRoutes"
      :key="index"
      v-memo="[sidebarRoute]"
      :sidebar-route="sidebarRoute" />
  </div>
</template>

<style scoped lang="scss">
.ks-sidebar-route-list {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 58px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
