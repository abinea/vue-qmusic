<template>
  <MHeader />
  <Tab />
  <router-view v-slot="{ Component }" :style="viewStyle">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </router-view>
  <router-view v-slot="{ Component }" name="user" :style="viewStyle">
    <Transition appear name="slide">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </router-view>
  <Player />
</template>

<script>
import Header from "@/components/header/header.vue"
import Tab from "@/components/tab/tab.vue"
import Player from "@/components/player/player.vue"
import { mapState } from "vuex"

export default {
  components: {
    MHeader: Header,
    Tab,
    Player,
  },
  computed: {
    viewStyle() {
      const bottom = this.playlist.length ? "60px" : "0"
      return {
        bottom,
      }
    },
    ...mapState(["playlist"]),
  },
}
</script>
