<template>
  <header class="app-header">
    <img :src="img" alt="logo" class="h-12 m-2" />
    <h1 class="drop-shadow">{{ title }} | <span class="app-title">RikRok</span></h1>
    <img :src="img" alt="logo" class="h-12 m-2 opacity-0" />
  </header>
</template>

<script setup>
import img from '../assets/img/logo.png'
const props = defineProps({
  current: String
})

const title = computed(() => {
  const video = props.current.split('/').pop().split('.').shift()
  return video.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
})
</script>

<style scoped lang="postcss">
.app-header {
  @apply flex w-full h-16 fixed top-0 text-white left-0 z-10 justify-between items-center bg-gradient-to-b from-[rgba(0,0,0,0.3)];
}

.app-title {
  @apply relative font-bold;
}

.app-title:after {
  content: '';
  @apply bg-white h-0.5 w-3/4 block absolute right-[12.5%] -bottom-0.5;
}
</style>
