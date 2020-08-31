<!-- 机构查询列表 -->
<template>
  <div class="container">
    <div class="list">
      <div v-for="(item,index) in list" :key="'item'+index" @click="clickItem(item)" class="item">
        <div class="top">{{item.title}}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>联系人：</span>
              <div class="value">{{item.person}}</div>
            </div>
            <div class="item">
              <span>联系电话：</span>
              <div class="value">{{item.phone}}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    //这里存放数据
    return {
      list: [{
        title: '深圳中海船员管理有限公司',
        person: '李管理',
        phone: '13520312412',
      }, {
        title: '深圳中海船员管理有限公司',
        person: '李管理',
        phone: '13520312412',
      }, {
        title: '深圳中海船员管理有限公司',
        person: '李管理',
        phone: '13520312412',
      }]
    };
  },
  computed: {},
  watch: {},
  methods: {
    clickItem (item) {
      console.log(item)
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