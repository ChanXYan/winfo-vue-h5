
const preUrl = process.env.VUE_APP_API_PREFIX
const baseUrl = process.env.VUE_APP_SERVE_UR
const msaUrl = process.env.VUE_APP_API_MSA_PREFIX

const downloadUrl =
  'https://m.winfo.pub/sz/service-ftp/ftp/downLoad?fileUuid='
const viewUrl = 'https://m.winfo.pub/sz/service-ftp/ftp/view?fileUuid='

export { baseUrl, downloadUrl, viewUrl, preUrl, msaUrl }
