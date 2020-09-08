import service from '../service'
import { preUrl } from '../config'

export default {
  // 资质查询获取字典
  getExamDict (data) {
    return service.get(`${preUrl}rest/basics-program/maritime/getExamDict`, data)
  },
  // 船员考试成绩查询
  getCrewExam (data) {
    return service.post(`${preUrl}rest/basics-program/maritime/getCrewExam`, data)
  }
}
