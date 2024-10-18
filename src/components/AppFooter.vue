<template>
  <footer class="app-footer">
    <AppFooterItem>
      <icon-lucide-home />
    </AppFooterItem>
    <AppFooterItem>
      <icon-mingcute-search-ai-line />
    </AppFooterItem>
    <AppFooterItem>
      <div class="app-footer__circle">
        <div class="app-footer__circle-icon">
          <icon-mdi-plus />
        </div>
      </div>
    </AppFooterItem>
    <AppFooterItem>
      <icon-basil-download-outline />
    </AppFooterItem>
    <AppFooterItem>
      <icon-codicon-account />
    </AppFooterItem>
  </footer>
</template>

<script setup>
//
</script>

<style scoped lang="postcss">
.app-footer {
  @apply flex w-full h-16 fixed bottom-0 text-white left-0 z-10 justify-between items-center bg-gradient-to-t from-[rgba(0,0,0,0.3)];
}

.app-footer__circle:before {
  content: '';
  @apply block w-11 h-11 bg-teal-300 rounded-full -ml-1 -mt-1 -z-10 absolute top-0 left-0;
}

.app-footer__circle-icon {
  @apply text-2xl rounded-full bg-white text-black p-2 z-10;
}

.app-footer__circle:after {
  content: '';
  @apply block w-11 h-11 bg-red-500 rounded-full -mr-1 -mb-1 -z-10 absolute bottom-0 right-0;
}
</style>
