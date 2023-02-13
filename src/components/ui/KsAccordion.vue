<script lang="ts" setup>
import type { _Icon } from '@/types'
import { ref, type PropType } from 'vue'
import { KsIcon } from '@ksCoreUi'

defineProps({
  btnStyles: {
    type: String,
    default: ''
  },
  icon: {
    type: String as PropType<_Icon>,
    default: null
  },
  iconSize: {
    type: String,
    default: '16'
  },
  iconColor: {
    type: String,
    default: null
  },
  iconDirection: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  iconRotationDeg: {
    type: String,
    default: null
  }
})
const emits = defineEmits(['click', 'contentVisiblityChange'])

const show = ref(false)

const onAccordionClick = () => {
  show.value = !show.value
  emits('click')
  emits('contentVisiblityChange', show.value)
}
</script>

<template>
  <div class="cursor-pointer d-flex flex-column">
    <div
      :class="btnStyles"
      class="d-flex flex-row-reverse gap-3 align-items-center"
      @click="onAccordionClick">
      <KsIcon
        v-if="icon"
        :name="icon"
        :size="iconSize"
        :color="iconColor"
        :class="[iconDirection === 'left' ? 'order-1' : 'order-0', 'mx-3']"
        :style="show && `transform: rotate(${iconRotationDeg}deg)`" />
      <div class="flex-fill">
        <slot name="header" />
      </div>
    </div>
    <div
      :style="show ? 'max-height: 9999999999999999999999px' : 'max-height: 0'">
      <transition name="fade">
        <div v-show="show">
          <slot name="content" />
        </div>
      </transition>
    </div>
  </div>
</template>
