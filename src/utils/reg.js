/**
 * 表单自定义验证--正则
 */
// 账户名： 匹配中文，英文字母和数字  长度 4-10
export const REG_ACC = /[\u4e00-\u9fa5_a-zA-Z0-9]{4,10}/;

// 密码  ： 字母数字  长度 3-12位
export const REG_PWD = /^[a-zA-Z0-9]{3,12}$/;