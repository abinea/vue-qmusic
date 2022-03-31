<template>
  <div class="singer">歌手页面</div>
</template>

<script>
import { getSingerList } from "@/service/singer";
export default {
  name: "singer",
  async created() {
    const singers = await getSingerList();
    console.log(singers);
  },
};
</script>

<style lang="scss" scoped></style>
