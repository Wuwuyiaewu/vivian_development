import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/frontend/Index.vue";
import Home from "@/views/frontend/Home.vue";
import Gallery from "@/views/frontend/Gallery.vue";
import Favor from "@/views/frontend/Favor.vue"
import Illustrator from "@/views/frontend/Illustrator.vue";
import Checkout from "@/views/frontend/Checkout.vue";
import Customorder from "@/views/frontend/Customorder.vue";
import Dashboard from "@/views/backend/Dashboard.vue"
import Coupon from "@/views/backend/Coupon.vue";
import Product from "@/views/backend/Product.vue"
import Order from "@/views/backend/Order.vue"
import Login from "@/views/backend/Login.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/gallery",
        name: "gallery",
        component: Gallery
      },
      {
        path: "/checkout",
        name: "checkout",
        component: Checkout
      },
      {
        path: "/customorder/:orderId",
        name: "customorder",
        component: Customorder
      },
      {
        path: "/illustrator/:Illid",
        name: "illustrator",
        component: Illustrator
      },
      {
        path: "/favor",
        name: "favor",
        component: Favor
      },
      {
        path: "/login",
        name: "login",
        component: Login
      }
    ]
  },
  // 後台
  {
    path: "/Admin",
    name: "dashboard",
    component: Dashboard,
    children: [
      {
        path: "products",
        name: "products",
        component: Product,
        meta: { requiredUser: true }
      },
      {
        path: "order",
        name: "order",
        component: Order,
        meta: { requiredUser: true }
      },
      {
        path: "coupon",
        name: "coupon",
        component: Coupon,
        meta: { requiredUser: true }
      }
    ]
  }
];
const router = new VueRouter({
  routes
})

export default router
