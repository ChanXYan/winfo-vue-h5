<!-- 机构查询 -->
<template>
  <div class="container">
    <van-tabs class="tabs" v-model="active" color="#0176FF" title-active-color="#0176FF">
      <van-tab title="服务/外派机构">
        <div class="content">
          <div class="list">
            <div class="item">
              <span>机构名称</span>
              <van-field class="value" v-model="value" placeholder="请输入机构名称" />
            </div>
            <div class="item">
              <span>许可资质</span>
              <div class="picker" @click="show= true">
                {{keyword ||'请选择'}}
                <span class="iconfont icondown ml10"></span>
              </div>
            </div>
            <div class="item">
              <span>所在省份</span>
              <div class="value"></div>
            </div>

            <div class="item">
              <div class="value"></div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="体检机构">
        <div class="content">2</div>
      </van-tab>
      <van-tab title="培训机构">
        <div class="content">3</div>
      </van-tab>
    </van-tabs>
    <van-popup v-model="show" position="bottom">
      <van-picker title show-toolbar :columns="columns" @confirm="onConfirm" @cancel="show=false" />
    </van-popup>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    //这里存放数据
    return {
      active: 0,
      show: true,
      keyword: '',
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
    };
  },
  computed: {},
  watch: {},
  methods: {
    onConfirm (value, index) {
      this.toast(`当前值：${value}, 当前索引：${index}`);
    },
    onChange (picker, value, index) {
      this.toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel () {
      this.toast('取消');
    },
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
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  .content {
    border-top: 20px solid #f5f7fa;

    .list {
      padding: 0 30px;
      .item {
        display: flex;
        line-height: 88px;
        color: #666;
        font-size: 24px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        > span {
          width: 180px;
        }
        .value {
          line-height: 88px;
          height: 88px;
          text-align: right;
          flex: 1;
          background: transparent;
        }
      }
    }
  }

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

  /deep/ .van-tabs__line {
    width: 7vw !important;
    height: 2px;
  }

  /deep/ .van-field__control {
    text-align: right;
  }
}
</style>