<template>
  <div class="singer">
    <IndexList :data="singers" @select="selectSinger" />

    <router-view v-slot="{ Component }">
      <Transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </Transition>
    </router-view>
  </div>
</template>

<script>
import storage from "good-storage"
import { getSingerList } from "@/service/singer"
import IndexList from "@/components/index-list/index-list.vue"
import { SINGER_KEY } from "@/assets/js/constant"

export default {
  name: "singer",
  components: {
    IndexList,
  },
  data() {
    return {
      singers: [],
      selectedSinger: null,
    }
  },
  async created() {
    const results = await getSingerList()
    this.singers = results.singers
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`,
      })
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
    },
  },
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
