<template>
    <div>
        <div class="container pc d-none d-sm-none d-md-block position-relative">
            <div class="row">
                <div class="col-12">
                    <p>結帳流程1</p>
                </div>
            </div>
            <div class="row page-transition position-absolute" :class="{'hild-left':!pageone}">
                <div class="col-7">
                    <table class="table">
                        <thead class="bg-primary text-white">
                            <th width=100></th>
                            <th>品名</th>
                            <th>數量</th>
                            <th>單價</th>
                        </thead>
                        <tbody class="bg-primary-light" v-for="item in cartbag.carts" :key="item.product.id">
                        <td><img :src="item.product.image" class="img-fluid" alt=""></td>
                        <td>{{item.product.title}}</td> 
                        <td>{{item.qty}}</td>
                        <td>{{item.product.price}}</td>
                        </tbody>
                        <tfoot>
                        
                        </tfoot>
                    </table>
                </div>
                <div class="col-5 ">
                    <table class="table">
                        <thead>
                            <th>小計</th>
                            <th>總計</th>
                        </thead>
                        <tbody>
                            <td>{{cartbag.total}} $</td>
                            <td>{{cartbag.final_total}} $</td>
                            
                        </tbody>
                        <tfoot>
                            <td colspan="4">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="輸入折扣碼" aria-label="Recipient's username" aria-describedby="button-addon2">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">送出</button>
                                    </div>
                                </div>
                            </td>
                        </tfoot>
                    </table>
                    <table class="table">
                        <thead>
                            <td>
                                <button type="button" class="btn btn-primary-dark w-100" @click="pageone = !pageone,pagetwo = !pagetwo">下一步</button>
                            </td>
                        </thead>
                    </table>
                </div>
            </div>
            <!-- 2頁 -->
            <form class="row page-transition position-absolute w-100" :class="{'hild-left':!pagetwo}">
                <div class="col-6">
                    <div class="form-group">
                        <label for="customName">Name</label>
                        <input type="text" class="form-control" id="customName" v-model="form.user.name">
                    </div>
                    <div class="form-group">
                        <label for="customEmail1">Email address</label>
                        <input type="email" class="form-control" id="customEmail1" aria-describedby="emailHelp" v-model="form.user.email">
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input type="address" class="form-control" id="address" v-model="form.user.address">
                    </div>
                    <div class="form-group">
                        <label for="customTel">Tel</label>
                        <input type="tel" class="form-control" id="customTel" v-model="form.user.tel">
                    </div>
                </div>
                <div class="col-6">
                    <label for="customTel">Message</label>
                    <textarea class="form-control" id="customTel" placeholder="leave message here" v-model="form.message">
                    </textarea>
                </div>
                <div class="col-6">
                    <button class="btn btn-primary-dark w-100" @click="pageone = !pageone,pagetwo = !pagetwo" type="button">上一步</button>
                </div>
                <div class="col-6">
                    <button type="submit" class="btn btn-primary-dark w-100" @click="pagetwo = !pagetwo,pagethree = !pagethree,sendOrder()">送出訂單</button>
                </div>
            </form>
            <!-- 3 頁 -->
            <div class="row page-transition position-absolute" :class="{'hild-left':!pagethree}">
                <div class="col-6">
                    <button class="btn btn-primary-dark w-100" @click="pagetwo = !pagetwo,pagethree = !pagethree" type="button">上一步</button>
                </div>
                <div class="col-12">
                    第三頁
                </div>
            </div>
        </div>
        <!-- 手機板 -->
        <!-- row 內綁定 v-for 會持續重複功能到下一個 dom 結束 -->
        <!-- 因此搭配 relative 與 absolute 會不適合有兩個以上區塊 -->
        <!-- 使用 transform 會有困難 -->
        <div class="container mobile d-sm-block d-md-none">
            <div class="row " v-for="item in cartbag.carts" :key="item.product.id">
                <div class="col-6">
                    <img :src="item.product.image" alt="" class="img-fluid">
                </div>
                <div class="col-6">
                    <p>{{item.product.title}}</p>
                    <p>{{item.product.price}} $ * {{item.qty}} {{item.product.unit}}</p>
                    <p>{{item.final_total}} $</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="輸入折扣碼" aria-label="Recipient's username" aria-describedby="button-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" id="button-addon2">送出</button>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    應付金額
                </div>
                <div class="col-6">
                    <p>NT. {{cartbag.total}} $</p>
                </div>
            </div>
            <form class="row">
                <div class="form-group col-12">
                    <label for="customName">Name</label>
                    <input type="text" class="form-control" id="customName" v-model="form.user.name">
                </div>
                <div class="form-group col-12">
                    <label for="customEmail1">Email address</label>
                    <input type="email" class="form-control" id="customEmail1" aria-describedby="emailHelp" v-model="form.user.email">
                </div>
                <div class="form-group col-12">
                    <label for="address">Address</label>
                    <input type="address" class="form-control" id="address" v-model="form.user.address">
                </div>
                <div class="form-group col-12">
                    <label for="customTel">Tel</label>
                    <input type="tel" class="form-control" id="customTel" v-model="form.user.tel">
                </div>
                <div class="form-group col-12">
                    <label for="customTel">Message</label>
                    <textarea class="form-control" id="customTel" placeholder="leave message here" v-model="form.message">
                    </textarea>
                </div>
            </form>
        </div>
        </div>
</template>

<style lang="scss" scoped>
.hild-left{
    opacity: 0;
    transform: translateX(-150%);
}
.page-transition{
    transition: all 0.3s;
}
</style>

<script>
export default {
    data(){
        return{
            cartbag:[],
            pageone:true,
            pagetwo:false,
            pagethree:false,
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:''
                },
                message:'',
            },

        }
    },
    computed:{
    },
    methods:{
        getCart(){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
            vm.axios.get(url).then(res=>{
                vm.cartbag = res.data.data
                console.log(res)
            })
        },
        sendOrder(){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/order`
            console.log('click')
            let form = vm.form
            vm.axios.post(url,{data:form}).then(res=>{
                console.log(res)
            })
        }
    },
    created(){
        this.getCart()
    }
}
</script>