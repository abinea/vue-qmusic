<template>
  <div class="album">
    <MusicList :songs="songs" :title="title" :pic="pic" :loading="loading" />
  </div>
</template>

<script>
import MusicList from "@/components/music-list/music-list.vue"
export default {
  name: "album",
  components: {
    MusicList,
  },
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
