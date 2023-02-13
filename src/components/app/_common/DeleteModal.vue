<script lang="ts" setup>
import KsModal from '@/components/ui/KsModal.vue'
import KsButton from '@/components/ui/KsButton.vue'

defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  submitLoading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['submit', 'cancel'])
</script>

<template>
  <KsModal :model-value="visible" blur class="unselectable-text">
    <div class="text-center pt-2">
      <span class="color-danger fw-bold text-large"> هشدار </span>
    </div>

    <div class="text-center my-3" dir="rtl">
      <span class="text-small"> از حذف این آیتم مطمعن هستید؟ </span>
    </div>

    <div class="d-flex gap-2 mt-3" dir="ltr">
      <KsButton
        :loading="submitLoading"
        color="danger"
        tabindex="0"
        theme="flat"
        title="تایید"
        @click="$emit('submit')"
        @keyup.enter="$emit('cancel')" />
      <KsButton color="transparent" title="لغو" @click="$emit('cancel')" />
    </div>
  </KsModal>
</template>
