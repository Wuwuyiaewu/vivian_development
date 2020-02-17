import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from "../views/Home.vue";
import Gallery from "../views/Gallery.vue";
import Illustrator from "../views/Illustrator.vue"
import Checkout from "../views/Checkout.vue"
import Dashboard from "../views/admin/Dashboard.vue"
import Product from "../views/admin/Product.vue"
import Order from "../views/admin/Order.vue"
import Login from "../views/admin/Login.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children:[
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
        component: Checkout,
        props:true
      },
      {
        path: "/illustrator/:Illid",
        name: "illustrator",
        component: Illustrator,
        props: true
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      },
    ]
  },
  // 後台
  {
    path: "/Admin",
    name: "dashboard",
    component: Dashboard,
    children:[
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
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];
const router = new VueRouter({
  routes
})

export default router
