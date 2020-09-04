### 搭建安装

```
// px2rem
yarn add postcss-pxtorem -D
yarn add lib-flexible -D
// 具体配置参考
// https://blog.csdn.net/qq_42750581/article/details/82836649
```

```
// UI框架
yarn add vant
```


#### 处理跨域问题
https://www.cnblogs.com/xudaxian/p/12610463.html


#### 有关keep-alive处理页面缓存
https://zhuanlan.zhihu.com/p/96740001

关于在路由中配置keepAlive 为 `true`的页面中
出现修改代码热更新时 页面出现空白，刷新后正常显示（暂时不影响页面使用，但是开发体验不好）

https://github.com/vuejs/vue-loader/issues/1332 [官方bug]

```
//打包后出现如下问题
 The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
app (278 KiB)
      assets/css/chunk-vendors.16d3ed6e.css
      assets/js/chunk-vendors.dcf28d29.js
      assets/css/app.5119bb1d.css
      assets/js/app.687b6ae0.js
```

解决方案：
// 在vue.config.js中配置
```
configureWebpack: {
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  }
```

//关于使用params 参数丢失的问题
https://blog.csdn.net/weixin_42054155/article/details/105498783

一方面因为 路由传的参数过多 不喜欢用query的方式
但是不用query 使用params进行传参会有一个问题 - 即页面回退后参数有丢失情况，
那么解决方法有2种 一种是用localStorage存储传参，另一种是用query。
综上， 我选择第一种， 且localStorage 已经是封装好的，不需要进行JSON转换。


```
yarn add vue-lazyload -D
```

#### 在项目中使用mockjs vs 本地搭建node + mockjs serve

| 对比                                   | 项目mockjs     | node+mockjs      |
| -------------------------------------- | ---------------------------------- | ------------------------------------------------ |
| 是否需要配置webpack                    | 不需要                             | 小程序不需要，（h5等需要处理跨域的站点都要配置） |
| 搭建难度                               | 简单                               | 较简单                                           |                                            |
| 是否可看到网络请求                     | 不可                               | 可                                               |
| 是否根据接口参数，修改对应接口返回数据 | 不可                               | 可                                               |
| 项目代码量                             | 增加（特别不适合放在小程序项目中） | 不增加                                           |

#### 关于路由2种方式的调用

##### hash
默认是hash 访问路径中会带有#
不需要做什么配置，可以直接放置服务器上调用

如需要域名后面加前缀 
只需要在 `index.html`
加入 
```
<meta base="/h5/">
```

##### history
路径是没有#的
具体服务配置时需要注意的 参考[官方文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

前端需要做的配置 
1. 在`vue.config.js`中配置
```
 publicPath: process.env.NODE_ENV === 'production' ? '/h5/' : '/',
```

2. 在路由中配置
```
const router = new VueRouter({
  mode: 'history', 
  base: process.env.BASE_URL, //加上这句
  routes
})

```



关于全局less配置
参考地址 https://www.jianshu.com/p/43d0637fe5e3

前面我们已经在`App.vue`中引入了 common.less(包含了reset.less 和 variables.less)了,
但是在`components`下使用并不能生效

因此需要对less进行单独的webpack配置 使它能在components中调用

```
vue add style-resources-loader

```
// 选择less 将会在vue.config.js中生成如下代码

```
 pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/style/common.less') // 这个地方自行配置
      ]
    }
  }
```


#### h5 与小程序之间的交互 分享

特别⚠️
1. `bindmessage` 这个方法的并不是实时的，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。

因此，在本项目中，不会使用该方式与小程序之间进行数据交互。
 
2. 原先考虑用jssdk的`updateAppMessageShareData`,但是这个方法只适用于公众号里的h5， 也就是网页右上角的分享给朋友和分享到朋友圈，并没有办法点击按钮，触发分享朋友的功能提示。所以排除。（但是因为已经做过这方面的探索，所以这部分的代码保留提交，后续的提交会删除这块内容）

3. 使用小程序页面嵌套H5，点击h5中的分享页面，跳转单独的小程序页面，里面有遮罩（提示用户右上角分享朋友圈）。 这种方法可以实现参数传递，但是涉及到参数传递和数据转换的地方太多了，容易绕晕，且不符合可持续发展路线。
例子：在小程序中。A-> B-> S
A:（list页面，h5）
B: (list点击进去的详情页面, h5)
S: (引导用户点击右上角...,分享给朋友,weapp)

B页面（需要对参数进行处理）传给S页面，S页面经过参数处理，分享出去（带着参数）

而被分享的用户，进入分享地址，B页面读取页面上的参数

4. 通告`onShareAppMessage`的options获取完整的h5路径，h5的参数必须通过`query`的方式
```
  onShareAppMessage (options) {
   // options.webViewUrl  // 获取完整h5地址
   // this.$router.path // 获取小程序路由

   //通过拼接 可以实现分享链接的地址
  }
```

最后，选择第四种方式去处理这些问题。



#### 小程序分享h5页面过程

在h5要分享的页面，路径传参需根据query，查询具体数据信息
在小程序中，需注意 编码和解码 分享的url路径，否则`?`以及`?`后面的内容将丢失。
`
//在小程序中
  onShareAppMessage (options) {

    // 注意路径中的url需要编码
    return {
      title: '报告查询',
      path: `${this.$router.path}?url=${encodeURIComponent(options.webViewUrl)}`,
      imageUrl: require("../imgs/share-img.png")
    }
  }

  componentDidShow () {

    let { url } = this.$router.params

    url && this.setState({
      url: decodeURIComponent(url) //解码
    })


  render () {
      let { url } = this.state

      return (
        <View>
          <WebView src={url || 'http://192.168.1.205:8080/checkReportSearch'}></WebView>
        </View>
      );
    }
  }

`

注意⚠️
全局样式 可能会导致与vant样式冲突

因此 要根据需要的vant样式 对全局样式进行细小的改动

keep-alive生命周期

##### 使用keep-alive的页面
```
// 进入页面
beforeCreate
created
beforeMount
mounted
activated

//离开页面
deactivated
beforeDestroy
destroyed
```

##### 不使用keep-alive的页面

// 进入页面
beforeCreate
created
beforeMount
mounted

//离开页面
beforeDestroy
destroyed