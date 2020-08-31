<!-- picker 查询弹窗封装 -->
<template>
  <van-overlay :show="show" @click="show = false">
    <div class="query-picker" @click.stop>
      <div class="wrapper-box">
        <div class="cancel" @click="show = false">取消</div>
        <van-search class="my-search" v-model="keyword" shape="round" placeholder="请输入关键字" />
        <p>海船船员培训项目</p>
        <div class="list">
          <div v-for="(item,index) in columns" :key="'item'+index" class="item">
            <p>{{item}}</p>
            <span class="iconfont iconcheck"></span>
          </div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>

export default {
  components: {},
  props: {
    show: Boolean,
    list: Array,
    type: String, // single double
  },
  data () {
    //这里存放数据
    return {

    };
  },
  computed: {},
  watch: {},
  methods: {

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
.query-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  .wrapper-box {
    position: fixed;
    width: 100vw;
    height: 85vh;
    background: #fff;
    bottom: 0;
    padding: 0 30px;
    font-size: 30px;
    > .list {
      .item {
        display: flex;
        line-height: 88px;
        border-bottom: 1px solid #eee;
        > p {
          flex: 1;
        }
      }
    }
    .cancel {
      height: 80px;
      line-height: 80px;
      padding: 0 30px;
      font-size: 30px;
      font-weight: 400;
      color: #999999;
    }
  }
  /deep/ .my-search {
    width: 95vw;
    height: 68px;
    margin: 20px auto 30px;
    border-radius: 68px;
    padding: 0 10px;
    font-size: 30px;
    background: #f0f4f5;
  }
}
</style>