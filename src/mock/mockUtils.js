export const mockSuccess = (param) => {
  return { code: 10000, datas: param, msg: '请求成功' }
}

export const mockError = (errCode) => {
  return { code: errCode, datas: null, msg: '请求失败' }
}