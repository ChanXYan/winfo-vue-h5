import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '首页' },
    component: Home
  },
  {
    path: "/checkReportDetail",
    name: 'checkReportDetail',
    meta: { title: '报告查询详情' },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/checkReport/checkReportDetail.vue')
  }, {
    path: "/checkReportSearch",
    name: "checkReportSearch",
    meta: { title: '报告查询' },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/checkReport/checkReportSearch.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // debugger
  window.document.title = to.meta.title === undefined ? 'Winfo H5' : to.meta.title
  if (to.path !== from.path) {
    // NProgress.start() //进度条加载
  }

  // 处理keepAlive页面缓存的 副作用
  let toDepth = to.path.split('/').length
  let fromDepth = from.path.split('/').length
  if (toDepth < fromDepth) {
    // console.log('back...')
    from.meta.keepAlive = false
    to.meta.keepAlive = true
  }

  next()
})

router.afterEach(() => {
  // NProgress.done() //进度条结束
})

export default router
