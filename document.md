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

