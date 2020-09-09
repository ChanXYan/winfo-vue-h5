import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let modules = []
const modulesFiles = require.context('./modules', false, /\.js$/)

modulesFiles.keys().map(item => {
  modules = [...modules, ...modulesFiles(item).default]
})

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '首页' },
    component: Home
  },
  ...modules,
  {
    path: "/test",
    name: "test", //!!!!
    meta: { title: '航行警告详情' },
    component: () => import('../views/orgQuery/test.vue')
  },
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "about" */ '../components/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history', // 默认时hash 但是路径会有# 
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title === undefined ? '' : to.meta.title
  if (to.path !== from.path) {
    NProgress.start() //进度条加载
  }

  // 处理keepAlive页面缓存的 副作用
  // let toDepth = to.path.split('/').length
  // let fromDepth = from.path.split('/').length

  // if (toDepth < fromDepth) {
  //   // console.log('back...')
  //   from.meta.keepAlive = false
  //   to.meta.keepAlive = true
  // }

  next()
})

router.afterEach(() => {
  NProgress.done() //进度条结束
})

export default router
