<!-- picker 查询弹窗封装 -->
<template>
  <van-overlay :show="show" @click="onclose">
    <div class="query-picker" @click.stop>
      <div class="wrapper-box">
        <div class="btns">
          <div class="cancel" @click="onclose">取消</div>
          <div class="sure" @click="onComfirm">确定</div>
        </div>

        <div v-if="type===1">
          <van-search class="my-search" v-model="keyword" shape="round" placeholder="请输入关键字" />
          <div class="listWrap">
            <div class="list">
              <div
                v-for="(item,index) in list"
                :key="'item'+index"
                class="item"
                @click="clickItem(item)"
              >
                <p>{{item.label}}</p>
                <span v-if="picks.includes(item.value)" class="iconfont iconcheck"></span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="type===2">
          <!-- <van-search class="my-search" v-model="keyword" shape="round" placeholder="请输入关键字" /> -->
          <div class="lists">
            <div class="list" v-for="(item,index) in list" :key="'item'+index">
              <p>{{item.title}}</p>
              <div
                v-for="(o,index) in item.list"
                :key="'o'+index"
                class="item"
                @click="clickItem(o)"
              >
                <p>{{o.label}}</p>
                <span v-if="picks.includes(o.value)" class="iconfont iconcheck"></span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="type===3">
          <div class="list">
            <div
              v-for="(item,index) in list"
              :key="'item'+index"
              class="item"
              @click="clickItem(item)"
            >
              <p>{{item.label}}</p>
              <span v-if="picks.includes(item.value)" class="iconfont iconcheck"></span>
            </div>
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
    list: Array, // 2:[{title,list:[{label,value}]}] 3:[{label,value}]
    values: Array,// []已选择的数组
    type: Number, // 1:（选择器 1维度数组） 2:（选择器单选 2维度数组） 3 :（多选 1维度数组）
  },
  data () {
    return {
      keyword: '',
      picks: [...this.values]
    };
  },
  computed: {},
  watch: {
    values: {
      handler (val, oldVal) {
        console.log(val, oldVal)
      }
    }
  },
  methods: {
    clickItem (item) {

      let { value } = item

      let flag = this.picks.findIndex(item => item === value)

      switch (this.type) {
        case 1:
          if (flag === -1) {
            this.picks = [value]
          } else {
            this.picks = []
          }
          break
        case 2:
          if (flag === -1) {
            this.picks = [value]
          } else {
            this.picks = []
          }
          break
        case 3:
          if (flag === -1) {
            this.picks.push(value)
          } else {
            this.picks.splice(flag, 1)
          }
          break
      }


    },
    onComfirm () {
      this.$emit('onComfirm', this.picks)
      this.$emit('close')
    },
    onclose () {
      this.picks = [...this.values]
      this.$emit('close')
    }
  },
  created () {

  },
  mounted () {

  },
  activated () {
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
.query-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);

  .wrapper-box {
    position: fixed;
    width: 100vw;
    // height: 85vh;
    min-height: 40vh;
    max-height: 85vh;
    background: #fff;
    bottom: 0;
    padding: 0 30px;
    font-size: 30px;

    .list {
      height: 100%;
      width: 100%;
      // overflow: auto;
      > p {
        font-size: 24px;
        margin: 0 15px;
        line-height: 80px;
        border-bottom: 1px solid #eee;
      }
      .item {
        display: flex;
        line-height: 88px;
        margin-left: 30px;
        padding-right: 30px;
        border-bottom: 1px solid #eee;
        > p {
          flex: 1;
        }
      }
    }

    .btns {
      display: flex;
      align-items: center;
      padding: 0 30px;
      border-bottom: 1px solid #eee;
      > div {
        flex: 1;
        line-height: 80px;
        font-size: 30px;
      }
      .sure {
        text-align: right;
        color: #0176ff;
      }
      .cancel {
        color: #999999;
      }
    }
  }
  .iconcheck {
    color: #0176ff;
  }
  /deep/ .my-search {
    // width: 95vw;
    // height: 68px;
    // line-height: 68px;
    // margin: 20px auto 30px;
    // border-radius: 68px;
    // padding: 0 10px;
    // font-size: 30px;
    // background: #f0f4f5;
  }
}
</style>