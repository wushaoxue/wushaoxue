import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入全局样式
import "./assets/css/base.less"
// 导入 饿了吗
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import router from "../router/router"

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
