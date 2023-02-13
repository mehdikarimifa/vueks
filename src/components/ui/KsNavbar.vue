<script lang="ts" setup>
import { usePreferences } from '@/store'

import KsButton from '@/components/ui/KsButton.vue'
import { SidebarToggleButton } from './_common'
import { KsIcon } from '@ksCoreUi'
import { Colors } from '@/assets'

const preferencesStore = usePreferences()
</script>

<template>
  <div class="ks-navbar shadow-sm ps-2 pe-4 background-color">
    <SidebarToggleButton />
    <div class="d-flex ps-3 gap-3 align-items-center">
      <KsButton
        color="transparent"
        fixed-width-height="32"
        custom-padding="16px"
        @click="preferencesStore.toggleDarkMode">
        <template #content>
          <KsIcon
            v-if="preferencesStore.isThemeDarkMode"
            :color="Colors.primaryLight"
            is-custom-component
            name="Moon"
            size="19" />
          <KsIcon
            v-else
            :color="Colors.primaryLight"
            is-custom-component
            name="Sun"
            size="19" />
        </template>
      </KsButton>
      <KsButton
        color="transparent"
        fixed-size-height="32"
        custom-padding="16px">
        <template #content>
          <KsIcon
            name="bell"
            size="18"
            theme="light"
            :color="Colors.primaryLight" />
        </template>
      </KsButton>
      <KsButton
        color="transparent"
        cust
        fixed-size-height="32"
        custom-padding="16px">
        <template #content>
          <KsIcon
            is-custom-component
            name="MessageSquare"
            size="19"
            theme="light"
            :color="Colors.primaryLight" />
        </template>
      </KsButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ks-navbar {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  height: 58px;
  z-index: 999;
}
</style>
