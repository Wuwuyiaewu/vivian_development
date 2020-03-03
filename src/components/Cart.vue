<template>
  <div
    class="navmenu bg-primary-light"
    :class="{'active':cart}"
  >
    <div class="container pt-5">
      <div
        class="row mt-3"
        v-for="item in cartbag"
        :key="item.id"
      >
        <div class="col-4">
          <img
            :src="item.product.image"
            alt
            class="img-fluid"
          >
        </div>
        <div
          class="col-3"
          style="font-size:8px"
        >
          <span>{{ item.product.title }}</span>
          <br>
          <span>{{ item.qty }} / pic</span>
        </div>
        <div
          class="col-3"
          style="font-size:8px"
        >
          <p>{{ item.product.price * item.qty }} $</p>
        </div>
        <div class="col-2">
          <button
            class="btn p-0"
            @click="removeCart(item.id)"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="trash"
              class="svg-inline--fa fa-trash fa-w-14 text-danger"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#FF6464"
                d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
              />
            </svg>
          </button>
        </div>
      </div>
      <hr
        v-if="cartbag.length !== 0"
        style="border-top:3px solid #707070;"
      >
      <div class="row mt-5">
        <div
          class="col-12"
          v-if="cartbag.length === 0"
        >
          <p>購物車內目前沒有商品</p>
        </div>
        <div
          class="col-12 text-right"
          v-else
        >
          <router-link
            class="btn btn-primary-dark"
            :to="{name:'checkout'}"
          >
            check out
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.navmenu {
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  width: 300px;
  height: 100%;
  overflow-y: auto;
  margin-left: -300px;
  transition: margin-left 0.3s;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.active.navmenu {
  margin-left: 0px;
}
</style>
<script>

export default {
  props: {
    cart: {
      type: Boolean
    },
    cartbag: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  components:{
  },
  data() {
    return {
      cartshow: !this.cart
    };
  },
  methods: {
    removeCart(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart/${id}`;
      vm.axios.delete(url).then(res => {
        if (res.data.success) {
          vm.$bus.$emit("cartUpdate");
          vm.$bus.$emit('message:push','刪除成功','secondary-dark');
        }
      });
    },
    goCheck() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/order`;
      vm.axios.post(url).then(() => {});
    }
  },
  created() {}
};
</script>