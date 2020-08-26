<template>
  <div class="home">
    home
    <img v-lazy="url" alt />
  </div>
</template>

<script>
import api from '../api/index'
export default {
  name: 'Home',
  data () {
    return {
      url: 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
    }
  },
  components: {},
  mounted () {
    // api.test({ a: 1, b: 13 }).then(res => {
    //   console.log(7878, res)
    // })

    api.siteSupervisionQuery().then(res => {
      console.log(555, res)
    })
  }
}
</script>

<style scope lang="less">
.home {
  width: 750px;
  height: 100px;
}
</style>
