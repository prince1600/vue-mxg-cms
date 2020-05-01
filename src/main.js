import Vue from "vue";
//引入Vue后引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入App前引入ElementUI
import App from "./App.vue";
import router from "./router";
import './permission'

Vue.use(ElementUI);
//是否发送完整的报错信息（建议生产环境true）
Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router, //添加路由
  render: h => h(App) //渲染根组件App
}).$mount("#app");
