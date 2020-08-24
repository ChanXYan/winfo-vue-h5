import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import storage from './storage/storage'

// vant 按需加载
import './utils/vantImport'
import 'lib-flexible/flexible' // px2rem适配
import './rem'

//引入iconfont
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false

// 已经封装过的localStorage
window.ls = new storage()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
