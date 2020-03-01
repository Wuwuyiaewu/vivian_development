<template>
  <div>
    <nav class="navbar navbar-expand-md bg-white">
      <router-link
        to="/"
        class="navbar-brand col-4 none-hover-class"
      >
        Vivian_illustrator
      </router-link>
      <button
        @click="clickshow = !clickshow"
        class="navbar-toggler"
        type="button"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="bars"
          class="svg-inline--fa fa-bars fa-w-14 text-primary"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
          />
        </svg>
      </button>
      <div class="col-8 d-none d-md-block">
        <ul class="navbar-nav row">
          <li class="col-2">
            <router-link
              to="/"
              exact-active-class="router-active"
            >
              首頁
            </router-link>
          </li>
          <li class="col-2">
            <router-link
              to="/gallery"
              active-class="router-active"
            >
              畫廊
            </router-link>
          </li>
          <li class="col-2">
            <router-link
              to="/favor"
              active-class="router-active"
            >
              收藏
            </router-link>
          </li>
          <li class="col-2" />
          <li class="col-1 position-relative">
            <button
              class="border-0 bg-white"
              @click="foldcart"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="shopping-cart"
                class="svg-inline--fa fa-shopping-cart fa-w-18 text-primary"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                />
              </svg>
              <span class="cartNum">{{ cartbag.length }}</span>
            </button>
          </li>
          <li class="col-1">
            <router-link to="/login">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="user"
                class="svg-inline--fa fa-user fa-w-14 text-primary"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                />
              </svg>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div
      class="navbar-collapse position-fixed bg-primary-light h-100 w-100"
      id="navbarSupportedContent"
      v-if="rwdshow & clickshow"
    >
      <div class="list-group text-center">
        <router-link
          to="/favor"
          class="list-group-item list-group-item-action bg-primary-light none-hover-class"
          @click.native="changeview"
        >
          收藏
        </router-link>
        <router-link
          to="/gallery"
          href="#"
          class="list-group-item list-group-item-action bg-primary-light none-hover-class"
          @click.native="changeview"
        >
          畫廊
        </router-link>
        <router-link
          to="/checkout"
          href="#"
          class="list-group-item list-group-item-action bg-primary-light none-hover-class"
          @click.native="changeview"
        >
          購物車
          <span style="font-size:0.75rem;">({{ cartbag.length }})</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cartNum {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 40px;
  width: 20px;
  height: 20px;
  font-size: 0.5rem;
  background: #d9d2d7;
  color: #707070;
  border-radius: 50%;
}
.navbar,
.navbar-collapse {
  z-index: 999;
}
.fa-shopping-cart,
.fa-bars,
.fa-user {
  width: 30px;
  height: 30px;
}
%before_line {
  content: "";
  position: absolute;
  background-color: #707070;
  top: 100%;
  left: 0;
  width: 100%;
  height: 3px;
}
a {
  text-decoration: none;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 100%;
    width: 0%;
    height: 3px;
    background: #000;
    transition: width 0.3s;
  }
  &:hover::before {
    width: 100%;
  }
}
.none-hover-class {
  &:hover::before {
    width: 0;
  }
}
.router-active {
  position: relative;
  font-weight: 900;
  color: #707070;
  &::before {
    @extend %before_line;
  }
}
</style>
<script>
export default {
  props: {
      cartbag:{
          type: Array,
          required: false,
          default: () => [],
      }
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      rwdshow: Boolean,
      clickshow: false,
      cartshow: true
    };
  },
  methods: {
    changeview() {
      const vm = this;
      vm.clickshow = false;
    },
    foldcart() {
      const vm = this;
      vm.$emit("cart-control");
      vm.$bus.$emit("cartUpdate");
    }
  },
  mounted() {
    // 紀錄寬度
    const vm = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        vm.screenWidth = window.screenWidth;
      })();
    };
    if (vm.screenWidth > 768) {
      vm.rwdshow = false;
    } else {
      vm.rwdshow = true;
    }
  },
  watch: {
    screenWidth(val) {
      // 為了避免頻繁觸發resize函式導致頁面卡頓，使用定時器
      if (!this.timer) {
        // 一旦監聽到的screenWidth值改變，就將其重新賦給data裡的screenWidth
        let vm = this;
        vm.timer = true;
        vm.screenWidth = val;
        setTimeout(function() {
          // 列印screenWidth變化的值
          vm.timer = false;
        }, 400);
        if (vm.screenWidth > 768) {
          vm.rwdshow = false;
        } else {
          vm.rwdshow = true;
        }
      }
    }
  },
  created() {}
};
</script>