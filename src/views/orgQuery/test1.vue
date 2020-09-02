<!--  -->
<template>
  <div class>
    <button @click="show=true;">打开遮罩</button>

    <section class="wmassageMask" v-show="show" @click="eventMask($event)">
      <div class="mask" ref="msk">
        <p class="wenziP">文字留言</p>
        <p class="yuyinP">语音留言</p>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    //这里存放数据
    return {
      show: false
    };
  },
  computed: {},
  watch: {
    show: function (val) {
      if (val) {
        let body = document.body
        body.style.overflow = 'hidden'
      }
    }
  },
  methods: {
    eventMask (ev) {
      if (!this.$refs.msk.contains(ev.target)) {
        this.show = false;
      }
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
.wmassageMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
  .mask {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }
  p {
    text-align: center;
    font-size: 0.768rem;
    line-height: 1;
    margin: 1.365333rem auto;
    font-weight: 500;
  }
}
</style>