<template>
  <div class="no-result">
    <div class="no-result-content">
      <p class="text">{{ title }}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'no-result',
  data () {
    return {
      title: '抱歉，没有结果'
    }
  },
  methods: {
    setTitle (title) {
      this.title = title
    }
  }
}
</script>

<style lang="scss" scoped>
.no-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .no-result-content {
    text-align: center;
    .text {
      margin-top: 30px;
      font-size: $font-size-medium;
      color: $color-text-d;
    }
  }
}
</style>
