<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group" v-for="item in sliders" :key="item.id">
      <a :href="item.link">
        <img :src="item.pic" />
      </a>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in sliders"
        :key="item.id"
        :class="{ active: currentPageIndex === index }">
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useSlider from "./use-slider";
export default {
  name: "slider",
  props: {
    sliders: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const rootRef = ref(null);
    const { currentPageIndex } = useSlider(rootRef);

    return {
      rootRef,
      currentPageIndex,
    };
  },
};
</script>

<style lang="scss" scoped></style>
