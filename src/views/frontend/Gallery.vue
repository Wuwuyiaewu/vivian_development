<template>
  <div>
    <loading :active.sync="isLoading" />
    <Alert />
    <div class="container">
      <nav
        aria-label="breadcrumb"
        class="row"
      >
        <ol class="breadcrumb col-12">
          <router-link
            to="/"
            class="breadcrumb-item breadcrumb-link"
          >
            首頁
          </router-link>
          <li
            class="breadcrumb-item active"
            aria-current="page"
          >
            畫廊
          </li>
        </ol>
      </nav>
      <div class="row d-none d-sm-none d-md-flex">
        <div class="col-3">
          <div class="row bg-primary-dark pb-1 pt-1">
            <div class="col-12 pb-1 pt-1">
              <button
                class="btn btn-primary-light w-100 text-left"
                @click="categoryType = 'all'"
                :class="{'active': categoryType === 'all'}"
              >
                All story
              </button>
            </div>
            <div class="col-12 pb-1 pt-1">
              <button
                class="btn btn-primary-light w-100 text-left"
                @click="categoryType = 'sweet'"
                :class="{'active': categoryType === 'sweet'}"
              >
                Sweet's story
              </button>
            </div>
            <div class="col-12 pb-1 pt-1">
              <button
                class="btn btn-primary-light w-100 text-left"
                @click="categoryType = 'love'"
                :class="{'active': categoryType === 'love'}"
              >
                Love's story
              </button>
            </div>
            <div class="col-12 pb-1 pt-1">
              <button
                class="btn btn-primary-light w-100 text-left"
                @click="categoryType = 'natural'"
                :class="{'active': categoryType === 'natural'}"
              >
                Natural story
              </button>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="row">
            <div
              class="col-xl-4 col-lg-6 mb-2 position-relative card-outer"
              v-for="item in DreamFilter"
              :key="item.id"
            >
              <div
                class="position-absolute fav-icon-wrap"
                @click="getFavorId(item.id)"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="gratipay"
                  class="svg-inline--fa fa-gratipay fa-w-16 fav-icon"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                ><path
                  fill="currentColor"
                  d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm114.6 226.4l-113 152.7-112.7-152.7c-8.7-11.9-19.1-50.4 13.6-72 28.1-18.1 54.6-4.2 68.5 11.9 15.9 17.9 46.6 16.9 61.7 0 13.9-16.1 40.4-30 68.1-11.9 32.9 21.6 22.6 60 13.8 72z"
                /></svg>
              </div>
              <div class="card bg-dark text-white web-card">
                <img
                  :src="item.image"
                  class="card-img"
                  alt="..."
                >
                <div class="card-img-overlay card-pt">
                  <div class="row ">
                    <div class="col-6 text-center">
                      <button
                        class="btn btn-primary-dark"
                        id="addcart"
                        @click="addToCard(item.id)"
                      >
                        Add to cart
                      </button>
                    </div>
                    <div class="col-6 text-center">
                      <router-link
                        class="btn btn-primary-dark"
                        id="seedetail"
                        :to="{name:'illustrator',params:{Illid:item.id}}"
                      >
                        See detail
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3" />
        <div class="col-9">
          <pagination
            :page="pagination"
            @pagechange="getProduct"
            v-if="categoryType === 'all'"
          />
        </div>
      </div>
      <div class="row d-sm-flex d-md-none">
        <back-to-top
          bottom="50px"
          right="50px"
        >
          <button
            type="button"
            class="btn btn-secondary-dark btn-to-top"
          >
            ↑
          </button>
        </back-to-top>
        <div class="col-12 bg-primary-light">
          <button
            class="btn btn-outline-secondary btn-black text-uppercase filter-btn m-2"
            @click="categoryType = 'all'"
            :class="{'active': categoryType === 'all'}"
          >
            All story
          </button>
          <button
            class="btn btn-outline-secondary btn-black text-uppercase filter-btn m-2"
            @click="categoryType = 'sweet'"
            :class="{'active': categoryType === 'sweet'}"
          >
            Sweet's story
          </button>
          <button
            class="btn btn-outline-secondary btn-black text-uppercase filter-btn m-2"
            @click="categoryType = 'love'"
            :class="{'active': categoryType === 'love'}"
          >
            Love's story
          </button>
          <button
            class="btn btn-outline-secondary btn-black text-uppercase filter-btn m-2"
            @click="categoryType = 'natural'"
            :class="{'active': categoryType === 'natural'}"
          >
            Natural's story
          </button>
        </div>
      </div>
      <div class="row d-sm-block d-md-none pt-2">
        <div
          class="col-12 mb-2 card-outer"
          v-for="item in DreamFilter"
          :key="item.id"
        >
          <div
            class="position-absolute fav-icon-wrap"
            @click="getFavorId(item.id)"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="gratipay"
              class="svg-inline--fa fa-gratipay fa-w-16 fav-icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            ><path
              fill="currentColor"
              d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm114.6 226.4l-113 152.7-112.7-152.7c-8.7-11.9-19.1-50.4 13.6-72 28.1-18.1 54.6-4.2 68.5 11.9 15.9 17.9 46.6 16.9 61.7 0 13.9-16.1 40.4-30 68.1-11.9 32.9 21.6 22.6 60 13.8 72z"
            /></svg>
          </div>
          <div class="card bg-dark text-white">
            <img
              :src="item.image"
              class="card-img"
              alt="..."
            >
            <div class="card-body">
              <h5 class="card-title">
                {{ item.title }}
              </h5>
              <div class="row">
                <div class="col-6">
                  <button
                    class="btn btn-primary-dark"
                    @click="addToCard(item.id)"
                  >
                    Add to cart
                  </button>
                </div>
                <div class="col-6">
                  <router-link
                    class="btn btn-primary-dark"
                    :to="{name:'illustrator',params:{Illid:item.id}}"
                  >
                    See detail
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import pagination from '@/components/Pagination'
export default {
    data(){
        return{
            products:[],
            product:[],
            categoryType:"all",
            pagination:{},
            isLoading:false,
        }
    },
    components:{
        pagination,
    },
    computed:{
        DreamFilter(){
            if(this.categoryType === 'all'){
                return this.products
            }else{
                return this.product.filter(el=>{
                    if (el.category === this.categoryType){
                        return el
                    }
                })
            }
        }
    },
    methods:{
        // 頁碼版
        getProduct(page = 1){
            const vm = this
            const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products?page=${page}`
            // 啟動loading
            vm.isLoading = true
            vm.axios.get(API).then(res=>{
                // 取得頁數products
                vm.products = res.data.products
                // 賦予分頁
                vm.pagination = res.data.pagination
                // 關閉loading
                vm.isLoading = false
            })
        },
        // 全部商品(分類版)
        typeProduct(){
            const vm = this
            const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products/all`
            // 啟動loading
            vm.isLoading = true
            vm.axios.get(API).then(res=>{
                vm.product = res.data.products
                // 關閉loading
                vm.isLoading = false

            })
        },
        // 新增至購物車
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
        getFavorId(id){
          this.$bus.$emit('wishPic',id)

        }
    },
    created(){
        this.getProduct()
        this.typeProduct()
    }
}
</script>