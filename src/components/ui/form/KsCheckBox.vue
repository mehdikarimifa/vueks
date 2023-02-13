<script lang="ts" setup>
import type { PropType } from 'vue'
import type { _Color } from '@/types'

import { KsIcon } from '@ksCoreUi'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  color: {
    type: String as PropType<_Color>,
    default: 'secondary'
  },
  modelValue: {
    type: [Boolean, Number, String],
    default: null
  },
  activeValue: {
    type: [String, Number, Boolean],
    default: true
  },
  inactiveValue: {
    type: [String, Number, Boolean],
    default: false
  },
  ltr: {
    type: Boolean,
    default: false
  },
  customHandleChange: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

function onClick() {
  if (!props.customHandleChange)
    emit(
      'update:modelValue',
      props.modelValue === props.activeValue
        ? props.inactiveValue
        : props.activeValue
    )
  emit(
    'change',
    props.modelValue === props.activeValue
      ? props.inactiveValue
      : props.activeValue
  )
}
</script>

<template>
  <div
    :dir="ltr ? 'ltr' : 'rtl'"
    class="ks-checkbox d-flex align-items-center gap-3 unselectable-text"
    @click="onClick">
    <div
      :class="[color, { active: modelValue === activeValue }]"
      class="checkbox d-flex align-items-center justify-content-center">
      <transition name="scale-up">
        <KsIcon
          v-if="modelValue === activeValue"
          name="check"
          color="#ffffff"
          size="14" />
      </transition>
    </div>
    <span class="text-small">{{ title }}</span>
  </div>
</template>

<style lang="scss" scoped>
.ks-checkbox {
  &:hover {
    cursor: pointer;

    .checkbox {
      background: rgba(var(--input-background-hover), 1);
    }
  }

  .checkbox {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(var(--checkbox-border), 1);
    background: rgba(var(--input-background), 1);
    border-radius: 8px;

    &.active {
      position: relative;
      border: none;

      &.secondary {
        background: rgba(var(--secondary), 1);
        box-shadow: 0 3px 12px 0 rgba(var(--secondary), 0.3);
      }

      &.primary {
        background: rgba(var(--primary), 1);
        box-shadow: 0 3px 12px 0 rgba(var(--primary), 0.3);
      }

      &.warn {
        background: rgba(var(--warn), 1);
        box-shadow: 0 3px 12px 0 rgba(var(--warn), 0.3);
      }

      &.danger {
        background: rgba(var(--danger), 1);
        box-shadow: 0 3px 12px 0 rgba(var(--danger), 0.3);
      }

      &.dark {
        background: rgba(var(--black), 1);
        box-shadow: 0 3px 12px 0 rgba(var(--black), 0.3);
      }

      &.success {
        background: rgba(var(--success), 1);
        box-shadow: 0 3px 12px 0 rgba(var(--success), 0.3);
      }
    }
  }

  .text-small {
    padding-top: 2px;
  }
}
</style>
