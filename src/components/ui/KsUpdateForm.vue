<script lang="ts" setup>
import KsButton from '@/components/ui/KsButton.vue'
import { KsIcon } from '@ksCoreUi'
import { Colors } from '@/assets/colors'
import PageHeader from '@/components/ui/_common/PageHeader.vue'

defineProps({
  formTitle: {
    type: String,
    required: true
  },
  btnLoading: {
    type: Boolean,
    default: false
  },
  appendToTitle: {
    type: Boolean,
    default: true
  },
  isEdit: {
    type: Boolean,
    required: true
  },
  hasSubmitBtn: {
    type: Boolean,
    default: true
  },
  hasTransitionGroup: {
    type: Boolean,
    default: false
  },
  hasBackBtn: {
    type: Boolean,
    default: true
  },
  formIcon: {
    type: String,
    default: null
  }
})

defineEmits(['formSubmit'])
</script>

<template>
  <div class="background-color p-3 shadow-sm rounded-3 text-end">
    <PageHeader
      :page-title="`${
        appendToTitle ? (isEdit ? 'ویرایش' : 'افزودن') : ''
      } ${formTitle}`"
      :page-icon="formIcon"
      :has-back-btn="hasBackBtn" />
    <hr class="opacity-30" />

    <!--       FORM       -->
    <transition-group
      v-if="hasTransitionGroup"
      class="mt-5 row gap-3 justify-content-center align-items-center"
      name="fade"
      tag="div">
      <slot name="form" />
    </transition-group>
    <div
      v-else
      class="mt-5 row gap-3 justify-content-center align-items-center">
      <slot name="form" />
    </div>

    <div
      v-if="hasSubmitBtn"
      class="d-grid d-sm-flex justify-content-sm-center mt-5">
      <KsButton
        :loading="btnLoading"
        :title="
          (appendToTitle ? (isEdit ? 'ویرایش' : 'افزودن') : '') +
          ' ' +
          formTitle
        "
        class="py-1 px-2 fw-bold text-small"
        color="primary"
        @click="$emit('formSubmit')" />
    </div>
  </div>
</template>
