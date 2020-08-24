import service from '../service'
import { baseUrl } from '../config'

export default {
  // fsc
  flagStateControlQuery (data) {
    return service.get(
      `${baseUrl}/sz-mini-program/nationReport/flagStateControlQuery`, data
    )
  },
  // 现场监督
  siteSupervisionQuery (data) {
    return service.get(`${baseUrl}/sz-mini-program/nationReport/siteSupervisionQuery`, data)
  },
  // 历史记录
  searchHistory () {
    return service.get(`${baseUrl}/sz-mini-program/nationReport/searchHistory`)
  }
}
