<script lang="ts" setup>
import { defineAsyncComponent, type PropType } from 'vue'

const props = defineProps({
  isCustomComponent: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String as PropType<
      'regular' | 'light' | 'solid' | 'brands' | 'duotone' | 'thin'
    >,
    default: 'regular'
  },
  color: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: '18'
  },
  active: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  }
})

const getIconComponent = defineAsyncComponent(() => {
  if (!props.isCustomComponent) return null

  const component = `../../icons/${props.name}Icon.vue`
  return import(/* @vite-ignore */ component)
})
</script>

<template>
  <div class="ks-icon">
    <component
      :is="getIconComponent"
      v-if="isCustomComponent"
      :active="active"
      :fill="color"
      :width="size" />
    <i
      v-else
      :class="`fa-${theme} fa-${name}`"
      :style="{ color, fontSize: size + 'px' }" />
  </div>
</template>
