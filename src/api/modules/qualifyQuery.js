import service from '../service'
import { preUrl, msaUrl } from '../config'

export default {
  // 资质查询获取字典（考试类型、船员类型）
  getExamDict (data) {
    return service.get(`${preUrl}rest/basics-program/maritime/getExamDict`, data)
  },
  // 船员证书查询
  getCrewCert (data) {
    return service.post(`${preUrl}rest/basics-program/maritime/getCrewCert`, data)
  },
  // 船员考试成绩查询
  getCrewExam (data) {
    return service.post(`${preUrl}rest/basics-program/maritime/getCrewExam`, data)
  },
  // 考试科目
  ueryExamSubjList (data) {
    return service.get(`${msaUrl}qry/queryExamSubjList.action`, data)
  },
  // 适任考试计划查询
  getExamPlan (data) {
    return service.post(`${preUrl}rest/basics-program/maritime/getExamPlan`, data)
  },
  // 适任考试详情
  getExamPlanDetail (id) {
    return service.get(`${preUrl}rest/basics-program/maritime/getExamPlanDetail/${id}`)
  },
  // 免考考生公示查询
  getExamPublic (data) {
    return service.post(`${preUrl}rest/basics-program/maritime/getExamPublic`, data)
  },
  //免考考生公示详情
  getExamPublicDetail (id) {
    return service.get(`${preUrl}rest/basics-program/maritime/getExamPublicDetail/${id}`)
  },
  // 验船师考场考区查询
  getExamRoomPublic () {
    return service.get(`${preUrl}rest/basics-program/maritime/getExamRoomPublic`)
  }
}
