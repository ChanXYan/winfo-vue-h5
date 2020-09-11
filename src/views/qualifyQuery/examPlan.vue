<!-- 适任考试计划 分页  -->
<template>
  <div class="container">
    <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item,index) in list" :key="'item'+index" @click="clickItem(item)" class="item">
        <div class="top">{{item.examNumber}}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>制定机构：</span>
              <div class="value">{{item.orgName}}</div>
            </div>
            <div class="item">
              <span>考试类型：</span>
              <div class="value">{{item.examType}}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
    </van-list>
    <alertDetail :type="5" :show="showDetail" :info="info" @close="showDetail=false"></alertDetail>
  </div>
</template>

<script>
import alertDetail from '../../components/orgQuery/alertDetail'

import api from '../../api'

export default {
  components: {
    alertDetail
  },
  data () {
    //这里存放数据
    return {
      loading: false,
      finished: false,
      type: 0,
      pageNum: 0,
      showDetail: false,
      info: {},
      param: {},
      list: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    clickItem (item) {
      api.getExamPlanDetail(item.id).then(res => {
        if (res.code === 10000) {
          this.showDetail = true
          let o = res.datas
          this.info = { ...o, org: o.orgName, orgName: o.examNumber }
        } else {
          this.toast(res.msg)
        }
      })

      // this.$dialog.alert({
      //   title: '',
      //   message: `未查询到符合条件的考试成绩信息，\r\n请确认查询条件是否正确`,
      //   confirmButtonColor: '#0176FF'
      // })
    },
    onLoad () {
      this.pageNum++
      this.getList()
    },
    getList (pageNum = this.pageNum) {

      let { param } = this
      param.page = pageNum
      api.getExamPlan(param).then(res => {
        this.loading = false
        if (res.code === 10000) {
          let { currentPage, list, totalCount, totalPage } = res.datas

          this.list = currentPage === 1 ? list : [...this.list, ...list]
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
    }
  },
  created () {

  },
  mounted () {

  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () {
    this.param = this.ls.get('examPlan')
    let { page } = this.param
    this.pageNum = page
    this.getList()
    this.finished = false
    this.loading = false
  },
}
</script>
<style lang='less' scoped>
.container {
  background: #f5f8fa;
  overflow: hidden;
  min-height: 100vh;
  .list {
    padding: 0 15px;
    > .item {
      width: 720px;
      height: 230px;
      padding: 0 15px;
      background: #ffffff;
      box-shadow: 0px 2px 8px 0px rgba(5, 60, 113, 0.2);
      border-radius: 8px;
      margin-top: 30px;
      .top {
        line-height: 94px;
        font-size: 36px;
        font-weight: bold;
        color: #000000;
        border-bottom: 1px solid #e6e6e6;
      }
      .content {
        display: flex;
        height: 135px;
        align-items: center;
        justify-content: center;
        .left {
          flex: 1;
        }
        .right {
          // flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          text-align: right;
          font-size: 24px;
          margin-right: 30px;
          height: 100%;
          color: #0176ff;
        }
        .item {
          display: flex;
          font-size: 24px;
          > span {
            color: #888888;
          }
        }
      }
    }
  }
}
</style>