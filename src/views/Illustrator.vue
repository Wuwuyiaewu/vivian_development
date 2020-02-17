<template>
    <div>
        <div class="container border-primary-dark border">
            <div class="row">
                <div class="col-6 align-self-center justify-content-center">
                    <img :src="product.image" alt="" class="img-fluid">
                </div>
                <div class="col-6">
                    <p>夏日，飲著涼爽的咖啡拿鐵冰沙，既有
甘醇苦味與鮮奶泡的致命感，配著一口
一口的墜入心脾</p>
                <form>
                <div class="form-row">
                    <div class="col-6 my-1">
                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-model="product.num">
                        <option :value="num" v-for="num in 10" :key="num">
                            {{num}} pic
                        </option>
                    </select>
                    </div>
                    <div class="col-6">
                        <p class="font-size">NT {{product.num * product.price}}$</p>
                    </div>
                    <div class="col-12">
                        <hr style="border-top:2px solid #000;">
                    </div>
                    <div class="col-6">
                        <button type="submit" class="btn btn-primary-dark" @click="addToCart(product.id,product.num)">加入購物車</button>
                    </div>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.border{
    border: 2px solid #000 !important;
}
.font-size{
    font-size: 1.5rem;
}
</style>

<script>
export default {
    data(){
        return{
            product:[],
            id:'',
            cart:[]
        }
    },
    methods:{
        idDetect(){
            const vm = this
            vm.id = vm.$route.params.Illid
        },
        getCart(){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/product/${vm.id}`
            vm.axios.get(url).then(res=>{
                vm.product = res.data.product
                vm.product.num = 1
                console.log(res)
            })
        },
        addToCart(id,qty){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
            let cart = {
                product_id:`${id}`,
                qty:`${qty}`
            }
            vm.axios.post(url,{data:cart}).then(res=>{
                console.log(res)
            })
        }
    },
    created(){
        this.idDetect()
        this.getCart()
    }
}
</script>