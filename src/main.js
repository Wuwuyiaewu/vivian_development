import Vue from 'vue'
import App from './App.vue'
import router from "./router";
// alert
import Alert from "./components/Alert.vue";
Vue.component("Alert", Alert);
import Favor from "./components/Favor.vue";
Vue.component("Favor", Favor);
// zoom
import ZoomOnHover from "vue-zoom-on-hover";
Vue.use(ZoomOnHover);
// backtotop
import BackToTop from "vue-backtotop";
Vue.use(BackToTop);
// swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
// require styles
import "swiper/dist/css/swiper.css";
// swiper
Vue.use(VueAwesomeSwiper /* { default global options } */);
// loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.component("Loading", Loading)
// currencyfilter
import FilterPrice from './DataFilter/currencyFilter'
Vue.filter('currency', FilterPrice)
// validate
import {
  ValidationProvider,
  ValidationObserver,
  extend
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/zh_TW.json';  
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], 
    message: messages[rule] 
  });
});
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);


// event bus
import './bus'
Vue.config.productionTip = false
// axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
import "bootstrap";


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
        next();
      } else {
        next({ path: "/login" });
      }
    });
  } else {
    next();
  }
});