<template>
  <div>
    <app-navbar
      class="sticky-top"
      :cartbag="cartbag"
      :show="cartshow"
      @cart-control="parent_cartcontrol"
    />
    <router-view
      class="animate"
      :class="{'push':cartfolder}"
      :wishlist="wishid"
    />
    <app-mask :cart="cartfolder" />
    <app-cart
      :cart="cartfolder"
      :cartbag="cartbag"
    />
  </div>
</template>

<style lang="scss">
.home_bg_1 {
  div {
    background-image: url("/assets/pic/heading.jpg");
    background-size: cover;
    background-position: center;
    height: 300px;
  }
}
body {
  overflow-x: hidden;
}
.animate {
  transition: margin-left 0.3s;
}
.push {
  margin-left: 300px;
}
</style>
<script>
import Navbar from "@/components/Navbar.vue";
import Mask from "@/components/Mask.vue";
import Cart from "@/components/Cart.vue";
export default {
  name: "Home",
  data() {
    return {
      cartshow: true,
      cartfolder: false,
      cartbag: [],
      wishid: []
    };
  },
  components: {
    "app-navbar": Navbar,
    "app-mask": Mask,
    "app-cart": Cart
  },
  methods: {
    parent_cartcontrol() {
      this.cartfolder = !this.cartfolder;
    },
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`;
      vm.axios.get(url).then(res => {
        vm.cartbag = res.data.data.carts;
        console.log(res.data.data)
      });
    },
    wishSet(itemid) {
      if (this.wishid.includes(itemid)) {
        this.wishid.splice(this.wishid.indexOf(itemid), 1);
        this.$bus.$emit("message:push", "取消收藏", "secondary");
      } else {
        this.wishid.push(itemid);
        this.$bus.$emit("message:push", "加入收藏", "primary-light");
      }
    }
  },
  created() {
    this.$bus.$on("cartUpdate", () => {
      this.getCart();
    });
    this.$bus.$on("wishPic", itemid => {
      this.wishSet(itemid);
    });
  }
};
</script>
