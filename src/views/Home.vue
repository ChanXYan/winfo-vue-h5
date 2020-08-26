<template>
  <div class="home">
    home
    <img v-lazy="url" alt />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      url: 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
    }
  },
  components: {},
  mounted () {

  }
}
</script>

<style scope lang="less">
.home {
  width: 750px;
  height: 100px;
}
</style>
