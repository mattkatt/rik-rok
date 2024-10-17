import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rik-rok',
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
      ],
      dirs: [
        'src/components',
      ],
      vueTemplate: true,
    }),
    Icons(),
    Components({
      resolvers: [
          IconsResolver({
            prefix: 'icon',
          }),
      ],
    }),
  ],
})
