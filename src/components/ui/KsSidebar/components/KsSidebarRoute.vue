<script setup lang="ts">
import type { SidebarRoute } from '@/types'
import { computed, type PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePreferences } from '@/store'

import { KsIcon, KsAccordion } from '@ksCoreUi'
import { Colors } from '@/assets'

const props = defineProps({
  sidebarRoute: {
    type: Object as PropType<SidebarRoute>,
    required: true
  },
  isParent: {
    type: Boolean,
    default: true
  }
})
const route = useRoute()
const router = useRouter()
const preferencesStore = usePreferences()

const isSameRoute = computed(() => route.name === props.sidebarRoute.routeName)

const isRouteActive = computed(() => {
  return props.sidebarRoute.hasSub
    ? route.meta.related === props.sidebarRoute.routeMeta
    : isSameRoute.value
})

const routeIconColor = computed(() => {
  if (preferencesStore.isThemeDarkMode)
    return isSameRoute.value ? Colors.white : Colors.primaryLighter

  return isSameRoute.value ? Colors.primary : Colors.primaryLight
})

const pushToRoutePage = () => {
  if (!props.sidebarRoute.hasSub)
    router.push({ name: props.sidebarRoute.routeName })
}
</script>

<template>
  <KsAccordion
    :class="[
      'ks-sidebar-route-wrapper',
      {
        'active-route': isRouteActive,
        'is-parent': isParent
      }
    ]"
    :icon="sidebarRoute.hasSub ? 'angle-left' : null"
    icon-size="13"
    :icon-color="Colors.primaryLight"
    icon-rotation-deg="-90"
    @click="pushToRoutePage">
    <template #header>
      <div class="ks-sidebar-route-container cursor-pointer">
        <div
          :class="[
            'ks-sidebar-route gap-3',
            {
              'same-route': isSameRoute
            }
          ]">
          <KsIcon
            :name="sidebarRoute.iconName ?? 'circle'"
            :size="sidebarRoute.iconName ? '18' : '8'"
            :theme="isSameRoute ? 'solid' : 'regular'"
            :color="routeIconColor" />
          <span v-if="preferencesStore.isSidebarExpanded" class="text-small">
            {{ sidebarRoute.title }}
          </span>
          <span v-else class="opacity-0">...</span>
        </div>
      </div>
    </template>
    <template #content>
      <div v-if="sidebarRoute.hasSub" class="me-2">
        <KsSidebarRoute
          v-for="(sidebarRouteSub, index) in sidebarRoute.subs"
          :key="`${sidebarRoute.routeMeta}_${index}`"
          :sidebar-route="sidebarRouteSub"
          :is-parent="false" />
      </div>
    </template>
  </KsAccordion>
</template>

<style scoped lang="scss">
.ks-sidebar-route-wrapper {
  &:hover {
    background: rgba(var(--primary), 0.03);
  }

  &:not(.is-parent) {
    .ks-sidebar-route-container {
      padding: 9px 22px;

      span {
        font-size: 12px;
      }
    }
  }

  &.active-route {
    background: rgba(var(--primary), 0.04);
    position: relative;

    &.is-parent::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 6px;
      border-top-left-radius: 32px;
      border-bottom-left-radius: 32px;
      background: rgb(var(--primary));
    }
  }

  .ks-sidebar-route-container {
    direction: rtl;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 22px;

    .ks-sidebar-route {
      display: flex;
      align-items: center;

      &.same-route {
        span {
          color: rgb(var(--primary));
          font-weight: 900;
        }
      }

      span {
        color: rgb(var(--primary-light));
      }
    }
  }
}

[data-theme='darkMode'] {
  .ks-sidebar-route {
    &.same-route {
      span {
        color: rgb(var(--white)) !important;
      }
    }

    span {
      color: rgb(var(--primary-lighter)) !important;
    }
  }
}
</style>
