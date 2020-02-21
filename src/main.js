import Vue from 'vue'
import App from './App.vue'
import router from "./router";
// alert
import Alert from "./components/Alert.vue";
Vue.component("Alert", Alert);
// zoom
import ZoomOnHover from "vue-zoom-on-hover";
Vue.use(ZoomOnHover);
// zoom
// backtotop
import BackToTop from "vue-backtotop";
Vue.use(BackToTop);
// backtotop
// loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.component("Loading", Loading)
// loading
// currencyfilter
import FilterPrice from './DataFilter/currencyFilter'
Vue.filter('currency', FilterPrice)
// currencyfilter
// validate
// import 官方的元件 
import {
  ValidationProvider,
  ValidationObserver,
  extend
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
 
// 直接在messages部分導入你要的語言檔案就可以了
import { messages } from 'vee-validate/dist/locale/zh_TW.json';  
 
// 把預設的錯誤規則全部帶入 ( 也可以單獨帶入 )
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
});
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);


// event bus
import './bus'
// event bus
Vue.config.productionTip = false
// axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
// axios
// 讓 axios 傳送資料順帶cookies 才可以驗證
axios.defaults.withCredentials = true;
// 讓 axios 傳送資料順帶cookies 才可以驗證
import "bootstrap";
// swiper
// import "swiper/dist/css/swiper.css";
// import VueAwesomeSwiper from "vue-awesome-swiper";
// Vue.use(VueAwesomeSwiper /* { default global options } */);
// swiper



new Vue({
  router,
  render: h => h(App)
}).$mount("#app");


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