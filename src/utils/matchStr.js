/**
 * 正则表达式
 */

const phoneMatch = /^1\d{10}$/

// 密码验证 只允许纯数字|纯字母 | 数字字母组合
const passwordMatch = /^[a-zA-Z0-9]{1,23}$/

const idCardMatch = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

//不允许特殊字符
const usernameMatch = /^[A-Za-z0-9\u4e00-\u9fa5]+$/

// 图片格式校验
const imgMatch = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/

// 视频格式校验
const videoMatch = /(.*)\.(mp4)$/

//至少一个汉字，且汉字开头
const charMatch = /^[\u4e00-\u9fa5]/


export { phoneMatch, idCardMatch, passwordMatch, usernameMatch, imgMatch, charMatch, videoMatch }
