<template>
    <div>
        <div class="container pc d-none d-sm-none d-md-block position-relative">
            <div class="row">
                <ul class="list col-12 pb-3">
                    <li :class="{'active':pageone}">確認購物車</li>
                    <li :class="{'active':pagetwo}">客戶資訊</li>
                    <li >付款確認</li>
                </ul>
            </div>
            <div class="row page-transition position-absolute" :class="{'hild-left':!pageone}">
                <div class="col-7" v-if="cartbag.carts.length == 0 ">購物車內還沒有商品唷</div>
                <div class="col-7" v-if="cartbag.carts.length !== 0 ">
                    <table class="table">
                        <thead class="bg-primary text-white">
                            <th width=100></th>
                            <th>品名</th>
                            <th>數量</th>
                            <th>單價</th>
                        </thead>
                        <tbody class="bg-primary-light" v-for="item in cartbag.carts" :key="item.product.id">
                        <td><img :src="item.product.image" class="img-fluid" alt=""></td>
                        <td>{{item.product.title}}
                            <div v-if="item.coupon" class="text-secondary-dark">
                                已套用優惠
                            </div>
                        </td> 
                        <td>{{item.qty}} / pic</td>
                        <td>{{item.product.price | currency}}
                        </td>
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </table>
                </div>
                <div class="col-5 ">
                    <table class="table">
                        <thead>
                            <th colspan="2">總計</th>
                        </thead>
                        <tbody>
                            <td v-if="cartbag.final_total == cartbag.total">{{cartbag.total | currency}} 元</td>
                            <td v-if="cartbag.final_total !== cartbag.total" class="text-danger"><del>{{cartbag.total | currency}}</del>
                            <div v-if="cartbag.carts.coupon">優惠折扣</div>
                            </td>
                            <td v-if="cartbag.final_total !== cartbag.total">{{cartbag.final_total | currency}} 元</td>
                            
                        </tbody>
                        <tfoot>
                            <td colspan="4">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="輸入折扣碼" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="coupon_code">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addCouponCode">送出</button>
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
            <ValidationObserver ref="observer"  v-slot="{ invalid }" tag="form" >
                <form class="row page-transition position-absolute" :class="{'hild-left':!pagetwo}" @submit.prevent="sendOrder">
                <div class="form-group col-6">
                    <label for="useremail">Email *</label>
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <input
                        type="email"
                        class="form-control"
                        name="email"
                        id="useremail"
                        v-model="form.user.email"
                        placeholder="請輸入 Email"
                        required
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="form-group col-6">
                    <label for="username">收件人姓名 *</label>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="姓名">
                    <input
                        type="text"
                        class="form-control"
                        name="name"
                        id="username"
                        v-model="form.user.name"
                        placeholder="輸入姓名"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="form-group col-6">
                    <label for="usertel">收件人電話 *</label>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="電話">
                    <input
                        type="tel"
                        class="form-control"
                        id="usertel"
                        v-model="form.user.tel"
                        placeholder="請輸入電話"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="form-group col-6">
                    <label for="useraddress">收件人地址 *</label>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="地址">
                    <input
                        type="text"
                        class="form-control"
                        name="address"
                        id="useraddress"
                        v-model="form.user.address"
                        placeholder="請輸入地址"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="form-group col-12">
                    <label for="comment">留言</label>
                    <textarea
                    name
                    id="comment"
                    class="form-control"
                    cols="30"
                    rows="10"
                    v-model="form.message"
                    ></textarea>
                </div>
                <div class="col-6">
                    <button class="btn btn-primary-dark w-100" @click="pageone = !pageone,pagetwo = !pagetwo" type="button">上一步</button>
                </div>
                <div class="col-6 text-right">
                    <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                </div>
                </form>
            </ValidationObserver>
            <!-- 3 頁 -->
        </div>
        <!-- 手機板 -->
        <div class="container mobile d-sm-block d-md-none">
            <div class="row " v-for="item in cartbag.carts" :key="item.product.id">
                <div class="col-6">
                    <img :src="item.product.image" alt="" class="img-fluid">
                </div>
                <div class="col-6">
                    <p>{{item.product.title}} 
                    </p>
                    <p>{{item.product.price}} * {{item.qty}} {{item.product.unit}}</p>
                    <p>{{item.final_total | currency}} <span v-if="item.coupon" class="text-secondary-dark">已套用優惠</span></p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="輸入折扣碼" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="coupon_code">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addCouponCode">送出</button>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    應付金額
                </div>
                <div class="col-6">
                    <p>{{cartbag.final_total | currency}} 元</p>
                </div>
            </div>
            <ValidationObserver ref="observer"  v-slot="{ invalid }" tag="form" >
                <form class="row" @submit.prevent="sendOrder">
                <div class="form-group col-6">
                    <label for="m_useremail">Email *</label>
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <input
                        type="email"
                        class="form-control"
                        name="email"
                        id="m_useremail"
                        v-model="form.user.email"
                        placeholder="請輸入 Email"
                        required
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="form-group col-6">
                    <label for="m_username">收件人姓名 *</label>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="姓名">
                    <input
                        type="text"
                        class="form-control"
                        name="name"
                        id="m_username"
                        v-model="form.user.name"
                        placeholder="輸入姓名"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="form-group col-6">
                    <label for="m_usertel">收件人電話 *</label>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="電話">
                    <input
                        type="tel"
                        class="form-control"
                        id="m_usertel"
                        v-model="form.user.tel"
                        placeholder="請輸入電話"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="form-group col-6">
                    <label for="m_useraddress">收件人地址 *</label>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="地址">
                    <input
                        type="text"
                        class="form-control"
                        name="address"
                        id="m_useraddress"
                        v-model="form.user.address"
                        placeholder="請輸入地址"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="form-group col-12">
                    <label for="m_comment">留言</label>
                    <textarea
                    name
                    id="m_comment"
                    class="form-control"
                    cols="30"
                    rows="10"
                    v-model="form.message"
                    ></textarea>
                </div>
                <div class="col-12 text-right">
                    <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                </div>
                </form>
            </ValidationObserver>
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
            coupon_code:'',
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:''
                },
                message:'',
            },
            isLoading:false,

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
            })
        },
        addCouponCode(){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/coupon`
            const coupon = {
                code : vm.coupon_code
            }
            vm.isLoading = true
            vm.axios.post(url,{data:coupon}).then(res=>{
                if(res.data.success){
                    vm.$bus.$emit('message:push',res.data.message,'success');
                    vm.getCart()
                    vm.isLoading = false
                }else{
                    vm.$bus.$emit('message:push',res.data.message,'wraning');
                }
            })
        },
        sendOrder(){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/order`
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
        this.getCart()
    }
}
</script>