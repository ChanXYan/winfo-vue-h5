<!-- 气象信息 -->
<template>
  <div class="container">
    <div class="top">
      <div class="title">{{title}}</div>
    </div>
    <div class="content">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>


export default {

  data () {

    return {
      content: "",
      title: '',

    };
  },
  computed: {},
  watch: {},
  methods: {


  },
  activated () {

    let { content, title } = this.ls.get('routeParams')

    this.content = content
    this.title = title

  },
  mounted () {

  },

  destroyed () { },
}
</script>
<style lang='less' scoped>
.container {
  background: #f5f8fa;
  min-height: 100vh;

  .tr {
    text-align: right;
  }

  .top {
    background: #fff;
    padding: 25px 30px;

    .title {
      width: 100%;
      font-size: 36px;
      color: #000;
      line-height: 50px;
      font-weight: 900;
    }

    .items {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    .item {
      display: flex;
      margin-right: 30px;
      line-height: 50px;
      font-size: 24px;
      align-items: center;

      > span {
        color: @fc9;
      }

      > p {
        color: @fc3;
      }
    }
    .item:nth-child(2n + 2) {
      margin: 0;
    }
  }

  .time {
    width: 100% !important;
  }

  .content {
    background: #fff;
    padding: 30px;
    font-size: 30px;
    border-top: 10px solid #f5f8fa;
    line-height: 50px;

    > div {
      word-break: break-word;
    }
  }
}
</style>