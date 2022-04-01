import { nextTick, ref, watch } from "vue";

export default function useFixed(props) {
  const groupRef = ref(null);
  const listHeights = ref([]);
  const scrollY = ref(0);

  watch(
    () => props.data,
    async () => {
      await nextTick();
      calculate();
    }
  );

  function calculate() {
    const list = groupRef.value.children;
    const listHeightsVal = listHeights.value;

    let height = 0;

    listHeightsVal.height = 0;
    listHeights.value.push(height);

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight;
      listHeightsVal.push(height);
    }
  }

  function onScroll(pos) {
    scrollY.value = -pos.y;
  }

  return {
    groupRef,
    onScroll,
  };
}
