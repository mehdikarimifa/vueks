<script setup lang="ts">
import { usePreferences } from '@/store'
import { computed, onMounted, ref } from 'vue'
import { KsSidebarHeader } from './components/KsSidebarHeader'
import KsSidebarRouteList from './components/KsSidebarRouteList.vue'

const preferencesStore = usePreferences()

const windowWidth = ref(window.innerWidth)

const isMobileWindowWidth = computed(() => windowWidth.value <= 576)

const sidebarWidth = computed(() =>
  preferencesStore.isSidebarExpanded
    ? '240px'
    : isMobileWindowWidth.value
    ? '0'
    : '58px'
)

const expandSidebar = () => {
  if (!preferencesStore.isSidebarPinned) preferencesStore.toggleSidebar(true)
}

const collapseSidebar = () => {
  if (!preferencesStore.isSidebarPinned) preferencesStore.toggleSidebar(false)
}

onMounted(() => {
  window.onresize = () => {
    windowWidth.value = window.innerWidth
  }
})
</script>

<template>
  <div>
    <div
      :style="{ width: sidebarWidth }"
      :class="[
        'ks-sidebar unselectable-text',
        { 'sidebar-fixed': isMobileWindowWidth }
      ]"
      @mouseenter="expandSidebar"
      @mouseleave="collapseSidebar">
      <KsSidebarHeader />
      <KsSidebarRouteList />
    </div>

    <Transition name="pure-fade">
      <div
        v-if="isMobileWindowWidth && preferencesStore.isSidebarExpanded"
        class="sidebar-backdrop"
        @click="preferencesStore.toggleSidebar" />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.ks-sidebar {
  height: 100vh;
  position: sticky;
  overflow: hidden;
  top: 0;
  background: rgba(var(--background-color), 1);
  box-shadow: 0 0.5rem 8px 5px rgba(0, 0, 0, 0.03);
  z-index: 999;

  &.sidebar-fixed {
    position: fixed;
    right: 0;
  }
}

.sidebar-backdrop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.08);
  z-index: 998;
}
</style>
