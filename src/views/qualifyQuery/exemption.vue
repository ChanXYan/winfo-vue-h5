<!-- 验船师免考考生公示 不分页-->
<template>
  <div class="container">
    <div class="list">
      <div v-for="(item,index) in list" :key="'item'+index" @click="clickItem(item)" class="item">
        <div class="top">{{item.name}}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>身份证号：</span>
              <div class="value">{{item.idCardNo}}</div>
            </div>
            <div class="item">
              <span>报考等级：</span>
              <div class="value">{{item.level}}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
    </div>
    <alertDetail :type="4" :info="info" :show="showDetail" @close="showDetail=false"></alertDetail>
  </div>
</template>

<script>
import api from '../../api'
import alertDetail from '../../components/orgQuery/alertDetail'
export default {
  components: {
    alertDetail
  },
  data () {
    //这里存放数据
    return {
      showDetail: false,
      list: [],
      info: {}
    };
  },
  computed: {},
  watch: {},
  methods: {
    clickItem (item) {

      api.getExamPublicDetail(item.id).then(res => {
        if (res.code === 10000) {
          let o = res.datas
          this.info = { ...o, orgName: o.name }
          this.showDetail = true
        } else {
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
    this.list = this.ls.get('ExamPublic')
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