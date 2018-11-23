<template>
  <div class="index-container">
    <div class="index-text">name:{{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
