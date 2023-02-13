<script setup lang="ts">
import { usePreferences } from '@/store'

const preferencesStore = usePreferences()
</script>

<template>
  <div class="d-flex align-items-center">
    <button
      :class="{ toClose: preferencesStore.isSidebarExpanded }"
      class="sidebar-toggle-btn d-flex flex-column align-items-end ms-3"
      @click="
        preferencesStore.toggleSidebar(!preferencesStore.isSidebarExpanded)
      ">
      <span class="toggle-bar1" />
      <span class="toggle-bar2" />
      <span class="toggle-bar3" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.sidebar-toggle-btn {
  background: none;
  border: none;
  width: 32px;

  .toggle-bar1 {
    width: 20px;
  }

  .toggle-bar2 {
    width: 12px;
  }

  .toggle-bar3 {
    width: 16px;
  }

  .toggle-bar1,
  .toggle-bar2,
  .toggle-bar3 {
    height: 1.6px;
    margin: 2.5px 0;
    background-color: rgba(var(--primary-light), 1);
    transition: 0.4s;
    border-radius: 20px;
  }

  &.toClose {
    .toggle-bar1,
    .toggle-bar3 {
      width: 10px;
    }

    .toggle-bar1 {
      -webkit-transform: rotate(-45deg) translate(-6px, 6px);
      transform: rotate(-45deg) translate(-6px, 6px);
    }

    .toggle-bar2 {
      opacity: 0;
    }

    .toggle-bar3 {
      -webkit-transform: rotate(45deg) translate(-8px, -8px);
      transform: rotate(45deg) translate(-8px, -8px);
    }
  }
}
</style>
