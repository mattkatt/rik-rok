<template>
  <div class="card">
    <h1>Hello {{ name }}</h1>
  </div>
</template>

<script setup>
const name = 'Vue 3';
</script>

<style scoped lang="postcss">
.card {
  @apply bg-gray-100 rounded-lg p-4 text-center;
}

.card h1 {
  @apply text-2xl font-bold text-blue-500;
}
</style>
