<!-- 气象信息 -->
<template>
  <div class="container">
    <div class="top">
      <div class="title">{{title}}</div>
    </div>
    <div class="content">
      <div v-html="content"></div>
    </div>
    <div class="share">
      <van-button class="btn" type="primary" @click="share">主要按钮</van-button>
    </div>
  </div>
</template>

<script>
// import api from '../../api'
// import setWechatConfig from '../../utils/setWechatConfig'
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

    share () {
      let query = {
        id: 123,
        type: 'airInfo',
      }
      let url = '/packageD/airInfo/airInfo'


      window.wx && window.wx.miniProgram.navigateTo({ url: `/packageD/shareH5/shareH5?url=${JSON.stringify(url)}&query=${JSON.stringify(query)}` })

      // const callback = () => {
      //   let wx = window.wx
      //   wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
      //     wx.updateAppMessageShareData({
      //       title: '气象信息', // 分享标题
      //       desc: '气象信息描述', // 分享描述
      //       link: 'https://m.winfo.pub/h5/airDetail', //'http://192.168.1.115:8080/airDetail', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //       imgUrl: require('../../assets/imgs/no-data.png'), // 分享图标
      //       success: function () {
      //         // 设置成功
      //       }
      //     })
      //   });
      // }
      // setWechatConfig('https://m.winfo.pub/h5/airDetail', callback)

    }
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

  .share {
    .btn {
      width: 90%;
      margin-left: 5%;
      margin-top: 20px;
      margin-bottom: 30px;
    }
  }
}
</style>