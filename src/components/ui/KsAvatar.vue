<script lang="ts" setup>
import { type PropType, ref, type Ref } from 'vue'
import { getFallbackImage } from '@/composables'

import KsButton from '@/components/ui/KsButton.vue'
import { KsIcon } from '@ksCoreUi'
import { Colors } from '@/assets/colors'

const props = defineProps({
  mediaSrc: {
    type: String as PropType<string | ImageBitmap | Blob>,
    default: null
  },
  size: {
    type: [Number, String] as PropType<number | 'full'>,
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
  hasActionButtons: {
    type: Boolean,
    default: false
  },
  hasMediaPicker: {
    type: Boolean,
    default: false
  },
  acceptMedia: {
    type: String,
    default: 'image/*,video/*'
  },
  multipleMedia: {
    type: Boolean,
    default: false
  },
  mediaType: {
    type: String as PropType<'image' | 'video'>,
    default: 'image'
  },
  active: {
    type: Boolean,
    default: false
  },
  objectFit: {
    type: String as PropType<'cover' | 'contain'>,
    default: 'cover'
  },
  canOpenMediaPicker: {
    type: Boolean,
    default: true
  },
  videoConfig: {
    type: Object,
    default: () => ({
      autoplay: true,
      loop: false,
      muted: true,
      controls: false
    })
  },
  scaleOnHover: {
    type: Boolean,
    default: true
  },
  actionButtonsSize: {
    type: String,
    default: '24'
  },
  actionButtonsWrapperStyle: {
    type: String,
    default: 'bottom: 8px; right: -4px'
  },
  videoIdTag: {
    type: String,
    default: null
  }
})

const emit = defineEmits([
  'click',
  'mediaChange',
  'removeMedia',
  'pause',
  'play'
])

const mediaPicker: Ref<HTMLInputElement | null> = ref(null)

const onAvatarClick = (checkPermission = true) => {
  if (checkPermission ? props.hasMediaPicker && props.canOpenMediaPicker : true)
    mediaPicker.value?.click()
  else emit('click')
}

const onMediaPickerChange = (event: Event) => {
  emit('mediaChange', (event.target as HTMLInputElement).files)
}
const onRemoveButtonClick = () => {
  emit('removeMedia')
  if (mediaPicker.value) mediaPicker.value.value = ''
}
</script>

<template>
  <div class="position-relative">
    <button
      :class="[{ active: active }, { 'scale-on-hover': scaleOnHover }]"
      :style="
        size === 'full'
          ? {
              width: '100%',
              height: '100%',
              borderRadius: '24px'
            }
          : {
              width: size + 'px',
              height: size + 'px',
              borderRadius: size / 4 + 'px'
            }
      "
      class="ks-avatar"
      @click="onAvatarClick">
      <input
        v-if="hasMediaPicker"
        ref="mediaPicker"
        :accept="acceptMedia"
        :multiple="multipleMedia"
        hidden
        type="file"
        @change="onMediaPickerChange" />
      <img
        v-if="mediaSrc && mediaType === 'image'"
        :class="'object-fit-' + objectFit"
        :src="mediaSrc"
        @error="getFallbackImage"
        alt="" />
      <video
        v-if="mediaSrc && mediaType === 'video'"
        :id="videoIdTag"
        :class="'object-fit-' + objectFit"
        :src="mediaSrc"
        v-bind="videoConfig"
        @pause="emit('pause')"
        @play="emit('play')" />
      <KsIcon
        v-if="!mediaSrc"
        name="plus"
        :color="Colors.primary"
        :size="iconSize" />
      <slot />
    </button>
    <transition name="fade">
      <div
        v-if="hasActionButtons && mediaSrc"
        :style="actionButtonsWrapperStyle"
        class="position-absolute">
        <div class="d-flex flex-column gap-1">
          <KsButton
            :fixed-width-height="actionButtonsSize"
            color="dark"
            radius="circle"
            @click="onAvatarClick(false)">
            <template #content>
              <KsIcon name="pencil" :color="Colors.white" size="12" />
            </template>
          </KsButton>
          <KsButton
            :fixed-width-height="actionButtonsSize"
            color="danger"
            radius="circle"
            @click="onRemoveButtonClick">
            <template #content>
              <KsIcon name="times" :color="Colors.white" size="12" />
            </template>
          </KsButton>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.ks-avatar {
  background: rgba(var(--input-background), 1);
  border: 3px solid rgba(var(--text-color), 0.1);
  overflow: hidden;
  padding: 0;

  &.active {
    border: 7px solid rgba(var(--success), 0.4);
  }

  &:hover {
    background: rgba(var(--input-background-focus), 1);
  }

  &.scale-on-hover:hover {
    img,
    video {
      transform: scale(1.1);
    }
  }

  svg {
    stroke: rgba(var(--text-color), 0.7);
  }

  img,
  video {
    width: 100%;
    height: 100%;

    &.object-fit-contain {
      padding-left: 8px;
      padding-right: 8px;
    }
  }
}
</style>
