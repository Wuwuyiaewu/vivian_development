<template>
  <div>
    <div class="container">
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
      }
    };
  },
  computed: {
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
  }
};
</script>