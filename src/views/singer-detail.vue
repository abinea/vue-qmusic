<template>
  <div class="singer-detail">
    <MusicList :songs="songs" :title="title" :pic="pic" :loading="loading" />
    <router-view v-slot="{ Component }">
      <Transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </Transition>
    </router-view>
  </div>
</template>

<script>
import createDetailComponent from "@/assets/js/create-detail-component"
import { getSingerDetail } from "@/service/singer"
import { SINGER_KEY } from "@/assets/js/constant"

export default createDetailComponent(
  "singer-detail",
  SINGER_KEY,
  getSingerDetail
)
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
