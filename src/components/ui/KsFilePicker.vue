<script lang="ts" setup>
import { ref, type Ref } from 'vue'

import KsButton from '@/components/ui/KsButton.vue'
import { KsIcon } from '@ksCoreUi'
import { Colors } from '@/assets/colors'

const props = defineProps({
  hasFile: {
    type: Boolean,
    default: false
  },
  fileName: {
    type: String,
    default: null
  },
  fileSize: {
    type: Number,
    default: null
  },
  height: {
    type: Number,
    default: 92
  },
  iconSize: {
    type: String,
    default: '28'
  },
  loading: {
    type: Boolean,
    default: false
  },
  acceptMedia: {
    type: String,
    default: ''
  },
  multipleMedia: {
    type: Boolean,
    default: false
  },
  hasDownloadBtn: {
    type: Boolean,
    default: false
  },
  downloadUrl: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['fileChange'])

const filePicker: Ref<HTMLInputElement | null> = ref(null)
const isDragging = ref(false)

const isFileDownloading = ref(false)

function onFilePickerClick() {
  filePicker.value?.click()
}

function onMediaPickerChange(event: Event) {
  emit('fileChange', (event.target as HTMLInputElement).files)
}

function onMediaDropped(event: DragEvent) {
  emit('fileChange', event.dataTransfer?.files)
}

function getFileSize(bytes: number, dp = 1) {
  const thresh = 1000

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  )

  return bytes.toFixed(dp) + ' ' + units[u]
}

const downloadFile = () => {
  window.open(props.downloadUrl)
}
</script>

<template>
  <div class="position-relative" @dragover.prevent @drop.prevent>
    <button
      :class="{ active: hasFile || isDragging }"
      :style="{ height: height + 'px', borderRadius: height / 12 + 'px' }"
      class="ks-file-picker w-100"
      @click="onFilePickerClick"
      @dragleave="isDragging = false"
      @dragover="isDragging = true"
      @drop="onMediaDropped">
      <input
        ref="filePicker"
        :accept="acceptMedia"
        :multiple="multipleMedia"
        hidden
        type="file"
        @change="onMediaPickerChange" />
      <slot v-if="!hasFile" name="emptyFileContent">
        <div class="d-flex flex-row-reverse gap-3 px-4 align-items-center">
          <KsIcon name="plus" :color="Colors.primary" :size="iconSize" />
          <span class="text-small"> افزودن فایل </span>
        </div>
      </slot>
      <slot v-else name="hasFileContent">
        <div class="d-flex flex-row-reverse gap-3 px-4 align-items-center">
          <KsIcon name="paper-clip" :color="Colors.primary" size="16" />
          <span v-if="!fileSize" class="color-primary text-small">
            ویرایش فایل
          </span>
          <span v-if="fileSize" class="color-primary fw-bold text-small">
            {{ getFileSize(fileSize) }}
          </span>
        </div>
      </slot>
    </button>
    <KsButton
      v-if="hasDownloadBtn"
      :disabled="!downloadUrl"
      :loading="isFileDownloading"
      class="download-file-btn"
      color="primary"
      fixed-width-height="42"
      tooltip="دانلود"
      @click="downloadFile">
      <template #content>
        <KsIcon name="cloud-download-alt" :color="Colors.white" size="24" />
      </template>
    </KsButton>
  </div>
</template>

<style lang="scss" scoped>
.ks-file-picker {
  background: rgba(var(--input-background), 1);
  border: none;
  overflow: hidden;
  padding: 0;

  &.active {
    background: rgba(var(--primary), 0.2);
  }

  &:hover {
    background: rgba(var(--input-background-focus), 1);
  }

  svg {
    stroke: rgba(var(--text-color), 0.7);
  }
}

.download-file-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
}
</style>
