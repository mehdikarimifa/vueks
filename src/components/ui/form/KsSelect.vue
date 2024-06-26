<script lang="ts" setup>
import {
  computed,
  type ComputedRef,
  onMounted,
  type PropType,
  ref,
  type Ref,
  watch
} from 'vue'

import KsButton from '@/components/ui/KsButton.vue'
import { KsIcon } from '@ksCoreUi'
import { Colors } from '@/assets/colors'

type Option = {
  label: string
  value: unknown
  selected: boolean
  index: number
}

const props = defineProps({
  mode: {
    type: String as PropType<'simple' | 'search' | 'filter' | 'multiple'>,
    default: 'simple'
  },
  modelValue: {
    type: [String, Number, Array] as PropType<any>,
    default: null
  },
  options: {
    type: Array as PropType<any>,
    required: true,
    default: () => []
  },
  labelPropName: {
    type: String,
    default: 'title'
  },
  valuePropName: {
    type: String,
    default: 'value'
  },
  placeholder: {
    type: String,
    default: ''
  },
  ltr: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  submitBtn: {
    type: Boolean,
    default: false
  },
  removeBtn: {
    type: Boolean,
    default: false
  },
  customHandleChange: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:modelValue',
  'onOptionClick',
  'onSubmitClick',
  'removeBtnClick',
  'change'
])

const searchInput: Ref<HTMLInputElement | null> = ref(null)
// const optionsMenu: Ref<HTMLDivElement> = ref(null)
const openMenuFromUp: Ref<boolean> = ref(false)
const allOptions: Ref<Option[]> = ref([])
const searchVal: Ref<string> = ref('')
const activeOption: Ref<number | null> = ref(null)

const options: ComputedRef<Option[]> = computed(() => {
  if (searchVal.value !== '' && props.mode !== 'simple')
    return allOptions.value.filter(d =>
      d.label.toLowerCase().includes(searchVal.value.toLowerCase())
    )
  return allOptions.value
})

const multiSelectedOptions: ComputedRef<Option[]> = computed(() => {
  let selectedItems: Option[] = []
  if (!props.loading)
    for (let i = 0; i < allOptions.value.length; i++) {
      if (allOptions.value[i].selected) selectedItems.push(allOptions.value[i])
    }
  return selectedItems
})

watch(
  () => props.loading,
  () => {
    if (!props.loading) {
      getAllOptions()
      handleDynamicValChange()
    }
  }
)

watch(
  () => props.modelValue,
  () => {
    searchVal.value = ''
    if (props.mode === 'multiple') handleDynamicMultipleValChange()
    else handleDynamicValChange()
  }
)

const handleDynamicValChange = () => {
  if (props.modelValue && props.mode !== 'multiple')
    if (props.mode === 'search') searchVal.value = props.modelValue.toString()
    else
      for (let i = 0; i < allOptions.value.length; i++)
        if (allOptions.value[i].value == props.modelValue) {
          searchVal.value = allOptions.value[i].label
          break
        }
}

function onButtonFocusIn() {
  props.mode === 'multiple' && searchInput.value?.focus()

  // const scrollTop: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  // const topOffset: number = openMenuFromUp.value ? optionsMenu.value.getBoundingClientRect().bottom : optionsMenu.value.getBoundingClientRect().top;
  // const relativeOffset: number = scrollTop - topOffset;
  // const windowHeight: number = window.innerHeight;
  // openMenuFromUp.value = relativeOffset < windowHeight
}

function emitMultiSelectedOptions() {
  const selectedOptions = []
  for (let i = 0; i < props.options.length; i++)
    for (let j = 0; j < multiSelectedOptions.value.length; j++)
      if (
        multiSelectedOptions.value[j].value ===
        props.options[i][props.valuePropName]
      ) {
        selectedOptions.push(props.options[i])
        break
      }

  emit('update:modelValue', selectedOptions)
}

function handleSelectedOptions(option: Option) {
  for (let i = 0; i < allOptions.value.length; i++) {
    if (option.index === allOptions.value[i].index) {
      allOptions.value[i].selected = !allOptions.value[i].selected
      break
    }
  }
  emitMultiSelectedOptions()
}

function onOptionClick(option: Option, index: number) {
  searchVal.value = ''
  if (props.mode === 'multiple') handleSelectedOptions(option)
  else {
    activeOption.value = index
    searchVal.value = option.label

    if (props.customHandleChange) emit('onOptionClick', option)
    else {
      emit('update:modelValue', option.value)
      emit('change', option)
    }
  }
}

function selectAllText() {
  props.mode !== 'simple' &&
    searchInput.value?.setSelectionRange(0, searchVal.value.length)
  if (props.mode === 'filter') {
    !!searchInput.value && (searchInput.value.value = '')
    searchVal.value = ''
  }
}

function onSubmitBtnClick() {
  emit('onSubmitClick', searchVal.value)
  searchInput.value?.blur()
}

function onRemoveBtnClick() {
  activeOption.value = null
  props.mode !== 'multiple' && (searchVal.value = '')
  emit('update:modelValue', '')
}

function onBlurSearchInput() {
  if (props.mode === 'filter' || props.mode === 'multiple')
    setTimeout(() => {
      searchVal.value = ''
      for (let i = 0; i < allOptions.value.length; i++) {
        if (props.modelValue === allOptions.value[i].value) {
          searchVal.value = allOptions.value[i].label
          break
        }
      }
    }, 200)
}

function handleDynamicMultipleValChange() {
  for (let i = 0; i < allOptions.value.length; i++) {
    if (props.mode === 'multiple' && props.modelValue.length) {
      for (let j = 0; j < props.modelValue.length; j++) {
        if (
          allOptions.value[i].value === props.modelValue[j][props.valuePropName]
        ) {
          allOptions.value[i].selected = true
        }
      }
    }
  }
}

function getAllOptions() {
  searchVal.value = ''
  const finalOptions: Option[] = []
  if (!props.loading && props.options?.length) {
    for (let i = 0; i < props.options.length; i++) {
      finalOptions.push({
        label: props.options[i][props.labelPropName],
        value: props.options[i][props.valuePropName],
        selected: false,
        index: i
      })

      if (
        props.mode === 'multiple' &&
        props.modelValue &&
        props.modelValue.length
      ) {
        for (let j = 0; j < props.modelValue.length; j++) {
          if (
            props.options[i][props.valuePropName] ===
            props.modelValue[j][props.valuePropName]
          ) {
            finalOptions[finalOptions.length - 1].selected = true
          }
        }
      }
    }
  }
  allOptions.value = finalOptions

  if (!props.loading) handleDynamicValChange()
}

function onInputChange(event: Event) {
  if (props.mode === 'search')
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}

onMounted(() => {
  getAllOptions()
})
</script>

<template>
  <div
    :class="ltr ? 'ltr' : 'rtl'"
    :dir="ltr ? 'ltr' : 'rtl'"
    class="ks-input IRANYekan">
    <button
      :class="{ 'opacity-50 no-pointer-event': disabled }"
      :disabled="loading || disabled"
      class="ks-select p-0 d-flex align-items-center justify-content-start gap-2"
      @focusin="onButtonFocusIn">
      <transition-group
        v-if="mode === 'multiple'"
        :duration="100"
        class="d-flex align-items-center flex-1 justify-content-start gap-2 pe-2"
        name="fade"
        tag="div">
        <div
          v-for="(multiOption, index) in multiSelectedOptions.slice(0, 2)"
          :key="index + 'multipleItem'"
          class="multiple-item">
          {{ multiOption.label }}
          <button
            class="multiple-item-remove-btn"
            @click="onOptionClick(multiOption, null)">
            <KsIcon name="times" :color="Colors.primary" size="14" />
          </button>
        </div>
        <div
          v-if="multiSelectedOptions.length > 2 && mode === 'multiple'"
          key="collapsedItems"
          class="multiple-item fw-bold">
          <span class="w-100">{{ multiSelectedOptions.length - 2 }}+</span>
        </div>
      </transition-group>
      <input
        ref="searchInput"
        v-model="searchVal"
        :class="mode !== 'search' && mode !== 'filter' && 'cursor-pointer'"
        :disabled="loading"
        :placeholder="placeholder"
        :readonly="mode === 'simple'"
        autocomplete="none"
        class="h-100 search-input"
        @blur="onBlurSearchInput"
        @click="selectAllText"
        @input="onInputChange"
        @keyup.enter="!!submitBtn && onSubmitBtnClick()" />

      <div
        ref="optionsMenu"
        :class="{ 'open-upside': openMenuFromUp }"
        class="ks-options d-flex flex-column">
        <button
          v-for="(option, index) in options"
          :key="index + 'option'"
          :class="(option.selected || activeOption === index) && 'active'"
          type="button"
          @click="onOptionClick(option, index)">
          <div
            v-if="mode === 'multiple'"
            :class="[
              option.selected ? 'background-primary' : 'custom-border-1',
              ltr ? 'me-2' : 'ms-2'
            ]"
            class="rounded-3 d-flex align-items-center justify-content-center"
            style="width: 20px; height: 20px">
            <KsIcon
              v-if="option.selected"
              name="check"
              size="13"
              :color="Colors.white" />
          </div>
          <span class="text-xSmall">{{ option.label }}</span>
        </button>
        <div
          v-if="options.length < 1 && mode !== 'search'"
          class="text-xSmall color-primary-light text-center w-100 py-3">
          داده ای یافت نشد...
        </div>
      </div>

      <KsIcon
        v-if="!submitBtn && !removeBtn && !loading"
        name="angle-left"
        class="angle-icon"
        color="#000000"
        size="14" />

      <KsButton
        v-if="removeBtn && searchVal !== '' && !loading"
        class="submit-btn"
        color="primary"
        radius="circle"
        size="mini"
        theme="flat"
        @click="onRemoveBtnClick">
        <template #content>
          <KsIcon name="times" size="12" :color="Colors.primary" />
        </template>
      </KsButton>

      <KsButton
        v-if="submitBtn && !loading && modelValue !== '' && searchVal !== ''"
        class="submit-btn"
        color="transparent"
        radius="circle"
        size="mini"
        @click="onSubmitBtnClick">
        <template #content>
          <KsIcon name="check" size="14" :color="Colors.primary" />
        </template>
      </KsButton>
      <div
        v-if="loading"
        :class="ltr ? 'right' : 'left'"
        class="custom-loader" />
    </button>
  </div>
</template>
