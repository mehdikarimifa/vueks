<script lang="ts" setup>
import { computed, type ComputedRef, ref, type Ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  ltr: {
    type: Boolean,
    default: false
  },
  rows: {
    type: String,
    default: '4'
  }
})

const emit = defineEmits(['change', 'update:modelValue'])

const textarea: Ref<HTMLTextAreaElement | null> = ref(null)

const stringCounter: ComputedRef<string> = computed(() => {
  return props.modelValue?.toString().length.toString() ?? '0'
})

function onInputChange(event: Event) {
  emit('change')
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="ltr ? 'ltr' : 'rtl'" :dir="ltr ? 'ltr' : 'rtl'" class="ks-input">
    <textarea
      ref="textarea"
      :readonly="loading"
      :rows="rows"
      :value="modelValue"
      class="color-primary"
      v-bind="$attrs"
      @input="onInputChange" />
    <span class="counter">{{ stringCounter }}</span>
    <div v-if="loading" class="custom-loader left" />
  </div>
</template>
