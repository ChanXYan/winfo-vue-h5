export default [
  {
    path: "/qualifyQuery",
    name: "qualifyQuery",
    meta: { title: '资质查询', keepAlive: true, },
    component: () => import('@/views/qualifyQuery/index.vue')
  },
  {
    path: "/showPdf",
    name: "showPdf",
    meta: { title: '资质查询', keepAlive: true, },
    component: () => import('@/views/qualifyQuery/showPdf.vue')
  },
  {
    path: "/exemption",
    name: "exemption",
    meta: { title: '免考考生查询', keepAlive: true, },
    component: () => import('@/views/qualifyQuery/exemption.vue')
  },
  {
    path: "/crewCertificate",
    name: "crewCertificate",
    meta: { title: '船员证书', keepAlive: true, },
    component: () => import('@/views/qualifyQuery/crewCertificate.vue')
  },
  {
    path: "/crewScore",
    name: "crewScore",
    meta: { title: '船员成绩', keepAlive: true, },
    component: () => import('@/views/qualifyQuery/crewScore.vue')
  },
  {
    path: "/examPlan",
    name: "examPlan",
    meta: { title: '适任考试计划', keepAlive: true, },
    component: () => import('@/views/qualifyQuery/examPlan.vue')
  }

]