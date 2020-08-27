
<template>
  <div class="container">
    <div class="picker" @click="show= true">
      <span class="iconfont icondidianshaixuan"></span>
      {{keyword ||'请选择'}}
      <span class="iconfont icondown ml10"></span>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker title show-toolbar :columns="columns" @confirm="onConfirm" @cancel="show=false" />
    </van-popup>

    <commonTable
      :total="total"
      :list="list"
      @onLoadList="onLoadList"
      :loading="loading"
      @clickItem="clickItem"
      :finished="finished"
    />
  </div>
</template>

<script>
import api from '../../api'
import commonTable from '../../components/securityInformation/commonTable'
export default {
  components: {
    commonTable
  },
  data () {
    //这里存放数据
    return {
      type: 'hxjg',// hxtg
      show: false,
      pageNum: 1,
      total: 0,
      loading: false,
      finished: false,
      keyword: '',
      areaObj: {},
      columns: [], //picker数组
      list: []
    };
  },
  computed: {},
  methods: {
    onConfirm (e) {
      this.keyword = e
      this.clearStatus()
      this.getList()
    },
    clearStatus (clearKeyword = false) {
      this.show = false
      this.pageNum = 1
      this.finished = false
      this.total = 0
      this.list = []
      if (clearKeyword) {
        this.keyword = ''
      }
    },
    getPicker () {
      let datas = this.ls.get(`airPicker`)
      if (datas) {
        this.calcData(datas)
      } else {
        api.queryWeatherArea().then(res => {

          if (res.code === 10000) {
            this.ls.set(`airPicker`, res.datas)
            this.calcData(res.datas)

          } else {
            this.toast(res.msg)
          }
        })
      }
    },
    calcData (datas) {

      this.columns = Object.entries(datas).map(item => item[1])

      let obj = {}
      Object.entries(datas).map(item => obj[item[1]] = item[0])
      this.areaObj = obj
    },
    onLoadList () {
      this.pageNum++
      this.getList()
    },
    getList (pageNum = this.pageNum) {

      let { areaObj, keyword } = this

      let params = {
        weatherOrigin: areaObj[keyword],
        page: pageNum,
        pageSize: 15
      }
      api.queryWeather(params).then(res => {
        this.loading = false
        if (res.code === 10000) {
          let { currentPage, list, totalCount, totalPage } = res.datas
          let temp = list.map(item => ({
            title: item.weatherTitle,
            content: item.weatherContent,
            releaseTime: item.weatherDate
          }))
          this.list = this.currentPage === 1 ? temp : [...this.list, ...temp]
          this.pageNum = currentPage
          this.total = totalCount


          if (pageNum === totalPage) {
            this.finished = true
          }

        } else {
          this.list = []
          this.pageNum = 1
          this.total = 0
          this.toast(res.msg)
        }
      })
    },
    clickItem (item) {
      let { title, content } = item
      this.ls.set('routeParams', {
        title, content
      })

      this.$router.push({
        name: 'airDetail',
      })

    }
  },
  created () {

    this.getPicker()
    this.clearStatus(true)

  },
  mounted () {

  },
  activated () {


  },
  beforeDestroy () { },
  destroyed () { },

}
</script>
<style lang='scss' scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #f5f8fa;
  color: #333;
  .picker {
    display: flex;
    align-items: center;

    font-size: 30px;
    line-height: 90px;
    background: #fff;
    padding: 0 30px;
    .icondidianshaixuan {
      font-size: 40px;
      color: #cfdae6;
      margin-right: 10px;
    }
  }
}
</style>