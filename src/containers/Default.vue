<script setup lang="ts">
import { KsNavbar } from '@ksCoreUi'
</script>

<template>
  <div class="app-default-container">
    <KsNavbar />
    <div class="px-0 px-sm-3 py-3 app-router-view">
      <RouterView v-slot="{ Component, route }" dir="ltr">
        <transition mode="out-in" name="fade">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-default-container {
  flex: 1 1;
  min-width: 0;

  .app-router-view {
    height: calc(100vh - 58px);
    direction: rtl;
    overflow: auto;
  }
}
</style>
