import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 在main.js引入 使用 elementui 
import ElementUI from 'element-ui'; // 组件
import 'element-ui/lib/theme-chalk/index.css'; // 样式
Vue.use(ElementUI);

import Echarts from 'echarts';
// import 'echarts.min.js';
// Vue.use(Echarts);
Vue.prototype.$echarts = Echarts;


// 引入阿里icon
import '@/assets/font/iconfont.css';



Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
