<template>
  <div class="item">
    <span>{{title}}</span>
    <div class="value field-tip">
      <van-field
        class="tip-field"
        v-model="keyword"
        :placeholder="placeholder"
        @focus="isFocus=true"
        @click="handleTip"
      />
      <div class="tip-warp">
        <div class="tip-item" v-for="i in matchingOrg" :key="i" @click="tapTip(i)">{{i}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "autocomplete",
  props: {
    title: String,
    value: String,
    placeholder: String,
    tipList: Array,
  },
  data () {
    return {
      isFocus: false,
      keyword: ''
    }
  },
  watch: {
    value () {
      this.keyword = this.value
    },
    keyword () {
      this.$emit('input', this.keyword)
    }
  },
  computed: {
    matchingOrg () {
      if (!this.isFocus || !this.keyword.length || !this.tipList.length) return []
      return this.tipList.filter(e => e.includes(this.keyword))
    }
  },
  methods: {
    tapTip (str) {
      this.keyword = str
      this.isFocus = false
    },
    tipListener (e) {
      if (e.target.className !== 'tip-item'
      ) {
        this.isFocus = false
      }
    },
    handleTip (e) {
      e.stopPropagation()
    }
  },
  mounted () {
    document.addEventListener('click', this.tipListener)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.tipListener)
  },
}
</script>

<style lang="less" scoped>
.item {
  position: relative;
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

    &.checkbox {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &.verif {
      display: flex;
      .verif-img {
        width: 189px;
        height: 68px;
        align-self: center;
      }
    }

    &.field-tip {
      > .tip-warp {
        z-index: 1;
        position: absolute;
        top: 94px;
        left: 0;
        width: 100%;
        max-height: 360px;
        background: #ffffff;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        overflow: hidden;
        overflow-y: scroll;

        > .tip-item {
          text-align: left;
          padding-left: 22px;
          margin: 0 20px;
          height: 88px;
          width: calc(100%-40px);
          border-bottom: 1px solid #f5f7fa;
        }
      }
    }
  }

  .van-field {
    height: 100%;
  }
  /deep/ .van-field__control {
    text-align: right;
  }
}
</style>
