
/**
 * 设置cookie
 * @param {*} name 
 * @param {*} value 
 * @param {*} day 
 */
export const setCookie = (name, value, day) => {
  if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    let expires = day * 24 * 60 * 60 * 1000;
    let date = new Date(+new Date() + expires);
    document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
  } else {
    document.cookie = name + "=" + escape(value);
  }
};

/**
* 获取对应名称的cookie
* @param name cookie的名称
* @returns {null} 不存在时，返回null
*/
// export const getCookie = (name) => {
//   let arr;
//   let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//   if (arr === document.cookie.match(reg))
//     return unescape(arr[2]);
//   else
//     return null;
// };