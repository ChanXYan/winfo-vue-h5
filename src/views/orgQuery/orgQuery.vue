
<template>
  <div class="container">
    <van-tabs class="tabs" v-model="active" color="#0176FF" title-active-color="#0176FF">
      <van-tab title="服务/外派机构"></van-tab>
      <van-tab title="体检机构"></van-tab>
      <van-tab title="培训机构"></van-tab>
    </van-tabs>

    <div v-if="active === 0" class="content">
      <div class="list">
        <div class="item">
          <span>机构名称</span>
          <div class="value">
            <van-field v-model="org" placeholder="请输入机构名称" />
          </div>
        </div>
        <div class="item">
          <span>许可资质</span>
          <div class="value" @click="show= true">
            {{keyword ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>
        <div class="item">
          <span>所在省份</span>
          <div class="value" @click="showProvince= true">
            {{keyword ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>

        <div class="item">
          <div class="value"></div>
        </div>
      </div>
      <van-button class="query-btn" type="primary">查询</van-button>
    </div>

    <div v-if="active === 1" class="content">2</div>
    <div v-if="active === 2" class="content">3</div>
    <!-- 资质picker -->
    <van-popup v-model="show" position="bottom">
      <van-picker title show-toolbar :columns="columns" @confirm="onConfirm" @cancel="show=false" />
    </van-popup>
    <!-- 省份 -->
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    //这里存放数据
    return {
      active: 0,
      show: false,
      showProvince: false,
      loading: false,
      finished: false,
      org: '',
      keyword: '',
      orgNameObj: {},
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'], //picker数组

    };
  },
  computed: {},
  methods: {
    onConfirm () {

    }



  },
  created () {


  },
  watch: {

  },
  mounted () {

  },
  activated () {


  },
  beforeDestroy () { },
  destroyed () { },

}
</script>
<style lang='less' scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #fff;
  color: #333;
  font-size: 24px;
  .content {
    border-top: 20px solid #f5f7fa;
    .list {
      padding: 0 30px;
      .item {
        display: flex;
        line-height: 88px;
        color: #666;
        font-size: 24px;
        border-bottom: 1px solid #f5f7fa;
        > span {
          width: 180px;
        }
        .value {
          line-height: 88px;
          text-align: right;
          flex: 1;
        }
      }
    }
  }
  .query-btn {
    width: 690px;
    height: 80px;
    background: #0176ff;
    border-radius: 6px;
    margin: 60px 30px;
  }

  .van-field {
    height: 100%;
  }
  /deep/ .van-field__control {
    text-align: right;
  }

  .iconcheck {
    color: #0176ff;
  }
}

/deep/ .van-field__body {
  height: 100%;
}
</style>