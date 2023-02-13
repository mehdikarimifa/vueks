<script lang="ts" setup>
import { computed, type PropType, ref } from 'vue'
import moment from 'moment-jalaali'
import DatePicker from 'vue3-persian-datetime-picker'

import KsInput from './KsInput.vue'
import { Colors } from '@/assets/colors'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null
  },
  placeholder: {
    type: String,
    required: true
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss'
  },
  displayFormat: {
    type: String,
    default: 'dddd jDD jMMMM jYYYY | HH:mm:ss'
  },
  displayType: {
    type: String as PropType<'date' | 'time' | 'datetime'>,
    default: 'datetime'
  },
  locale: {
    type: String as PropType<'en' | 'fa'>,
    default: 'fa'
  },
  elementTag: {
    type: String,
    required: true
  },
  hexColor: {
    type: String,
    default: Colors.danger
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed(() => {
  let date = ''
  if (props.modelValue)
    date = moment(props.modelValue, props.format).format(props.displayFormat)
  return date
})

const datePickerValue = computed(() => {
  return props.modelValue
})

const datePicker: any = ref(null)

const datePickerChange = () => {
  emit('update:modelValue', datePicker.value?.outputValue[0])
}
</script>

<template>
  <div>
    <KsInput
      :id="elementTag"
      v-model="inputValue"
      :loading="loading"
      :placeholder="placeholder"
      class="w-100"
      readonly />
    <DatePicker
      ref="datePicker"
      v-model="datePickerValue"
      :color="hexColor"
      :display-format="displayFormat"
      :element="elementTag"
      :format="format"
      :locale="locale"
      :type="displayType"
      @change="datePickerChange" />
  </div>
</template>
