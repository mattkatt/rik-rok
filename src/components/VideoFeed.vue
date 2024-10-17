<template>
  <AppHeader :current="videos[currentVideoIndex]"/>
  <div ref="videoFeed" class="video-feed">
    <VideoItem
      v-for="(video, i) in videos"
      :key="i"
      :src="video"
      :autoplay="i !== 0"
      @ended="nextVideo"
    />
  </div>
  <AppFooter />
</template>

<script setup>
import { useSwipe } from "@vueuse/core";
import { useShuffle } from "../composables/useShuffle.js";

const videoFeed = ref(null);
const currentVideoIndex = ref(0);
const videoSize = ref(200)

const videos = ref([
    "/rik-rok/videos/matt_evans.mp4",
    ...useShuffle([
      "/rik-rok/videos/anina_kinzel.mp4",
      "/rik-rok/videos/cath_elms.mp4",
      "/rik-rok/videos/chris_nicholls.mp4",
      "/rik-rok/videos/dean_brown.mp4",
      "/rik-rok/videos/jess_elvin.mp4",
      "/rik-rok/videos/liz_taylor.mp4",
      "/rik-rok/videos/lou_peck.mp4",
      "/rik-rok/videos/lucy_bason.mp4",
      "/rik-rok/videos/morgan_clark.mp4",
      "/rik-rok/videos/nico_campbell.mp4",
      "/rik-rok/videos/ste_hough.mp4",
      "/rik-rok/videos/tim_hunt.mp4",
    ]),
  "/rik-rok/videos/rick_astley.mp4",
]);

const nextVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % videos.value.length;
  console.log(`next video: ${currentVideoIndex.value}`);
};

const prevVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value - 1 + videos.value.length) % videos.value.length;
  console.log(`prev video: ${currentVideoIndex.value}`);
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
  videoSize.value = videoFeed.value.clientHeight / videos.value.length;
  videoFeed.value.style.transform = `translate3d(0, -${(currentVideoIndex.value) * videoSize.value}px, 0)`;
});

watch(currentVideoIndex, () => {
  videoFeed.value.style.transform = `translate3d(0, -${(currentVideoIndex.value) * videoSize.value}px, 0)`;
});

</script>

<style scoped lang="postcss">
.video-feed {
  @apply relative w-full m-0 p-0;
  transition: transform 200ms ease;
}
</style>
