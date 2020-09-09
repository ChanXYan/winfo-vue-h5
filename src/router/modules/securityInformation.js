
export default [{
  path: "/airInfo",
  name: "airInfo",
  meta: { title: '气象信息', keepAlive: true, },
  component: () =>
    import(/* webpackChunkName: "about" */ '@/views/securityInformation/airInfo.vue')
},
{
  path: "/airDetail",
  name: "airDetail",
  meta: { title: '气象详情', keepAlive: true, },
  component: () =>
    import(/* webpackChunkName: "about" */ '@/views/securityInformation/airDetail.vue')
}, {
  path: "/navWarning/:type",
  name: "navWarning",
  meta: {
    title: '航行警告',
    keepAlive: true,
  },
  component: () =>
    import(/* webpackChunkName: "about" */ '@/views//securityInformation/navWarning.vue')
},
{
  path: "/navWarningDetail",
  name: "navWarningDetail",
  meta: { title: '航行警告详情', keepAlive: true, },
  component: () =>
    import(/* webpackChunkName: "about" */ '@/views//securityInformation/navWarningDetail.vue')
},]