<script lang="ts" setup>
import { computed, type PropType, ref, useAttrs } from 'vue'

import { KsIcon } from '@ksCoreUi'
import { Colors } from '@/assets/colors'

defineProps({
  inputId: {
    type: String,
    default: null
  },
  modelValue: {
    type: [String, Number],
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  appendText: {
    type: String,
    default: null
  },
  ltr: {
    type: Boolean,
    default: false
  },
  textAlign: {
    type: String as PropType<'end' | 'start'>,
    default: 'end'
  },
  icon: {
    type: String as PropType<'right' | 'left'>,
    default: null
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  customHeight: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['change', 'update:modelValue', 'blur'])
const attrs = useAttrs()

const showPassword = ref(false)

const inputType = computed(() => {
  if (showPassword.value) return 'text'
  return attrs.type ?? 'text'
})

const isTypePassword = computed(() => attrs.type === 'password')

const onInputChange = (event: Event) => {
  emit('change')
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div
    :class="[ltr ? 'ltr' : 'rtl', icon !== null && 'icon-' + icon]"
    :dir="ltr ? 'ltr' : 'rtl'"
    class="ks-input">
    <div
      :class="[
        appendText && 'input-group',
        ltr ? 'ltr-input' : 'rtl-input',
        { 'opacity-75': isDisabled }
      ]"
      class="d-flex align-items-end">
      <div class="d-flex flex-column gap-2 flex-1">
        <input
          ref="input"
          :dir="textAlign === 'start' ? 'ltr' : 'rtl'"
          :disabled="loading || isDisabled"
          :readonly="loading || readonly || isDisabled"
          :style="customHeight && { height: customHeight + 'px' }"
          :type="inputType"
          :value="modelValue"
          class="color-primary form-control"
          v-bind="{
            ...$attrs,
            type: inputType
          }"
          @change="emit('blur')"
          @input="onInputChange" />
      </div>

      <div
        v-if="loading"
        :class="ltr ? 'right' : 'left'"
        class="custom-loader" />

      <button v-if="icon" class="ks-input-icon">
        <slot name="icon" />
      </button>

      <div
        v-if="isTypePassword"
        class="show-pass-btn"
        @click="showPassword = !showPassword">
        <KsIcon
          v-if="showPassword"
          is-custom-component
          name="EyeOpen"
          size="18"
          :color="Colors.primaryLight" />
        <KsIcon
          v-else
          is-custom-component
          name="EyeClose"
          size="18"
          :color="Colors.primaryLight" />
      </div>

      <div v-if="appendText" :dir="ltr && 'ltr'" class="input-group-append">
        <span class="input-group-text fw-bold">
          {{ appendText }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ks-input {
  .show-pass-btn {
    position: absolute;
    cursor: pointer;
    top: 50%;
    padding-bottom: 6px;
    transform: translateY(-50%);
  }

  &.ltr {
    .show-pass-btn {
      right: 18px;
    }
  }

  &.rtl {
    .show-pass-btn {
      left: 18px;
    }
  }
}
</style>
