<script lang="ts" setup>
import type { PropType } from 'vue'
import type { _Color } from '@/types'

defineProps({
  modelValue: {
    type: [String, Number, Boolean],
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
  color: {
    type: String as PropType<_Color>,
    default: 'secondary'
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div
    :class="[color, { active: modelValue === activeValue }]"
    class="ks-switch"
    @click="
      emit(
        'update:modelValue',
        modelValue === activeValue ? inactiveValue : activeValue
      )
    ">
    <div class="switch-slide unselectable-text IRANYekan">
      <div v-if="modelValue === activeValue" class="on-value">
        <slot name="activeLabel" />
      </div>
      <div v-else class="off-value">
        <slot name="inactiveLabel" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ks-switch {
  &.active {
    .switch-slide {
      &:after {
        left: 28px;
      }
    }

    &.primary {
      .switch-slide {
        background-color: rgba(var(--primary), 1);
        box-shadow: 0 0 20px 0 rgba(var(--primary), 0.2);
      }
    }

    &.warn {
      .switch-slide {
        background-color: rgba(var(--warn), 1);
        box-shadow: 0 0 20px 0 rgba(var(--warn), 0.2);
      }
    }

    &.danger {
      .switch-slide {
        background-color: rgba(var(--danger), 1);
        box-shadow: 0 0 20px 0 rgba(var(--danger), 0.2);
      }
    }

    &.success {
      .switch-slide {
        background-color: rgba(var(--success), 1);
        box-shadow: 0 0 20px 0 rgba(var(--success), 0.2);
      }
    }

    &.dark {
      .switch-slide {
        background-color: rgba(var(--black), 1);
        box-shadow: 0 0 20px 0 rgba(var(--black), 0.2);
      }
    }

    &.secondary {
      .switch-slide {
        background-color: rgba(var(--secondary), 1);
        box-shadow: 0 0 20px 0 rgba(var(--secondary), 0.2);
      }
    }
  }

  &:hover {
    .switch-slide {
      background-color: rgba(var(--input-background-focus, 1));
    }
  }

  .switch-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    height: 34px;
    background-color: rgba(var(--switch-background, 1));
    border-radius: 32px;
    position: relative;
    cursor: pointer;
    transition: 0.3s;
    padding-right: 16px;
    padding-left: 16px;

    &::after {
      content: '';
      width: 22px;
      height: 22px;
      background-color: rgba(var(--background-color));
      position: absolute;
      border-radius: 70px;
      top: 6px;
      left: calc(100% - 6px);
      transform: translateX(-100%);
      transition: 0.5s;
    }

    .on-value,
    .off-value {
      font-size: 13px;
    }

    .off-value {
      color: rgba(var(--switch-color-off), 1);
      margin-right: 16px;
    }

    .on-value {
      color: rgba(var(--white), 1);
      margin-left: 16px;
    }
  }
}
</style>
