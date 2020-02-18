<template>
    <div>
        <div class="container">
            <div class="row d-none d-sm-none d-md-flex">
                <div class="col-3">
                    <div class="row bg-primary-dark pb-1 pt-1">
                        <div class="col-12 pb-1 pt-1">
                            <button class="btn btn-primary-light w-100 text-left" @click="categoryType = 'all'" :class="{'active': categoryType == 'all'}">All story</button>
                        </div>
                        <div class="col-12 pb-1 pt-1">
                            <button class="btn btn-primary-light w-100 text-left" @click="categoryType = 'sweet'" :class="{'active': categoryType == 'sweet'}">Sweet story</button>
                        </div>
                        <div class="col-12 pb-1 pt-1">
                            <button class="btn btn-primary-light w-100 text-left" @click="categoryType = 'love'" :class="{'active': categoryType == 'love'}">Love's story</button>
                        </div>
                        <div class="col-12 pb-1 pt-1">
                            <button class="btn btn-primary-light w-100 text-left" @click="categoryType = 'natural'" :class="{'active': categoryType == 'natural'}">Natural story</button>
                        </div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="row">
                        <div class="col-xl-4 col-lg-6 mb-2" v-for="item in DreamFilter" :key="item.id">
                            <div class="card bg-dark text-white">
                            <img :src="item.image" class="card-img" alt="...">
                            <div class="card-img-overlay card-pt">
                                <div class="row ">
                                    <div class="col-6 text-center">
                                        <button class="btn btn-primary-dark" @click="addToCard(item.id)">
                                            Add to cart</button>
                                    </div>
                                    <div class="col-6 text-center">
                                        <router-link class="btn btn-primary-dark" :to="{name:'illustrator',params:{Illid:item.id}}">See detail</router-link>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                </div>
                <div class="col-9">
                    <pagination :page="pagination" @pagechange="getProduct" v-if="categoryType == 'all'"/>
                </div>
            </div>
            <div class="row d-sm-block d-md-none">
                <div class="col-12 mb-2" v-for="item in products" :key="item.id">
                    <div class="card bg-dark text-white">
                            <img :src="item.image" class="card-img" alt="...">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>


@media (min-width: 768px) {
    .card-img-overlay{
        padding-top: 55%;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
}
@media (min-width: 992px) {
    .card-img-overlay{
        padding-top: 55%;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        .btn{
            font-size: 16px;
            padding: 8px;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
        }
    }
}
@media (min-width: 1200px) {
    .card-img-overlay{
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-top: 55%;
        .btn{
            font-size: 16px;
            padding: 8px;
        }
    }
}
</style>

<script>
import pagination from '../components/Pagination'

export default {
    data(){
        return{
            products:[],
            product:[],
            cartbag:[],
            categoryType:"all",
            pagination:{},
        }
    },
    components:{
        pagination,
    },
    computed:{
        DreamFilter(){
            if(this.categoryType == 'all'){
                return this.products
            }else{
                return this.product.filter(el=>{
                    if (el.category == this.categoryType){
                        return el
                    }
                })
            }
        }
    },
    methods:{
        getProduct(page = 1){
            const vm = this
            const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products?page=${page}`
            vm.axios.get(API).then(res=>{
                vm.products = res.data.products
                vm.pagination = res.data.pagination
            })
        },
        typeProduct(){
            const vm = this
            const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products/all`
            vm.axios.get(API).then(res=>{
                vm.product = res.data.products
            })
        },
        addToCard(id,qty=1){
            const vm = this
            const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
            let cart ={
                product_id:id,
                qty
            }
            vm.axios.post(API,{data:cart}).then(()=>{
                vm.getCart()
            })
        },
        getCart(){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
            vm.axios.get(url).then(res=>{
                vm.cartbag = res.data.data.carts
            })
        },
    },
    created(){
        this.getProduct()
        this.typeProduct()
    }
}
</script>