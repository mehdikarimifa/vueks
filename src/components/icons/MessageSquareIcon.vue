<template>
  <svg
    :height="width"
    :stroke="fill"
    :width="width"
    class="feather feather-message-square"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
</template>
<script setup>
defineProps({
  fill: {
    type: String,
    default: '#000000'
  },
  width: {
    type: String,
    default: '16'
  }
})
</script>
