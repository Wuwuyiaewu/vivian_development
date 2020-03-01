<template>
  <div>
    <div class="bg-right d-none d-sm-none d-md-block" />
    <div class="wave d-none d-sm-none d-md-block" />
    <div class="home d-none d-sm-none d-md-block">
      <section class="pt-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-sm-5 col-md-4">
              <p>shop anywhere</p>
            </div>
            <div class="col-lg-1 col-sm-4 col-md-1" />
            <div class="col-lg-3 col-sm-5 col-md-4">
              get here
            </div>
            <div class="col-1 col-md-0" />
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-10 col-lg-8">
              <h1>watercolor illustrator</h1>
              <br>
              <I>"It does not matter what material we use. We need the technique and we need the idea. And then we need the poetry, the love that transforms the material into a piece of art."</I>
              <br>
              <br>
              <P>比起我們創作藝術時的材料。</P>
              <P>更需要的是技術的潤滑、是創意塗抹、甚至需要詩歌的愛意，到了最後一刻，交融成藝術品。</P>
            </div>
          </div>
        </div>
      </section>
      <Coupon />
      <!-- coupon -->
    </div>
    <div class="home d-sm-block d-md-none">
      <div class="container">
        <div class="row mt-4 u-r-marging-8 ">
          <div class="col-6 u-padding-8 mb-2">
            <div class="first_img">
              <div class="img_text">
                <router-link to="/gallery" class="text-primary-dark">瀏覽水彩畫</router-link>
              </div>
            </div>
          </div>
          <div class="col-6 u-padding-8 mb-2">
            <img
              src="../../assets/pic/carrot_1.jpg"
              alt
              class="img-fluid"
            >
          </div>
          <div class="col-6 u-padding-8 mb-2">
            <img
              src="../../assets/pic/Cream_1.jpg"
              alt
              class="img-fluid"
            >
          </div>
          <div class="col-6 u-padding-8">
            <img
              src="../../assets/pic/Muffin_3.jpg"
              alt
              class="img-fluid"
            >
          </div>
          <div class="col-6 u-padding-8 mb-2">
            <img
              src="../../assets/pic/donut_3.jpg"
              alt
              class="img-fluid"
            >
          </div>
          <div class="col-6 u-padding-8 mb-2">
            <div class="second_img ">
              <div class="img_text">
                <router-link to="/favor" class="text-primary-dark">看看我的收藏</router-link>
              </div>
            </div>
          </div>
          <div class="col-6 u-padding-8 mb-2">
            <div class="three_img"></div>
          </div>
          <div class="col-6 u-padding-8 mb-2">
            <img
              src="../../assets/pic/cofe_3.jpg"
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
<style lang="scss" scoped>
.bg-right{
  background-image:url('../../assets/pic/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.first_img,.second_img,.three_img{
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  &::before{
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: inherit;
    box-shadow: inset 0 0 0 500px rgba(255,255,255,0.2);
    filter: blur(10px);
  }
}
.first_img{
  background-image: url('https://raw.githubusercontent.com/Wuwuyiaewu/vivian_development/master/src/assets/pic/Mouse_3.jpg');
}
.second_img{
  background-image: url('https://github.com/Wuwuyiaewu/vivian_development/blob/master/src/assets/pic/Rainbow_1.jpg?raw=true');
}
.three_img{
  background-image: url('https://github.com/Wuwuyiaewu/vivian_development/blob/master/src/assets/pic/Meringue_1.jpg?raw=true');
}
.img_text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
}
</style>

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
  methods: {
  }
};
</script>
