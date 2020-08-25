const env = process.env.NODE_ENV // 'development' production

const apiUrlObj = {
  development: 'https://m.winfo.pub/sz',
  production: 'https://m.winfo.pub/sz'
}
const preUrl = '/api'
const baseUrl = apiUrlObj[env] + preUrl

const downloadUrl =
  'https://m.winfo.pub/sz/service-ftp/ftp/downLoad?fileUuid='
const viewUrl = 'https://m.winfo.pub/sz/service-ftp/ftp/view?fileUuid='

export { baseUrl, downloadUrl, viewUrl, preUrl }
