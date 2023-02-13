<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePreferences } from '@/store'

import { KsSidebar } from '@ksCoreUi'
import { DefaultContainer } from './containers'
import KsNotification from './components/ui/ksNotification/KsNotification.vue'

const { setDOMThemeData } = usePreferences()

onMounted(() => {
  setDOMThemeData()
})
</script>

<template>
  <div>
    <div class="d-flex w-100 min-w-0">
      <DefaultContainer />
      <KsSidebar />
    </div>
    <KsNotification />
  </div>
</template>
