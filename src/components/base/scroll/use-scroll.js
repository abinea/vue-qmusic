import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";

import { onMounted, onUnmounted, ref } from "vue";

BScroll.use(ObserveDOM);

export default function useScroll(wrapperRef, options, emits) {
  const scroll = ref(null);

  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(wrapperRef.value, {
      ObserveDOM: true,
      ...options,
    }));

    if (options.probeType > 0) {
      scrollVal.on("scroll", (pos) => {
        emits("scroll", pos);
      });
    }
  });
  onUnmounted(() => {
    scroll.value.destroy();
  });
}
