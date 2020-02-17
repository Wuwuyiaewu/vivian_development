import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false
// axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
// axios
import "bootstrap";
// swiper
import "swiper/dist/css/swiper.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper /* { default global options } */);
// swiper

// fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);
// fontawesome
// 讓 axios 傳送資料順帶cookies 才可以驗證
axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


router.beforeEach((to, from, next) => {
  if (to.meta.requiredUser) {
    const API = `${process.env.VUE_APP_APIPATH}/api/user/check`;

    axios.post(API).then(res => {
      console.log(res.data);
      if (res.data.success) {
        // 驗證成功動作
        next();
      } else {
        // 驗證失敗動作
        next({ path: "/login" });
      }
    });
    // 如果去的地方沒有meta.requiredUser要求則直接去
  } else {
    next();
  }
});