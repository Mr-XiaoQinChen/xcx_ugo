// 如何封装一个插件
// 本js文件导出一个函数：
export default function(Vue) {
// vue 原型上挂载函数
// 这样的话vue实例对象上就能访问这个函数了
  const baseUrl = 'https://api-ugo-web.itheima.net';
  Vue.prototype.request = async function(opts) {
    const { url } = opts
    // 添加loading 效果
    uni.showLoading({
      title: "加载中"
    });

    const [err,res] = await uni.request({
      url:baseUrl + url
    })
    // 请求完成的时候,取消loading效果
    uni.hideLoading();

    return res.data.message
  }
}