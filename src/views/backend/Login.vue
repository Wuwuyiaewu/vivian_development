<template>
  <div class="hello">
    <form
      class="form-signin"
      @submit.prevent="login"
    >
      <img
        class="mb-4"
        src=""
        alt=""
        width="72"
        height="72"
      >
      <h1 class="h3 mb-3 font-weight-normal text-center">
        會員登入
      </h1>
      <label
        for="inputEmail"
        class="sr-only"
      >輸入信箱</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="輸入信箱"
        required
        autofocus
        v-model="user.username"
      >
      <label
        for="inputPassword"
        class="sr-only"
      >輸入密碼</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="輸入密碼"
        required
        v-model="user.password"
      >
      <div class="checkbox mb-3">
        <label>
          <input
            type="checkbox"
            value="remember-me"
          > <small>記住我</small>
        </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        登入
      </button>
    </form>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
            user:{
                username: "",
                password: ""
            }
        }
    },
    methods:{
        login(){
            const API = `${process.env.VUE_APP_APIPATH}/admin/signin`
            const vm = this
            vm.axios.post(API,vm.user).then((res)=>{
            console.log(res.data)
                if(res.data.success){
                    vm.$router.push('/admin/products')
                }
            })
            
        }
    }
}
</script>


<style lang="scss" scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>
