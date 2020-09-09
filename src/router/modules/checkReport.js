export default [{
  path: "/checkReportDetail",
  name: 'checkReportDetail',
  meta: { title: '报告查询详情', keepAlive: true, },
  component: () =>
    import(/* webpackChunkName: "about" */ '@/views/checkReport/checkReportDetail.vue')
},
{
  path: "/checkReportSearch",
  name: "checkReportSearch",
  meta: { title: '报告查询', keepAlive: true, },
  component: () =>
    import(/* webpackChunkName: "about" */ '@/views/checkReport/checkReportSearch.vue')
},]