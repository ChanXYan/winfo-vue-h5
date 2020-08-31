
<template>
  <div class="container">
    <div class="picker" @click="show= true">
      <span class="iconfont icondidianshaixuan"></span>
      {{keyword ||'请选择'}}
      <span class="iconfont icondown ml10"></span>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker title show-toolbar :columns="columns" @confirm="onConfirm" @cancel="show=false" />
    </van-popup>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    //这里存放数据
    return {

      show: false,

      loading: false,
      finished: false,
      keyword: '',
      orgNameObj: {},
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'], //picker数组

    };
  },
  computed: {},
  methods: {




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
<style lang='scss' scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #f5f8fa;
  color: #333;
  // .picker {
  //   display: flex;
  //   align-items: center;
  //   font-size: 30px;
  //   line-height: 90px;
  //   background: #fff;
  //   padding: 0 30px;
  //   .icondidianshaixuan {
  //     font-size: 40px;
  //     color: #cfdae6;
  //     margin-right: 10px;
  //   }
  // }
}
</style>