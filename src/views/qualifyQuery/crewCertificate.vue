<!-- 1船员证书 2船员成绩 详情 -->
<template>
  <div class="container">
    <div class="list" v-if="type===1">
      <van-divider
        class="line"
        :style="{ color: '#B2B2B2', borderColor: '#DBDBDB', padding: '0 16px' }"
      >合格证</van-divider>
      <div
        v-for="(item,index) in info.hgz"
        :key="'hgz'+index"
        @click="clickItem(item)"
        class="item"
      >
        <div class="top">{{item.title}}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>姓名：</span>
              <div class="value">{{item.idcard}}</div>
            </div>
            <div class="item">
              <span>身份证号码：</span>
              <div class="value">{{item.level}}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
      <van-divider
        class="line"
        :style="{ color: '#B2B2B2', borderColor: '#DBDBDB', padding: '0 16px',marginTop:'-10px' }"
      >合格证项目</van-divider>
      <div
        v-for="(item,index) in info.hgzxm"
        :key="'item'+index"
        @click="clickItem(item)"
        class="item"
      >
        <div class="top">{{item.title}}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>签发机关：</span>
              <div class="value">{{item.idcard}}</div>
            </div>
            <div class="item">
              <span>签发日期：</span>
              <div class="value">{{item.level}}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
    </div>
    <div class="list" v-if="type===2">
      <van-divider
        class="line"
        :style="{ color: '#B2B2B2', borderColor: '#DBDBDB', padding: '0 16px' }"
      >合格证考试成绩</van-divider>
      <div
        v-for="(item,index) in info.hgz"
        :key="'hgz'+index"
        @click="clickItem(item)"
        class="item"
      >
        <div class="top">{{item.title}}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>考试科目：</span>
              <div class="value">{{item.idcard}}</div>
            </div>
            <div class="item">
              <span>考试成绩：</span>
              <div class="value">{{item.level}}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
      <van-divider
        class="line"
        :style="{ color: '#B2B2B2', borderColor: '#DBDBDB', padding: '0 16px',marginTop:'-10px' }"
      >适任考试成绩</van-divider>
      <div
        v-for="(item,index) in info.hgzxm"
        :key="'item'+index"
        @click="clickItem(item)"
        class="item"
      >
        <div class="top">{{item.title}}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>考试科目：</span>
              <div class="value">{{item.idcard}}</div>
            </div>
            <div class="item">
              <span>考试成绩：</span>
              <div class="value">{{item.level}}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
    </div>
    <alertDetail :type="7" :show="showDetail" @close="showDetail=false"></alertDetail>
  </div>
</template>

<script>
import alertDetail from '../../components/orgQuery/alertDetail'

export default {
  components: {
    alertDetail,
  },
  data () {
    //这里存放数据
    return {
      showDetail: false,
      type: 1,
      info: {
        hgz: [{
          title: 'PKB201501626',
          name: '4502****1610',
          idcard: 'A',
        }, {
          title: 'PKB201501626',
          name: '4502****1610',
          idcard: 'B',
        }, {
          title: 'PKB201501626',
          name: '4502****1610',
          idcard: 'B',
        }],
        hgzxm: [{
          title: 'PKB201501626',
          name: '4502****1610',
          idcard: 'A',
        }, {
          title: '精通救生艇筏和救助艇培训',
          org: '深圳海事局',
          time: '2020-03-18',
        }]
      }
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
    this.type = +this.$route.query.type
  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
}
</script>
<style lang='less' scoped>
.container {
  background: #f5f8fa;
  overflow: hidden;
  .line {
    font-size: 24px;
  }
  .list {
    padding: 0 15px;
    > .item {
      width: 720px;
      height: 230px;
      padding: 0 15px;
      background: #ffffff;
      box-shadow: 0px 2px 8px 0px rgba(5, 60, 113, 0.2);
      border-radius: 8px;
      margin-bottom: 30px;
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

  .van-divider {
    margin: 0;
  }
}
</style>