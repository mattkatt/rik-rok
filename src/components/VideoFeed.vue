<template>
  <AppHeader :current="videos[currentVideoIndex]"/>
  <div ref="videoFeed" class="video-feed">
    <template v-for="(video, i) in videos" :key="i">
      <VideoItem
        v-if="loaded || i === 0"
        :src="video"
        :autoplay="i !== 0"
        @ended="nextVideo"
      />
    </template>
  </div>
  <AppFooter />
</template>

<script setup>
import { useSwipe, useWindowSize } from "@vueuse/core";
import { useShuffle } from "../composables/useShuffle.js";

const { height } = useWindowSize()

const videoFeed = ref(null);
const currentVideoIndex = ref(0);
const videoSize = ref(200)
const loaded = ref(false);

const videos = ref([
    "/rik-rok/videos/matt_evans.mp4",
    ...useShuffle([
      "/rik-rok/videos/adam_lyle.mp4",
      "/rik-rok/videos/adrian_edworthy.mp4",
      "/rik-rok/videos/anina_kinzel.mp4",
      "/rik-rok/videos/carly_&_jordan.mp4",
      "/rik-rok/videos/cath_elms.mp4",
      "/rik-rok/videos/chris_nicholls.mp4",
      "/rik-rok/videos/dean_brown.mp4",
      "/rik-rok/videos/jak_&_rose.mp4",
      "/rik-rok/videos/jess_elvin.mp4",
      "/rik-rok/videos/keri_moriarty.mp4",
      "/rik-rok/videos/kirsty_rowles.mp4",
      "/rik-rok/videos/liz_taylor.mp4",
      "/rik-rok/videos/lou_peck.mp4",
      "/rik-rok/videos/lucy_bason.mp4",
      "/rik-rok/videos/matthew_sparrow.mp4",
      "/rik-rok/videos/melon_bailey.mp4",
      "/rik-rok/videos/morgan_clark.mp4",
      "/rik-rok/videos/nico_campbell.mp4",
      "/rik-rok/videos/ruth_pallister.mp4",
      "/rik-rok/videos/ste_hough.mp4",
      "/rik-rok/videos/tim_hunt.mp4",
      "/rik-rok/videos/vikki_baker.mp4",
    ]),
  "/rik-rok/videos/rick_astley.mp4",
]);

const nextVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % videos.value.length;
};

const prevVideo = () => {
  if (currentVideoIndex.value === 0) {
    return;
  }

  currentVideoIndex.value = (currentVideoIndex.value - 1 + videos.value.length) % videos.value.length;
};

const { isSwiping } = useSwipe(videoFeed, {
  passive: true,
  onSwipeEnd: (event, direction) => {
    if (direction === "up") {
      nextVideo();
    } else if (direction === "down") {
      prevVideo();
    }
  },
});

onMounted(() => {
  videoSize.value = videoFeed.value.clientHeight;
  videoFeed.value.style.transform = `translate3d(0, -${(currentVideoIndex.value) * videoSize.value}px, 0)`;
  loaded.value = true;
});

watch(currentVideoIndex, () => {
  videoFeed.value.style.transform = `translate3d(0, -${(currentVideoIndex.value) * videoSize.value}px, 0)`;
});

watch(height, () => {
  videoSize.value = videoFeed.value.clientHeight / videos.value.length;
  videoFeed.value.style.transform = `translate3d(0, -${(currentVideoIndex.value) * videoSize.value}px, 0)`;
});

</script>

<style scoped lang="postcss">
.video-feed {
  @apply relative w-full m-0 p-0;
  transition: transform 200ms ease;
}
</style>
