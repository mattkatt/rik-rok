<template>
  <div class="video-container">
    <video
      class="video"
      ref="video"
      :src="src"
      @ended="$emit('ended')"
      @click="startStop"
      disablepictureinpicture
      disableremoteplayback
      muted
      @pause="videoIsPaused = true"
      @play="videoIsPaused = false"
    ></video>

    <icon-fa6-solid-play v-if="videoIsPaused" class="play-icon" @click="startStop"/>

    <div class="sidebar">
      <div class="sidebar__item">
        <div class="sidebar__user">
          <video :src="src" disablepictureinpicture disableremoteplayback muted class="object-cover h-10 w-10"/>
        </div>

        <div class="sidebar__user-plus">
          <icon-mdi-plus />
        </div>
      </div>

      <div class="sidebar__item">
        <icon-mdi-heart class="sidebar__icon" @click="heartCount++"/>
        <span class="sidebar__text">{{ heartCount }}</span>
      </div>

      <div class="sidebar__item">
        <icon-system-uicons-speech-typing class="sidebar__icon" @click="speechCount++"/>
        <span class="sidebar__text">{{ speechCount }}</span>
      </div>

      <div class="sidebar__item">
        <icon-fa6-solid-share class="sidebar__icon" @click="shareCount++"/>
        <span class="sidebar__text">{{ shareCount }}</span>
      </div>
    </div>
  </div>

</template>

<script setup>
const props = defineProps({
  src: String,
  autoplay: Boolean
});

defineEmits(["ended"]);

const video = ref(null)
const videoIsVisible = ref(false)
const videoIsPaused = ref(true)

const heartCount = ref(Math.ceil(Math.random() * 100))
const speechCount = ref(Math.ceil(Math.random() * 100))
const shareCount = ref(Math.ceil(Math.random() * 100))

const { stop } = useIntersectionObserver(video, ([entry]) => {
  videoIsVisible.value = entry.isIntersecting
}, {
  threshold: 0.5
})

const startStop = () => {
  if (video.value.paused) {
    video.value.play();
    video.value.muted = false;
  } else {
    video.value.pause();
  }
};

watch(videoIsVisible, (isVisible) => {
  if (isVisible && props.autoplay) {
    video.value.play();
    video.value.muted = false;
  } else {
    video.value.pause();
    video.value.currentTime = 0;
  }
})
</script>

<style scoped lang="postcss">
.video-container {
  @apply relative w-full h-screen bg-black;
}

.video {
  @apply w-full h-full object-contain;
}

.play-icon {
  @apply absolute top-1/2 left-1/2 text-white text-8xl -translate-x-1/2 -translate-y-1/2;
}

.sidebar {
  @apply absolute bottom-16 right-0;
}

.sidebar__item {
  @apply text-white flex flex-col items-center m-2;
}

.sidebar__icon {
  @apply text-4xl;
}

.sidebar__text {
  @apply text-sm;
}

.sidebar__user {
  @apply rounded-full h-10 w-10 border-2 border-white overflow-hidden
}

.sidebar__user-plus {
 @apply rounded-full h-4 w-4 border-2 border-white bg-red-600 flex justify-center items-center -mt-2
}
</style>
