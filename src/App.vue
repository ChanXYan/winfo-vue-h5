<template>
  <div id="app">
    <keep-alive>
      <router-view :key="$router.fullPath" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
@import url("./assets/style/common.less");

#app {
  font-family: PingFang SC, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  width: 750px;
  margin: 0 auto;
}
</style>
