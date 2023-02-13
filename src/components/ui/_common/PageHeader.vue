<script setup lang="ts">
import KsButton from '../KsButton.vue'
import { KsIcon } from '@ksCoreUi'
import { Colors } from '@/assets'

defineProps({
  pageTitle: {
    type: String,
    default: ''
  },
  hasBackBtn: {
    type: Boolean,
    default: false
  },
  hasAddBtn: {
    type: Boolean,
    default: false
  },
  pageIcon: {
    type: String,
    default: null
  }
})

const emits = defineEmits(['onAddBtnClick'])
</script>

<template>
  <div class="page-header pt-2 pe-2">
    <div class="page-header-title gap-4">
      <span class="fw-bold color-secondary text-title" dir="rtl">
        {{ pageTitle }}
      </span>
      <div class="page-header-icon mx-2">
        <div class="page-header-icon-background" />
        <KsIcon
          v-if="pageIcon"
          :name="pageIcon"
          size="34"
          :color="Colors.secondary"
          theme="duotone" />
      </div>
    </div>

    <div class="d-flex gap-3">
      <KsButton
        v-if="hasBackBtn"
        color="dark"
        fixed-width-height="42"
        theme="flat"
        @click="$router.back()">
        <template #content>
          <KsIcon name="angle-left" size="16" />
        </template>
      </KsButton>
      <KsButton
        v-if="hasAddBtn"
        class="d-none d-sm-block"
        color="secondary"
        title="افزودن جدید"
        @click="emits('onAddBtnClick')" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-header {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;

  .page-header-title {
    display: flex;
    align-items: center;

    .page-header-icon {
      position: relative;

      .page-header-icon-background {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 8px;
        transform: translate(-50%, -50%) rotate(12deg);
        box-shadow: -4px 4px 8px 4px rgba(var(--secondary), 0.04);
        padding: 28px;
      }

      svg,
      svg path {
        stroke: rgb(var(--text-color)) !important;
      }
    }
  }
}
</style>
