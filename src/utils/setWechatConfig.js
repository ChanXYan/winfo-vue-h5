/*
 * @Author: angentle
 * @Date: 2020-08-28 09:37:22
 */

import api from '../api'

let wx = window.wx
const setWechatConfig = (url, callback) => {


  if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
    // 判断是微信的话再做
    api.getUrlConfig({
      url
    }).then(res => {
      console.log(res)
      if (res.code === 200) {
        let { appId, timestamp, nonceStr, signature } = res.data

        wx.config({
          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          debug: true, //!!!
          // 必填，公众号的唯一标识
          appId,
          // 必填，生成签名的时间戳
          timestamp,
          // 必填，生成签名的随机串
          nonceStr,
          // 必填，签名
          signature,
          // 必填，需要使用的JS接口列表
          jsApiList: [
            'hideOptionMenu',
            'hideMenuItems',
            'showMenuItems',
            'updateAppMessageShareData',
            'updateTimelineShareData'
          ]
        })
        callback && callback()

      }
    })

    // wx.error(function (res) {
    //   window.toast('调用分享功能失败' + res)
    // })
    // wx.ready(function () {
    //   // 隐藏分享功能
    //   wx.hideMenuItems({
    //     menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:QZone', 'menuItem:share:qq']
    //   })
    // })
  }
}


export default setWechatConfig