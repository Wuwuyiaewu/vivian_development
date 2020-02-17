<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data(){
    return{
      cartbag : [],
    }
  },
  name: 'home',
  components: {
  },
  methods:{
    getCart(){
        const vm = this
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
        vm.axios.get(url).then(res=>{
            vm.cartbag = res.data.data.carts
            console.log(res)
        })
    },
  },
  created(){
    this.$bus.$on('cartUpdate',(msg)=>{
      this.getCart(msg)
      console.log('觸發$bus的getCart')
      console.log('外層事件的app cartbag',this.cartbag)
    })
  }
}
</script>


<style lang="scss">
@import './assets/all.scss';

</style>

