<script setup lang="ts">
defineProps({
  logoSrc: {
    type: String,
    required: true
  },
  isSidebarExpanded: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <img
    :class="['img-fluid', { 'logo-mini': !isSidebarExpanded }]"
    :src="logoSrc"
    alt="KsAdminLogo" />
</template>
