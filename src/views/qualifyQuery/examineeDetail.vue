<!-- 免考生详情 -->
<template>
  <div class="container">
    <div class="list">
      <div v-for="(item,index) in list" :key="'item'+index" @click="clickItem(item)" class="item">
        <div class="top">{{item.title}}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>身份证号：</span>
              <div class="value">{{item.idcard}}</div>
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
    <alertDetail :show="showDetail" @close="showDetail=false"></alertDetail>
  </div>
</template>

<script>
import alertDetail from '../../components/orgQuery/alertDetail'
export default {
  components: {
    alertDetail
  },
  data () {
    //这里存放数据
    return {
      showDetail: false,
      list: [{
        title: '韦日利',
        idcard: '4502****1610',
        level: 'A',
      }, {
        title: '韦日利',
        person: '4502****1610',
        phone: 'B',
      }, {
        title: '韦日利',
        person: '4502****1610',
        phone: 'B',
      }]
    };
  },
  computed: {},
  watch: {},
  methods: {
    clickItem (item) {
      console.log(item)
      this.showDetail = true
      // this.$dialog.alert({
      //   title: '',
      //   message: `未查询到符合条件的考试成绩信息，\r\n请确认查询条件是否正确`,
      //   confirmButtonColor: '#0176FF'
      // })
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
  activated () { },
}
</script>
<style lang='less' scoped>
.container {
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
          flex: 1;
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