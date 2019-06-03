// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/icon/iconfont.css";
import echarts from 'echarts';
import VueCookies from 'vue-cookies'
import globolContext from '@/api/globolContext'

Vue.config.productionTip = false;
Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.globolContext=globolContext;
Vue.prototype.loginControl = function (){
  let that=this;
  if(that.$cookies.get('username')){

  }else{
    that.$message.warning("登录过期，请先登录")
    that.$router.push({
      path: "/login"
    })
  }
}
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App),
  components: { App },
  template: "<App/>",
  beforeCreate () {
    Vue.prototype.sendbunkId = this;
  },
});
