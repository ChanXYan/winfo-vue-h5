<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view :key="$route.fullPath" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
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
