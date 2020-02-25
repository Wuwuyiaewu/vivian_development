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
              class="col-xl-4 col-lg-6 mb-2"
              v-for="item in DreamFilter"
              :key="item.id"
            >
              <div class="card bg-dark text-white web-card">
                <img
                  :src="item.image"
                  class="card-img"
                  alt="..."
                >
                <div class="card-img-overlay card-pt ">
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
          class="col-12 mb-2"
          v-for="item in DreamFilter"
          :key="item.id"
        >
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
    <footer class="footer mt-auto py-3 bg-primary-light">
      <div class="container">
        <span class="text-muted">@2020 CopyRight
          本站僅作品練習，圖資來源為個人創作，如需使用請聯繫作者</span>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.card-img-overlay,.m_card-img-overlay{
    overflow: hidden;
    #addcart,#seedetail{
        transition: transform 0.45s;
        transform: translate(-100%,200%)
    }
    #seedetail{
        transform: translate(100%,200%)
    }
    &:hover{
        #addcart{
            transform: translate(-10%,20%)
        }
        #seedetail{
            transform: translate(10%,20%)
        }
    }
}
.web-card{
    overflow: hidden;
    .card-img{
        transition-duration: 0.5s;
        transition-property: transform;
    }
    &:hover{
        .card-img{
            transform: scale(1.2) rotate(5deg);
            transition-duration: 8s;
        }
    }
}
.btn-to-top {
    width: 50px;
    height: 50px;
    padding: 10px 16px;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1rem;
}
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
        }
    },
    created(){
        this.getProduct()
        this.typeProduct()
    }
}
</script>