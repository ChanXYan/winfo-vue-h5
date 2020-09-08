import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
    meta: { title: '报告查询详情', keepAlive: true, },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/checkReport/checkReportDetail.vue')
  },
  {
    path: "/checkReportSearch",
    name: "checkReportSearch",
    meta: { title: '报告查询', keepAlive: true, },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/checkReport/checkReportSearch.vue')
  },
  {
    path: "/airInfo",
    name: "airInfo",
    meta: { title: '气象信息', keepAlive: true, },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/securityInformation/airInfo.vue')
  },
  {
    path: "/airDetail",
    name: "airDetail",
    meta: { title: '气象详情', keepAlive: true, },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/securityInformation/airDetail.vue')
  },
  {
    path: "/navWarning/:type",
    name: "navWarning",
    meta: {
      title: '航行警告',
      keepAlive: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/securityInformation/navWarning.vue')
  },
  {
    path: "/navWarningDetail",
    name: "navWarningDetail",
    meta: { title: '航行警告详情', keepAlive: true, },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/securityInformation/navWarningDetail.vue')
  },
  {
    path: "/test",
    name: "test", //!!!!
    meta: { title: '航行警告详情' },
    component: () => import('../views/orgQuery/test.vue')
  },
  {
    path: "/orgQuery",
    name: "orgQuery",
    meta: { title: '机构查询', keepAlive: false, },
    component: () => import('../views/orgQuery/orgQuery.vue')
  },
  {
    path: "/orgList",
    name: "orgList",
    meta: { title: '机构查询' },
    component: () => import('../views/orgQuery/orgList.vue')
  },
  {
    path: "/qualifyQuery",
    name: "qualifyQuery",
    meta: { title: '资质查询', keepAlive: true, },
    component: () => import('../views/qualifyQuery/index.vue')
  },
  {
    path: "/showPdf",
    name: "showPdf",
    meta: { title: '资质查询', keepAlive: true, },
    component: () => import('../views/qualifyQuery/showPdf.vue')
  },
  {
    path: "/examineeDetail",
    name: "examineeDetail",
    meta: { title: '免考考生查询' },
    component: () => import('../views/qualifyQuery/examineeDetail.vue')
  },
  {
    path: "/crewCertificate",
    name: "crewCertificate",
    meta: { title: '船员证书', keepAlive: true, },
    component: () => import('../views/qualifyQuery/crewCertificate.vue')
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
  document.title = to.meta.title === undefined ? 'Winfo H5' : to.meta.title
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
