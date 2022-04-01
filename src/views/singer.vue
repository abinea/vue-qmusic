<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers"></index-list>
  </div>
</template>

<script>
import { getSingerList } from "@/service/singer";
import IndexList from "@/components/base/index-list/index-list.vue";
export default {
  name: "singer",
  components: {
    IndexList,
  },
  data() {
    return {
      singers: [],
    };
  },
  async created() {
    const results = await getSingerList();
    this.singers = results.singers;
  },
};
</script>

<style lang="scss" scoped></style>
