<template>
  <div style="width:100%;height:650px;">
    <iframe :src="src" style="width:100%;height:100%;" frameborder="”no”" border="”0″" marginwidth="”0″" marginheight="”0″" scrolling="”no”" allowtransparency="”yes”"/>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    // 仅读取，值只须为函数
    src: function() {
      return '/kong/rightmanage/ui/index.html#/approle/RepairSystemWeb'
    }
  }
}
</script>
<style>
</style>
