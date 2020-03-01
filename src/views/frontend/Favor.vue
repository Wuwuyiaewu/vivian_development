<template>
  <div>
    <loading :active.sync="isLoading" />

    <div class="container pt-5">
      <p v-if="DreamFilter.length === 0">
        還沒有收藏項目，或許你想看看我們的
        <router-link
          to="/gallery"
          class="text-secondary-light"
        >
          畫廊
        </router-link>
      </p>
      <div class="row">
        <div
          class="col-xl-2 col-lg-3 col-md-4 mb-2 position-relative pt-5"
          v-for="item in DreamFilter"
          :key="item.id"
          @click="change(item.id)"
        >
          <div class="img_box bg-primary">
            <img
              :src="item.image"
              alt
              class="img-fluid"
            >
            <div class="content">
              <h6>{{ item.title }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.img_box {
  cursor: pointer;
  transform: skewY(-5deg);
  transition: all 0.3s;
  &::before {
    content: "";
    position: absolute;
    top: -15px;
    left: 0;
    width: 100%;
    height: 15px;
    background: #d9d2d7;
    transform-origin: bottom;
    transform: skewX(45deg);
    transition: all 0.3s;
  }
  &::after {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
    width: 15px;
    height: 100%;
    background: #707070;
    transform-origin: left;
    transform: skewY(45deg);
    transition: all 0.3s;
  }
  &:hover {
    transform: translateY(-40px);
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 60px;
    background: #d9d2d7;
  }
}
</style>

<script>
export default {
  props: {
    wishlist: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      product: [],
      isLoading: false
    };
  },
  computed: {
    DreamFilter() {
      return this.product.filter(el => {
        return this.wishlist.indexOf(el.id) !== -1;
      });
    }
  },
  methods: {
    allProduct() {
      const vm = this;
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products/all`;
      // 啟動loading
      vm.isLoading = true;
      vm.axios.get(API).then(res => {
        vm.product = res.data.products;
        // 關閉loading
        vm.isLoading = false;
      });
    },
    change(id) {
      const vm = this;
      vm.$router.push(`/illustrator/${id}`);
    }
  },
  created() {
    const vm = this;
    vm.allProduct();
    console.log(this.wishlist);
  }
};
</script>