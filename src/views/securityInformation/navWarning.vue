
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
      :isShowSource="true"
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
      orgNameObj: {},
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
      let datas = this.ls.get(`${this.type}Picker`)
      if (datas) {
        this.calcData(datas)
      } else {
        api.queryOrg({ dataType: this.type }).then(res => {

          if (res.code === 10000) {
            this.ls.set(`${this.type}Picker`, res.datas)
            this.calcData(res.datas)

          } else {
            this.toast(res.msg)
          }
        })
      }
    },
    calcData (datas) {
      this.columns = datas.map(item => item.orgName)

      let obj = {}
      datas.map(item => {
        obj[item.orgName] = item
      })
      this.orgNameObj = obj
    },
    onLoadList () {
      this.pageNum++
      this.getList()
    },
    getList (pageNum = this.pageNum) {

      let { type, orgNameObj, keyword } = this

      let params = {
        dataType: type,
        orgGuid: orgNameObj[keyword].orgGuid,
        page: pageNum,
        pageSize: 15
      }
      api.sailNoticeQueryAll(params).then(res => {
        this.loading = false
        if (res.code === 10000) {
          let { currentPage, list, totalCount, totalPage } = res.datas

          this.list = this.currentPage === 1 ? list : [...this.list, ...list]
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
      let { content, releaseSource, releaseTime, title,
        releaseSymbol, orgName } = item
      this.ls.set('routeParams', {
        content, releaseSource, releaseTime, releaseSymbol,
        title, orgName
      })

      this.$router.push({
        name: 'navWarningDetail',
      })

    }
  },
  created () {
    // 1 航行警告
    // 2 航行通告
    let { type } = this.$route.params

    this.type = +type === 1 ? 'hxjg' : 'hxtg'
    this.getPicker()
    this.clearStatus(true)

  },
  watch: {
    $route (to, from) {
      if (to.name === 'navWarning' && from.name !== 'navWarningDetail') {
        // 不从详情进来的页面， 都是初始化参数
        let { type } = to.params
        this.type = +type === 1 ? 'hxjg' : 'hxtg'
        this.getPicker()
        this.clearStatus(true)
      }
    },
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