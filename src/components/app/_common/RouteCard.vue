<script lang="ts" setup>
import type { PropType } from 'vue'
import type { RouteLink } from '@/types'

import { KsIcon } from '@ksCoreUi'
import { Colors } from '@/assets'

defineProps({
  route: {
    type: Object as PropType<RouteLink>,
    required: true
  }
})
</script>

<template>
  <div>
    <div
      :style="{ background: route.options.backgroundStyle }"
      class="route-card gap-4 p-4 cursor-pointer"
      @click="$router.push({ name: route.routeName })">
      <KsIcon
        :color="Colors.white"
        :name="route.options.iconName"
        theme="duotone"
        size="62" />
      <div class="route-card-text gap-2">
        <span class="text-white text-large fw-bold">{{ route.title }}</span>
        <span class="text-white text-xSmall">
          {{ route.options.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.route-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;

  &:hover {
    .ks-icon {
      transform: scale(1.1);
    }
  }

  .route-card-text {
    display: flex;
    flex-direction: column;
    white-space: nowrap;

    @media screen and (max-width: 420px) {
      .text-large {
        font-size: 14px !important;
      }
    }
  }
}
</style>
