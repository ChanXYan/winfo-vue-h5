<template>
  <div class="commonTable">
    <div class="total">共{{total}}条数据</div>
    <div v-if="list&&list.length !== 0" class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div
          class="item"
          @click="clickItem(item)"
          v-for="(item,index) in list"
          :key="'item' + index"
        >
          <h1 class="title">{{item.title}}</h1>
          <div class="itemBottom">
            <div v-if="isShowSource" class="left">
              <span class="iconfont iconlaiyuan"></span>
              {{item.releaseSource}}
            </div>
            <div class="right">
              <span class="iconfont iconfaxianshijian"></span>
              {{item.releaseTime}}
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <empty v-else msg="暂无数据" />
  </div>
</template>
<script>
import empty from '../../components/empty'
export default {
  components: {
    empty
  },
  props: {
    list: Array,
    isShowSource: Boolean,
    total: Number,
    loading: Boolean,
    finished: Boolean,
  },
  data () {
    return {
      // loading: false,
      // finished: false,
      // page: this.pageNum,//请求第几页
      // pageSize: 10,//每页请求的数量
    }
  },
  methods: {
    //滚动加载时触发，list组件定义的方法
    onLoad () {
      this.$emit('onLoadList')
    },
    clickItem (item) {
      this.$emit('clickItem', item)
    }
  }
};
</script>

<style scoped lang="less">
.commonTable {
  padding: 0 30px;
  background: #f5f8fa;

  .total {
    font-size: 24px;
    line-height: 60px;
  }

  .list {
    .item {
      position: relative;
      background: #fff;
      padding: 20px 20px 10px;
      border-radius: 6px;
      margin-bottom: 20px;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 6px;
        height: 50px;
        background: @defaultColor;
      }

      > h1 {
        font-size: 30px;
        color: #000;
        line-height: 45px;
      }

      .itemBottom {
        line-height: 60px;
        display: flex;
        color: #666;
        font-size: 24px;

        .left {
          flex: 1;
        }

        .right {
          flex: 1;
          text-align: right;
        }
      }
    }
  }

  .iconfont {
    color: @iconColor;
    margin-right: 10px;
  }
}
</style>