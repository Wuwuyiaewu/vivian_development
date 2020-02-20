<template>
    <div>
        <div class="container border-primary-dark border">
            <div class="row">
                <div class="col-md-6 col-sm-12 p-3">
                    <zoom-on-hover :img-normal="product.image" class="img-fluid zoom" :scale="1"></zoom-on-hover>
                </div>
                <div class="col-md-6 col-sm-12 p-3">
                    <h6>畫名</h6>
                    <p>{{product.description}}</p>
                    <div>
                        <button v-if="productNum > 1" @click="changeNum(-1)">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa btn-primary-light fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>
                        </button>
                        <input type="text" :value="productNum">
                        <button @click="changeNum(1)">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="btn btn-primary-light svg-inline--fa fa-angle-right fa-w-8 p-0" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
                        </button>
                    </div>
                    <p class="font-size">NT {{productNum * product.price}} $</p>
                    <div class="row">
                        <div class="col-6">
                            <button type="submit" class="btn btn-primary-dark" @click="addToCart(product.id,productNum)">加入購物車</button>
                        </div>
                        <div class="col-6">
                            <button type="submit" class="btn btn-primary-dark" @click="addToCart_checkout(product.id,productNum)">直接購買</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.fa-angle-right,.fa-angle-left{
    width: 50px;
    height: 50px;
}
.border{
    border: 2px solid #000 !important;
}
.font-size{
    font-size: 1.5rem;
}
.img-contain{
    display: flex;
    width: 300px;
}
.zoom:hover{
    cursor: crosshair;
}
</style>

<script>
export default {
    data(){
        return{
            product:[],
            id:'',
            cart:[],
            productNum:1,
        }
    },
    components:{
    },
    methods:{
        idDetect(){
            const vm = this
            vm.id = vm.$route.params.Illid
        },
        changeNum(num){
            this.productNum += num
        },
        getCart(){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/product/${vm.id}`
            vm.axios.get(url).then(res=>{
                vm.product = res.data.product
                vm.product.num = 1
            })
        },
        addToCart(id,qty){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
            let cart = {
                product_id:`${id}`,
                qty:`${qty}`
            }
            vm.axios.post(url,{data:cart}).then(()=>{
            })
        },
        addToCart_checkout(id,qty){
            const vm = this
            let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
            let cart = {
                product_id:`${id}`,
                qty:`${qty}`
            }
            vm.axios.post(url,{data:cart}).then(()=>{
            })
            // sendOrder
            url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/order`
            console.log('click')
            let form = vm.form
            vm.axios.post(url,{data:form}).then(res=>{
                if(res.data.success){
                    vm.$router.push(`customorder/${res.data.orderId}`)
                }
            })
        }
    },
    created(){
        this.idDetect()
        this.getCart()
    }
}
</script>