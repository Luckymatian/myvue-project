import axios from 'axios'
// 将axios封装为vue的插件
var myaxios={}
// 挂载一个方法：install
myaxios.install=function(Vue){
    // 统一设置请求路径
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
    // 将axios挂载到vue构造器中
    Vue.prototype.$http=axios 
}
export default myaxios