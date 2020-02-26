<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="container">
      <div
        class="row"
        v-for="item in wishid"
        :key="item"
      >
        <div class="col-12">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wishid: [],
      product: [],
      isLoading: false
    };
  },
  computed: {
    DreamFilter() {
      return this.id;
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
    wishSet(itemid) {
      this.wishid.push({itemid})
      console.log('bingo，成功$emit加入' + itemid + '的數值' )
    }
  },
  created() {
    const vm = this;
    vm.$bus.$on("wishPic", itemid => {
        vm.wishSet(itemid)
    });
    vm.allProduct();
  }
};
</script>