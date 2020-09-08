import service from '../service'
import { preUrl } from '../config'


export default {
  // fsc
  flagStateControlQuery (data, config = {}) {
    return service.get(
      `${preUrl}sz/sz-mini-program/nationReport/flagStateControlQuery`, data, {}, true, {
      timeout: 60000,
      ...config
    })
  },
  // 现场监督
  siteSupervisionQuery (data, config = {}) {
    return service.get(`${preUrl}sz/sz-mini-program/nationReport/siteSupervisionQuery`, data, {}, true, {
      timeout: 60000,
      ...config
    })
  },
  // 历史记录
  searchHistory () {
    return service.get(`${preUrl}sz/sz-mini-program/nationReport/searchHistory`)
  },
  // 删除历史记录
  deleteHistory () {
    return service.delete(`${preUrl}sz/sz-mini-program/report/deleteHistory`)
  },
  shareFlagStateControl (data) {
    return service.get(`${preUrl}sz/sz-mini-program/nationReport/shareFlagStateControl`, data, {}, true, {
      timeout: 60000
    })
  },
  shareSiteSupervision (data) {
    return service.get(`${preUrl}sz/sz-mini-program/nationReport/shareSiteSupervision`, data, {}, true, {
      timeout: 60000
    })
  }
  // test () {
  //   return service.get(`${preUrl}/yyy/users`)
  // }
}
