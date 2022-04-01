<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import useScroll from "./use-scroll";
import { ref } from "vue";

export default {
  name: "scroll",
  props: {
    click: {
      type: Boolean,
      default: true,
    },
    probeType: {
      type: Number,
      default: 0,
    },
  },
  emits: ["scroll"],
  setup(props, { emits }) {
    const rootRef = ref(null);
    useScroll(rootRef, props, emits);

    return {
      rootRef,
    };
  },
};
</script>

<style lang="scss" scoped></style>
