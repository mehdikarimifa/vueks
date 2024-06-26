<script lang="ts" setup>
import type { _Color } from '@/types'
import { type PropType, ref } from 'vue'

import KsButton from '@/components/ui/KsButton.vue'
import { KsIcon } from '@ksCoreUi'

defineProps({
  modelValue: {
    type: Boolean,
    default: null
  },
  theme: {
    type: String as PropType<'modern' | 'flat'>,
    default: 'modern'
  },
  color: {
    type: String as PropType<_Color>,
    default: 'secondary'
  },
  collapseTitle: {
    type: String,
    default: ''
  },
  closeable: {
    type: Boolean,
    default: true
  },
  ltr: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'update:modelValue'])

const showContent = ref(false)

const onClose = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      :class="[
        theme,
        color,
        ltr ? 'ltr' : 'rtl',
        { 'accordion-mode': collapseTitle }
      ]"
      :dir="ltr ? 'ltr' : 'rtl'"
      class="ks-alert IRANYekan">
      <div
        v-if="collapseTitle"
        class="accordion-btn d-flex align-items-center justify-content-between"
        @click="showContent = !showContent">
        <div class="fw-bold text-medium">
          {{ collapseTitle }}
        </div>
        <KsIcon name="plus" color="#ffffff" size="18" />
      </div>
      <KsButton
        v-if="closeable && !collapseTitle"
        :color="color"
        :theme="theme"
        class="closeBtn"
        fixed-width-height="34"
        @click="onClose">
        <template #content>
          <KsIcon name="times" color="#ffffff" size="16" />
        </template>
      </KsButton>
      <transition name="alert">
        <div
          v-if="!collapseTitle || showContent"
          class="alert-content d-flex flex-column">
          <slot v-if="!collapseTitle" name="title" />
          <div class="mt-3">
            <slot name="content" />
          </div>
          <div v-if="collapseTitle" style="height: 24px" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.ks-alert {
  padding: 12px 24px 12px 12px;
  position: relative;

  &.accordion-mode {
    padding: 0;

    .accordion-btn {
      padding: 18px 24px;
      cursor: pointer;
    }

    .alert-content {
      padding: 0 32px;
    }
  }

  .closeBtn {
    position: absolute;
    top: 8px;
  }

  &.ltr {
    text-align: left;

    .closeBtn {
      right: 8px;
    }
  }

  &.rtl {
    text-align: right;

    .closeBtn {
      left: 8px;
    }
  }

  &.flat {
    position: relative;
    overflow: hidden;

    &.ltr {
      border: {
        top-right-radius: 8px;
        bottom-right-radius: 8px;
      }
    }

    &.rtl {
      border: {
        top-left-radius: 8px;
        bottom-left-radius: 8px;
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      width: 3px;
      border-radius: 3px;
      height: 100%;
    }

    &.rtl {
      &.flat:before {
        right: 0;
      }
    }

    &.ltr {
      &.flat:before {
        left: 0;
      }
    }

    &.primary {
      color: rgba(var(--primary), 1);
      background: rgba(var(--primary), 0.1);

      &:before {
        background: rgba(var(--primary), 1);
      }

      svg {
        fill: rgba(var(--primary), 1);
        stroke: rgba(var(--primary), 1);
      }
    }

    &.warn {
      color: rgba(var(--warn), 1);
      background: rgba(var(--warn), 0.2);

      &:before {
        background: rgba(var(--warn), 1);
      }

      svg {
        fill: rgba(var(--warn), 1);
        stroke: rgba(var(--warn), 1);
      }
    }

    &.danger {
      color: rgba(var(--danger), 1);
      background: rgba(var(--danger), 0.1);

      &:before {
        background: rgba(var(--danger), 1);
      }

      svg {
        fill: rgba(var(--danger), 1);
        stroke: rgba(var(--danger), 1);
      }
    }

    &.success {
      color: rgba(var(--success), 1);
      background: rgba(var(--success), 0.1);

      &:before {
        background: rgba(var(--success), 1);
      }

      svg {
        fill: rgba(var(--success), 1);
        stroke: rgba(var(--success), 1);
      }
    }

    &.dark {
      color: rgba(var(--text-color), 1);
      background: rgba(var(--black), 0.02);

      &:before {
        background: rgba(var(--black), 1);
      }

      svg {
        fill: rgba(var(--text-color), 1);
        stroke: rgba(var(--text-color), 1);
      }
    }

    &.secondary {
      color: rgba(var(--secondary), 1);
      background: rgba(var(--secondary), 0.1);

      &:before {
        background: rgba(var(--secondary), 1);
      }

      svg {
        fill: rgba(var(--secondary), 1);
        stroke: rgba(var(--secondary), 1);
      }
    }
  }

  &.modern {
    border-radius: 8px;

    .closeBtn:hover {
      box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.2);
    }

    &.primary {
      background: rgba(var(--primary), 1);
    }

    &.warn {
      background: rgba(var(--warn), 1);
    }

    &.danger {
      background: rgba(var(--danger), 1);
    }

    &.success {
      background: rgba(var(--success), 1);
    }

    &.dark {
      background: rgba(var(--black), 1);
    }

    &.white {
      background: rgba(var(--white), 1);
      color: rgba(var(--primary), 1);
    }

    &.secondary {
      background: rgba(var(--secondary), 1);
    }

    &.primary,
    &.warn,
    &.danger,
    &.success,
    &.dark,
    &.secondary {
      color: rgba(var(--white), 1);
    }
  }
}

.alert-enter-active {
  transition: max-height 1s ease;
}

.alert-enter-from,
.alert-leave-to {
  max-height: 0;
}

.alert-enter-to,
.alert-leave-from {
  max-height: 500px;
}
</style>
