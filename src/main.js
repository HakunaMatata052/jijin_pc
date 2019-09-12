import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";

// 全局样式
import "@/common/styles/base.css"; // 样式初始化
import "@/common/styles/mixin.less";

import "@/assets/fonts/iconfont.css"; //引入图标

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as method from "@/common/js/mixin.js"; // 引入全局方法
import API from "@/server/apis.js"; // 引入api接口

// 全局引入公用方法，也可以在组件中单独引入，推荐在组件中单独引入。
Vue.prototype.$METHOD = method;

Vue.prototype.$SERVER = API;

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
