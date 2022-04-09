import { PLAY_MODE } from "@/assets/js/constant"
import { computed } from "vue"
import { useStore } from "vuex"

export default function useMode() {
  const store = useStore()
  const playMode = computed(() => store.state.playMode)
  const modeIcon = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence
      ? "icon-sequence"
      : playModeVal === PLAY_MODE.random
      ? "icon-random"
      : "icon-loop"
  })

  const modeText = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence
      ? "顺序播放"
      : playModeVal === PLAY_MODE.random
      ? "随机播放"
      : "循环播放"
  })

  function changeMode() {
    const mode = (playMode.value + 1) % 3
    store.dispatch("changeMode", mode)
  }

  return {
    modeIcon,
    changeMode,
    modeText,
  }
}
