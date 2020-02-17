<template>
    <div>
        <div class="text-right mt-5">
            <!-- 觸發新增產品 -->            
            <button class="btn btn-primary-light" @click="openModal(true)">建立新的產品</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width=120>分類</th>
                    <th width=120>產品名稱</th>
                    <th width=120>原價</th>
                    <th width=120>售價</th>
                    <th width=80>是否啟用</th>
                    <th width=80>編輯</th>
                    <th width=80>刪除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in products" :key="item.id">
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.origin_price}}</td>
                    <td>{{item.price}}</td>
                    <td>
                        <span v-if="item.is_enabled">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
                    </td>
                    <td><button class="btn btn-outline-primary btn-sm">刪除</button></td>
                </tr>
            </tbody>
            
        </table>
        <!-- 分頁 -->
        <pagination :page="pagination" @pagechange="getProduct"/>
        <div class="modal fade" id="openModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>新增產品</span>
                    </h5>
                    <button type="button" class="close" aria-label="Close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input type="text" class="form-control" id="image"
                            placeholder="請輸入圖片連結" v-model="tempProduct.image">
                        </div>
                        <div class="form-group">
                        <label for="customFile">或 上傳圖片
                            <!-- <font-awesome-icon icon="spinner" class="fas fa-backward fa-spin" v-if="status.filesLoading"/> -->
                            <!-- <i class="fas fa-spinner fa-spin" v-if="status.filesLoading"></i> -->
                        </label>
                        <input type="file" id="customFile" class="form-control"
                            ref="files">
                        </div>
                        <img 
                        class="img-fluid" alt="" :src="tempProduct.image">
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title"
                            placeholder="請輸入標題" v-model="tempProduct.title">
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <input type="text" class="form-control" id="category"
                            placeholder="請輸入分類" v-model="tempProduct.category">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">單位</label>
                            <input type="unit" class="form-control" id="unit"
                            placeholder="請輸入單位" v-model="tempProduct.unit">
                        </div>
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                            <input type="number" class="form-control" id="origin_price"
                            placeholder="請輸入原價" v-model="tempProduct.origin_price">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="number" class="form-control" id="price"
                            placeholder="請輸入售價" v-model="tempProduct.price">
                        </div>
                        </div>
                        <hr>

                        <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea type="text" class="form-control" id="description"
                            placeholder="請輸入產品描述"></textarea>
                        </div>
                        <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea type="text" class="form-control" id="content"
                            placeholder="請輸入產品說明內容"></textarea>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            id="is_enabled"
                            :true-value="1" :false-value="0">
                            <label class="form-check-label" for="is_enabled">
                            是否啟用
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '../../components/Pagination'
import $ from 'jquery'
// import pagination from '../../components/Pagination'

export default {
    
    data(){
        return{
            // 新增資料狀態存取點
            products:[],
            // 修改資料狀態暫存
            tempProduct:{
            },
            // 是否為新增或修改判斷
            isNew:false,
            // JSON讀取狀態
            isLoading:false,
            // 表單讀取狀態
            status:{
                filesLoading: false,
            },
            // 分頁狀態
            pagination:{},
        }
    },
    components:{
        Pagination,
    },
    methods:{
        // 取得產品列表 (於created執行))
        getProduct(page = 1){
            const vm = this
            vm.isLoading = true
            const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/products?page=${page}`
            this.axios.get(API).then((res)=>{
                vm.products = res.data.products
                console.log(res)
                vm.isLoading = false
                // 分頁狀態
                vm.pagination = res.data.pagination
            })
        },
//         // 打開modal (於觸發新增產品執行、傳入是否為新項目、非新項目則傳入舊值))
        openModal(isNew,item){
            $('.modal').modal('show')
            console.log(isNew)
            if(isNew){
                this.tempProduct = {}
                this.isNew = true
            }else{
                this.tempProduct = Object.assign({},item)
                this.isNew = false
            }
        },
        modalClose(){
            $('.modal').hide()
        },
        updateProduct(){
            const vm = this
            let API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/product`
            let httpMethod = 'post'
// 判斷順序
// ISNEW決定API使用哪一個
            if(!vm.isNew){
                API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/product/${vm.tempProduct.id}`
                httpMethod = 'put'
            }
            this.axios[httpMethod](API,{data:vm.tempProduct}).then((res)=>{
                if(res.data.success){
                    $('#openModal').modal('hide')
                    vm.getProduct()
                }else{
                    $('#openModal').modal('hide')
                    vm.getProduct()
                    alert('error')
                }
            })  
        },
        delModal(item){
            const vm = this
            vm.tempProduct = item
            const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/product/${item.id}`
            this.axios.delete(API).then((res)=>{
                vm.products = res.data.products
                vm.getProduct()
            })  
        },
        uploadFile(){
            const vm = this
            const uploadFiles = vm.$refs.files.files[0]
            const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/upload`
            const formData = new FormData()
            vm.status.filesLoading = true
            formData.append('file',uploadFiles)
            vm.axios.post(API,formData,{
                header:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                // vm.tempProduct.img = res.data.imageUrl
                if(res.data.success){
                    vm.status.filesLoading = false
                    vm.$set(vm.tempProduct,'img',res.data.imageUrl)
                }else{
                    // this.$bbb.$emit('message:push',res.data.message,'danger')
                }
            })
        }
    },
    created(){
        this.getProduct()
    }
}
</script>