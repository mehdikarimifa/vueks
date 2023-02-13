<script lang="ts" setup>
import type { PropType } from 'vue'
import type { _Range } from '@/types'

defineProps({
  rowNumber: {
    type: Number,
    default: 3
  },
  rowGap: {
    type: Number as PropType<_Range<1, 6>>,
    default: 3
  },
  rowHeight: {
    type: Number,
    default: 52
  },
  backgroundColor: {
    type: String,
    default: '#e5e5e5'
  }
})
</script>

<template>
  <div :class="'gap-' + rowGap" class="ks-skeleton d-flex flex-column">
    <div
      v-for="row in rowNumber"
      :key="row"
      :style="[{ height: rowHeight + 'px' }, 'background: ' + backgroundColor]"
      class="item" />
  </div>
</template>

<style lang="scss" scoped>
.ks-skeleton {
  cursor: progress;

  .item {
    position: relative;
    overflow: hidden;
    border-radius: 4px;

    &::after {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transform: translateX(-100%);
      background-image: linear-gradient(
          to left,
          transparent,
          rgba(var(--background-color), 0.5),
          transparent
      );
      animation: skeleton 800ms infinite;
    }
  }
}

@-webkit-keyframes skeleton {
  100% {
    transform: translateX(100%);
  }
}

@keyframes skeleton {
  100% {
    transform: translateX(100%);
  }
}

[data-theme='darkMode'] {
  .ks-skeleton {
    .item {
      background: rgb(var(--background-color-gray));
    }
  }
}
</style>
