<template>
  <div>
    <div class="home d-none d-sm-none d-md-block animate">
      <section class="mt-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 col-md-4" />
            <div class="col-lg-3 col-sm-5 col-md-4">
              <p>shop anywhere</p>
            </div>
            <div class="col-lg-3 col-sm-5 col-md-4">
              get here
            </div>
            <div class="col-1 col-md-0" />
          </div>
          <div class="row">
            <div class="col-sm-0 col-md-4 col-lg-5" />
            <div class="col-sm-12 col-md-8 col-lg-7">
              <h2>warming illustrator</h2>
            </div>
          </div>
        </div>
      </section>
      <section class="w-100 home_bg_1">
        <div class="w-100" />
      </section>
      <Coupon />

      <!-- coupon -->
    </div>
    <div class="home d-sm-block d-md-none">
      <div class="container">
        <div class="row mt-4 u-r-marging-8">
          <div class="col-6 u-padding-8 mb-2">
            <img
              src="/src/assets/pic/Mouse_3.jpg"
              alt
              class="img-fluid"
            >
          </div>
          <div class="col-6 u-padding-8">
            <img
              src="/src/assets/pic/carrot_1.jpg"
              alt
              class="img-fluid"
            >
          </div>
          <div class="col-6 u-padding-8 mb-2">
            <img
              src="/src/assets/pic/Cream_1.jpg"
              alt
              class="img-fluid"
            >
          </div>
          <div class="col-6 u-padding-8">
            <img
              src="/src/assets/pic/Muffin_3.jpg"
              alt
              class="img-fluid"
            >
          </div>
          <div class="col-6 u-padding-8 mb-2">
            <img
              src="/src/assets/pic/donut_3.jpg"
              alt
              class="img-fluid"
            >
          </div>
          <div class="col-6 u-padding-8">
            <img
              src="/src/assets/pic/Rainbow_1.jpg"
              alt
              class="img-fluid"
            >
          </div>
          <div class="col-6 u-padding-8 mb-2">
            <img
              src="/src/assets/pic/Meringue_1.jpg"
              alt
              class="img-fluid"
            >
          </div>
          <div class="col-6 u-padding-8">
            <img
              src="/src/assets/pic/cofe_3.jpg"
              alt
              class="img-fluid"
            >
          </div>
        </div>
      </div>
      <!-- coupon -->
      <Coupon />
    </div>
    <footer class="footer mt-auto py-3 bg-primary-light">
      <div class="container">
        <span class="text-muted">
          @2020 CopyRight 本站僅作品練習，圖資來源為個人創作，如需使用請聯繫作者
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import Coupon from "@/components/Coupon";
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {},
  components: {
    Coupon
  },
  methods: {}
};
</script>
