<template>
  <div>
    <div class="container">
      <section class="mt-5 row d-none d-sm-none d-md-block">
        <swiper
          :options="swiperOption"
          ref="mySwiper"
          class="col-9"
        >
          <!-- slides -->
          <swiper-slide>
            <img
              src="../assets/pic/Cream_3.jpg"
              alt
              class="img-fluid"
            >
            <h6>甜筒</h6>
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/donut_2.jpg"
              alt
              class="img-fluid"
            >
            <h6>甜甜圈</h6>
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/eggroll_1.jpg"
              alt
              class="img-fluid"
            >
            <h6>蛋餅</h6>
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/lovely_gradu_1.jpg"
              alt
              class="img-fluid"
            >
            <h6>畢業</h6>
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/pipe_1.jpg"
              alt
              class="img-fluid"
            >
            <h6>樹莓派</h6>
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/winecandy_1.jpg"
              alt
              class="img-fluid"
            >
            <h6>蜜酒糖</h6>
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/carrot_3.jpg"
              alt
              class="img-fluid"
            >
            <h6>紅蘿蔔糕</h6>
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/milktea_1.jpg"
              alt
              class="img-fluid"
            >
            <h6>奶茶</h6>
          </swiper-slide>
          <!-- Optional controls -->
          <!-- <div
            class="swiper-scrollbar"
            slot="scrollbar"
          /> -->
        </swiper>
      </section>
      <div class="col-12 mt-5">
        <p class="text-center">
          輸入信箱取得最新作品資訊與優惠碼
        </p>
      </div>
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
      >
        <form
          class="row "
          @submit.prevent="emails"
        >
          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors }"
            class="col-md-6 col-sm-12 mb-4"
          >
            <div class="input-group">
              <input
                type="email"
                class="form-control"
                name="email"
                v-model="typeEmail"
                placeholder="請輸入 Email"
                required
              >
              <div class="text-right input-group-append">
                <button
                  class="btn btn-outline-secondary bg-secondary-dark text-white"
                  :disabled="invalid"
                >
                  送出
                </button>
              </div>
              <br>
              <span class="text-danger position-absolute validate-error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <div class="col-md-6 col-sm-12">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                id="couponText"
                v-model="couponText_discount"
              >
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  @click="copyTestingCode"
                >
                  複製
                </button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <!-- swiper -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-container{
  margin-left: 0;
}
.validate-error {
  transform: translate(0, 60px);
}
</style>

<script>
export default {
  data() {
    return {
      typeEmail: "",
      couponText_discount: null,
      form: {
        user: {
          email: ""
        }
      },
      swiperOption: {
        initialSlide: 0,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        grabCursor: true,
        slidesPerView: 4,
        spaceBetween: 20
      },
      scrollbarHide:true,
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    emails() {
      this.couponText_discount = "Vivian_illustrator";
    },
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#couponText");
      testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      testingCodeToCopy.select();
      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        alert("複製成功" + msg);
      } catch (err) {
        alert("複製失敗");
      }
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
  }
};
</script>