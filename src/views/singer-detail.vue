<template>
  <div class="singer-detail"></div>
</template>

<script>
import { getSingerDetail } from "@/service/singer"
import { processSongs } from "@/service/song"
export default {
  name: "singer-detail",
  props: {
    singer: Object,
  },
  async created() {
    console.log(this.singer)
    const result = await getSingerDetail(this.singer)
    const songs = await processSongs(result.songs)
    console.log(songs)
  },
}
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 10;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
