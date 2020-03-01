<template>
  <div>
    <loading :active.sync="isLoading" />
    
    <div class="container pt-5">
      <p v-if="DreamFilter.length === 0">
        還沒有收藏項目
      </p>
      <div class="row">
        <div
          class="col-xl-2 col-lg-3 col-md-4 mb-2 position-relative "
          v-for="item in DreamFilter"
          :key="item.id"
        >
          <div class="img_box bg-primary">
            <img :src="item.image" alt="" class="img-fluid">
            dsadsadsad
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.img_box{
  transform: skewY(2deg);
  &:hover{
    transform: translateY(-40px);
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
    }
  },
  addToCard(id,qty=1){
      const vm = this
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
      let cart ={
          product_id:id,
          qty
      }
      // 啟動loading
      vm.isLoading = true
      vm.axios.post(API,{data:cart}).then(res=>{
          if(res.data.success){
              // 觸發購物車更新
              vm.$bus.$emit('cartUpdate')
              vm.$bus.$emit('message:push','加入成功','primary-dark');
              vm.isLoading = false
          }else{
              vm.$bus.$emit('message:push','加入失敗','warning');
          }
      })
  },
  created() {
    const vm = this;
    vm.allProduct();
    console.log(this.wishlist);
  }
};
</script>