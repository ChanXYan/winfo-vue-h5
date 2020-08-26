import Mock from 'mockjs'
import { mockSuccess } from './mockUtils'
// import global from './modules/global'
import checkReport from './modules/checkReport'

Mock.setup({
  timeout: '500'
})

// const Random = Mock.Random

const preUrl = process.env.VUE_APP_API_PREFIX

Mock.mock(`${preUrl}sz-mini-program/nationReport/siteSupervisionQuery`,
  mockSuccess(checkReport.siteSupervisionQuery()))

Mock.mock(`${preUrl}sz-mini-program/nationReport/flagStateControlQuery`,
  mockSuccess(checkReport.flagStateControlQuery()))








// 用户数据 原始mock 封装后同上
// const userData = () => {

//   let users = []
//   for (let i = 0; i < 10; i++) {
//     let user = {
//       'id': i + 1,
//       'date': Random.date('yyyy-MM-dd'),
//       'name': Random.cname(),
//       'address': Mock.mock('@county(true)'),
//       'phone': Mock.mock(/^1[0-9]{10}$/),
//       'status': Random.integer(0, 1)
//     }
//     users.push(user)
//   }
//   return users
// }
// Mock.mock(`${preUrl}/yyy/users`, 'get', userData)

export default Mock