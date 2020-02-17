<template>
    <div>
        <nav class="navbar navbar-expand-md bg-white">
            <router-link to="/" class="navbar-brand col-4" href="#">Vivian_illustrator</router-link>
            <button @click="clickshow = !clickshow" class="navbar-toggler" type="button">
                <font-awesome-icon icon="bars" class="text-primary"/>
            </button>
            <div class="col-8 d-none d-md-block">
                <ul class="navbar-nav row">
                    <li class="nav-item mr-4 col-2">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item mr-4 col-2">
                        <router-link to="/gallery" class="nav-link">Gallery</router-link>
                    </li>
                    <li class="nav-item mr-4 col-2">
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                    <li class="nav-item mr-4 col-2">
                        <button class="nav-link border-0 bg-white" @click="foldcart(msg)">
                            <font-awesome-icon icon="shopping-cart" class="text-primary "/>
                        </button>
                    </li>
                </ul>
            </div>
            </nav>
        <div class="navbar-collapse position-fixed bg-primary-light h-100 w-100" id="navbarSupportedContent" v-if="rwdshow & clickshow">
            <div class="list-group text-center">
                <router-link to="/about" class="list-group-item list-group-item-action bg-primary-light" @click.native="changeview">About</router-link>
                <router-link to="/gallery" href="#" class="list-group-item list-group-item-action bg-primary-light" @click.native="changeview">Shop</router-link>
                <router-link to="/" href="#" class="list-group-item list-group-item-action bg-primary-light" @click.native="changeview">Cart</router-link>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.navbar,.navbar-collapse{
    z-index: 999;
}
</style>
<script>
export default {
    props:['show'],
    data(){
        return{
            screenWidth:document.body.clientWidth,
            rwdshow:Boolean,
            clickshow:false,
            cartshow:true,
            msg:''
        }
    },
    methods:{
        changeview(){
            const vm = this
            vm.clickshow = false
        },
        foldcart(msg){
            const vm = this
            vm.$emit('cart-control')
            vm.$bus.$emit('cartUpdate',msg)
        }
    },
    mounted () {
        // 紀錄寬度
        const vm = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                vm.screenWidth = window.screenWidth
            })()
        }
        if(vm.screenWidth > 768){
            vm.rwdshow = false
        }else{
            vm.rwdshow = true
        }
    },
    watch:{
        screenWidth(val){
            // 為了避免頻繁觸發resize函式導致頁面卡頓，使用定時器
            if(!this.timer){
                // 一旦監聽到的screenWidth值改變，就將其重新賦給data裡的screenWidth
                this.screenWidth = val
                this.timer = true
                let vm = this
                setTimeout(function(){
                    // 列印screenWidth變化的值
                    vm.timer = false
                },400)
                if(vm.screenWidth > 768){
                    vm.rwdshow = false
                }else{
                    vm.rwdshow = true
                }
            }
        }
    },
    created(){
    }

}
</script>