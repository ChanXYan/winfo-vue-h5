<template>
  <div class="home">
    <div class="list">
      <div
        v-for="(item,index) in list"
        :key="'item'+index"
        class="item"
        @click="clickItem(item)"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      list: [{
        url: '/checkReportSearch',
        name: '报告查询',
        params: ''
      }, {
        url: '/navWarning/1',
        name: '航行警告',
        params: ''
      }, {
        url: '/navWarning/2',
        name: '航行通告',
        params: ''
      }, {
        url: '/airInfo',
        name: '气象信息',
        params: ''
      }, {
        url: '/orgQuery',
        name: '机构查询',
        params: ''
      }, {
        url: '/qualifyQuery',
        name: '资质查询',
        params: ''
      }]
    }
  },
  methods: {
    clickItem (item) {
      this.$router.push({
        path: item.url,
      })
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
  min-height: 100vh;
  background: #eee;
  overflow: hidden;
  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 30px;
    .item {
      width: 210px;
      height: 150px;
      line-height: 150px;
      border-radius: 25px;
      margin-bottom: 20px;
      text-align: center;
      font-size: 28px;
      background: #fff;
      margin-right: 30px;
    }
    .item:nth-child(3n + 3) {
      margin-right: 0;
    }
    .item:active {
      background: cornflowerblue;
      color: #fff;
    }
  }
}
</style>
