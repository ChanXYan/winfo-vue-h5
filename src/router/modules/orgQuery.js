export default [{
  path: "/orgQuery",
  name: "orgQuery",
  meta: { title: '机构查询', keepAlive: false, },
  component: () => import('@/views//orgQuery/orgQuery.vue')
},
{
  path: "/orgList",
  name: "orgList",
  meta: { title: '机构查询' },
  component: () => import('@/views//orgQuery/orgList.vue')
},]