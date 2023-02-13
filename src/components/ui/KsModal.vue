<script lang="ts" setup>
import { ref, type Ref } from 'vue'

import KsButton from '@/components/ui/KsButton.vue'
import { KsIcon } from '@ksCoreUi'

defineProps({
  modelValue: {
    type: Boolean
  },
  blur: {
    type: Boolean,
    default: false
  },
  preventClose: {
    type: Boolean,
    default: false
  },
  noPadding: {
    type: Boolean,
    default: false
  },
  fullScreen: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['onClose', 'update:modelValue'])

const KsModal: Ref<HTMLDivElement | null> = ref(null)

function shakeModal() {
  KsModal.value?.classList.add('shake')
  setTimeout(() => {
    KsModal.value?.classList.remove('shake')
  }, 500)
}

function closeModal() {
  emit('update:modelValue', false)
  emit('onClose')
}
</script>

<template>
  <div>
    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="modelValue"
          :class="{ 'blur-overlay': blur }"
          :style="{ zIndex: 999990 + order }"
          class="ks-modal-wrapper p-3"
          @click="preventClose ? shakeModal() : closeModal()">
          <div ref="KsModal" class="ks-modal" @click.stop>
            <KsButton
              v-if="!preventClose"
              class="closeBtn background-color"
              color="transparent"
              fixed-width-height="34"
              @click="closeModal">
              <template #content>
                <KsIcon name="times" color="#000000" size="16" />
              </template>
            </KsButton>
            <div
              :class="[
                noPadding ? 'p-0 overflow-hidden' : 'p-3',
                { 'full-screen': fullScreen }
              ]"
              class="ks-modal-content background-color">
              <slot />
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
.ks-modal-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgba(var(--black), 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 450px) {
    .ks-modal {
      min-width: 300px !important;
    }
  }

  .ks-modal {
    position: relative;
    min-width: 420px;
    max-width: 95vw;
    max-height: 95vh;

    .ks-modal-content {
      max-width: 95vw;
      max-height: 95vh;
      border-radius: 20px;
      box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.1);

      &.full-screen {
        width: 95vw;
        height: 95vh;
      }
    }

    &.shake {
      animation: shake 0.3s;
    }

    .closeBtn {
      position: absolute;
      right: -8px;
      top: -8px;
      border-radius: 6px;
      box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.09);

      svg {
        fill: rgb(var(--black));
      }
    }
  }
}

[data-theme='darkMode'] {
  .closeBtn {
    svg {
      fill: rgb(var(--white)) !important;
    }
  }
}

.modal-enter-active {
  transition: all 200ms ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .ks-modal {
    transform: scale(0.5);
  }
}

.modal-enter-to {
  opacity: 1;

  .ks-modal {
    transform: scale(1);
  }
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
