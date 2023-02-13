<script setup lang="ts">
import { usePreferences } from '@/store'

import KsSidebarHeaderLogo from './KsSidebarHeaderLogo.vue'
import { KsIcon, SidebarToggleButton } from '@ksCoreUi'
import { Colors } from '@/assets'

const preferencesStore = usePreferences()
</script>

<template>
  <div class="ks-sidebar-header py-2 px-3">
    <button
      v-if="preferencesStore.isSidebarExpanded"
      class="bg-transparent p-0 border-0 d-none d-sm-block"
      @click="preferencesStore.toggleSidebarPinned">
      <KsIcon
        :active="preferencesStore.isSidebarPinned"
        :color="Colors.primaryLight"
        name="PinCircle"
        class="sidebar-pin-icon"
        is-custom-component />
    </button>
    <KsSidebarHeaderLogo
      v-if="preferencesStore.isSidebarExpanded"
      :logo-src="`/img/logo/logo-text-${
        preferencesStore.isThemeDarkMode ? 'light' : 'dark'
      }.png`"
      :is-sidebar-expanded="!preferencesStore.isSidebarExpanded" />
    <KsSidebarHeaderLogo
      v-else
      :logo-src="`/img/logo/logo-${
        preferencesStore.isThemeDarkMode ? 'light' : 'dark'
      }.png`"
      :is-sidebar-expanded="!preferencesStore.isSidebarExpanded" />
    <SidebarToggleButton class="d-sm-none" />
  </div>
</template>

<style scoped lang="scss">
.ks-sidebar-header {
  height: 58px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  border-bottom: solid rgba(var(--text-color), 0.05) 2px;

  img {
    width: 100px;
    object-fit: contain;

    &.logo-mini {
      width: 72px !important;
    }
  }

  .sidebar-pin-icon {
    width: 14px;
  }
}
</style>
