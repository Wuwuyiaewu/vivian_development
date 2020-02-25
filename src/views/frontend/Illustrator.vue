<template>
  <div>
    <loading :active.sync="isLoading" />
    <Alert />
    <div class="container">
      <nav
        aria-label="breadcrumb"
        class="row"
      >
        <ol class="breadcrumb col-12">
          <router-link
            to="/"
            class="breadcrumb-item breadcrumb-link"
          >
            首頁
          </router-link>
          <router-link
            to="/gallery"
            class="breadcrumb-item breadcrumb-link"
          >
            畫廊
          </router-link>
          <li
            class="breadcrumb-item active"
            aria-current="page"
          >
            作品
          </li>
        </ol>
      </nav>
    </div>
    <div class="container border-primary-dark border">
      <div class="row">
        <div class="col-md-6 col-sm-12 p-3">
          <zoom-on-hover
            :img-normal="product.image"
            class="img-fluid zoom"
            :scale="1"
          />
        </div>
        <div class="col-md-6 col-sm-12 p-3">
          <h6>
            <strong>- {{ product.title }} -</strong>
          </h6>
          <p>{{ product.description }}</p>
          <div class="row align-items-center">
            <div class="col-6 text-center">
              <p class="font-size">
                數量 -
              </p>
            </div>
            <div class="col-6">
              <p>
                <button
                  @click="changeNum(-1)"
                  class="productControl"
                  :class="{'show':buttonShow}"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="angle-left"
                    class="svg-inline--fa btn-primary-light fa-angle-left fa-w-8"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512"
                  >
                    <path
                      fill="currentColor"
                      d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  :value="productNum"
                  class="productText"
                >
                <button
                  @click="changeNum(1)"
                  class="productControl"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="angle-right"
                    class="btn btn-primary-light svg-inline--fa fa-angle-right fa-w-8 p-0"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512"
                  >
                    <path
                      fill="currentColor"
                      d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                    />
                  </svg>
                </button>
              </p>
            </div>
            <div class="col-6 text-center">
              <p class="font-size">
                價格 -
              </p>
            </div>
            <div class="col-6 text-left">
              <p class="font-size">
                {{ (productNum * product.price) | currency }}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <button
                type="submit"
                class="btn btn-primary-dark"
                @click="addToCart(product.id,productNum)"
              >
                加入購物車
              </button>
            </div>
            <div class="col-6">
              <button
                type="submit"
                class="btn btn-primary-dark"
                @click="addToCart_checkout(product.id,productNum)"
              >
                直接購買
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fa-angle-right,
.fa-angle-left {
  width: 50px;
  height: 50px;
}
.border {
  border: 2px solid #000 !important;
}
.font-size {
  font-size: 1.5rem;
}
.footer {
  position: absolute;
  bottom: 0;
}
.img-contain {
  display: flex;
  width: 300px;
}
.zoom:hover {
  cursor: crosshair;
}
.productText {
  padding: 5px;
  border: 1px solid #000;
  border-radius: 4px;
  width: 60px;
  margin: 0 15px;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
}
.productControl {
  vertical-align: top;
  border: 0;
  border-radius: 4px;
  padding: 0;
}
.show {
  opacity: 0;
  visibility: hidden;
}
</style>

<script>
export default {
  data() {
    return {
      product: [],
      id: "",
      cart: [],
      productNum: 1,
      isLoading: false
    };
  },
  computed: {
    buttonShow() {
      if (this.productNum < 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    idDetect() {
      const vm = this;
      vm.id = vm.$route.params.Illid;
    },
    changeNum(num) {
      this.productNum += num;
    },
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/product/${vm.id}`;
      vm.axios.get(url).then(res => {
        vm.product = res.data.product;
        vm.product.num = 1;
      });
    },
    addToCart(id, qty) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`;
      let cart = {
        product_id: `${id}`,
        qty: `${qty}`
      };
      vm.isLoading = true;
      vm.axios.post(url, { data: cart }).then(res => {
        if (res.data.success) {
          vm.$bus.$emit("message:push", "加入成功", "success");
          vm.$bus.$emit("cartUpdate");
          vm.isLoading = false;
        }
      });
    },
    addToCart_checkout(id, qty) {
      const vm = this;
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`;
      let cart = {
        product_id: `${id}`,
        qty: `${qty}`
      };
      vm.axios.post(url, { data: cart }).then(res => {
        if (res.data.success) {
          vm.$bus.$emit("cartUpdate");
          vm.$router.push(`/checkout`);
        }
      });
    }
  },
  created() {
    this.idDetect();
    this.getCart();
  }
};
</script>