<template>
  <div ref="item" class="app-footer__item" @click.prevent="bounce">
    <slot/>
  </div>
</template>

<script setup>
const item = ref()

const bounce = () => {
  item.value.classList.add('animate-bounce')

  setTimeout(() => {
    item.value.classList.remove('animate-bounce')
  }, 3000)
}
</script>

<style scoped lang="postcss">
.app-footer__item {
  @apply relative font-bold text-3xl m-4 drop-shadow;
}
</style>
