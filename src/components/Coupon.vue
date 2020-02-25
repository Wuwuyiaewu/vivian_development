<template>
  <div>
    <div class="container">
      <section class="mt-5 row">
        <div class="col-12">
          <p class="text-center">
            輸入信箱取得最新作品資訊與優惠碼
          </p>
        </div>
        <swiper
          :options="swiperOption"
          ref="mySwiper"
          class="col-10"
        >
          <!-- slides -->
          <swiper-slide>
            <img
              src="../assets/pic/Cream_3.jpg"
              alt
              class="img-fluid"
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/donut_2.jpg"
              alt
              class="img-fluid"
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/eggroll_1.jpg"
              alt
              class="img-fluid"
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/lovely_gradu_1.jpg"
              alt
              class="img-fluid"
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/pipe_1.jpg"
              alt
              class="img-fluid"
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/winecandy_1.jpg"
              alt
              class="img-fluid"
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/carrot_3.jpg"
              alt
              class="img-fluid"
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/pic/milktea_1.jpg"
              alt
              class="img-fluid"
            >
          </swiper-slide>
          <!-- Optional controls -->
          <div
            class="swiper-scrollbar"
            slot="scrollbar"
          />
        </swiper>
      </section>
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
      >
        <form
          class="row mt-5"
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
                v-model="couponText"
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
.validate-error {
  transform: translate(0, 60px);
}
</style>

<script>
export default {
  data() {
    return {
      typeEmail: "",
      couponText: null,
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
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    emails() {
      this.couponText = "Vivian_illustrator";
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