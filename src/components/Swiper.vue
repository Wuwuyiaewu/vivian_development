<template>
  <swiper
    :options="swiperOption"
    ref="mySwiper"
    class="container"
  >
    <!-- slides -->
    <swiper-slide class="swiper-slide">
      <img
        src="../assets/pic/carrot_1.jpg"
        alt=""
        class="img-fluid"
      >
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img
        src="../assets/pic/donut_2.jpg"
        alt=""
        class="img-fluid"
      >
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img
        src="../assets/pic/Meringue_3.jpg"
        alt=""
        class="img-fluid"
      >
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img
        src="../assets/pic/Cream_1.jpg"
        alt=""
        class="img-fluid"
      >
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img
        src="../assets/pic/Mouse_2.jpg"
        alt=""
        class="img-fluid"
      >
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img
        src="../assets/pic/Muffin_3.jpg"
        alt=""
        class="img-fluid"
      >
    </swiper-slide>
    <div
      class="swiper-pagination"
      slot="pagination"
    />
  </swiper>
</template>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to{
    opacity: 0
}
.swiper-container{
    margin-top: 10vh;
}
</style>

<script>
  export default {
    name: 'Carrousel',
    data() {
      return {
        swiperOption: {
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            grabCursor: true  //覆蓋後手掌形狀
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>