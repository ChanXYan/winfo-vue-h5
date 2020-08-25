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

export default router
