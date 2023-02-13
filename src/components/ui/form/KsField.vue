<script lang="ts" setup>
import type { PropType } from 'vue'

import { KsIcon } from '@ksCoreUi'
import { Colors } from '@/assets/colors'

defineProps({
  label: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  orientation: {
    type: String as PropType<'h' | 'v'>,
    default: 'v'
  },
  direction: {
    type: String as PropType<'rtl' | 'ltr'>,
    default: 'rtl'
  },
  flexClass: {
    type: String,
    default: 'flex-1'
  }
})
</script>

<template>
  <div
    :class="[{ 'flex-column': orientation === 'v' }, flexClass]"
    :dir="direction"
    class="d-flex unselectable-text">
    <label
      v-if="label"
      :class="orientation === 'h' ? 'label-padding-horizontal ps-3' : 'pb-2'"
      class="text-small">
      {{ label }}
    </label>
    <div class="flex-1 d-flex flex-column gap-1">
      <slot />
      <div v-if="description" class="d-flex align-items-center gap-2">
        <KsIcon
          name="exclamation-circle"
          :color="Colors.primaryLight"
          size="12" />
        <small class="flex-1 text-xSmall color-primary-light">
          {{ description }}
        </small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.label-padding-horizontal {
  padding-top: 14px;
}
</style>
