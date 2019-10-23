<template>
  <div class="register">
    <h1>注册</h1>

    <div class="form-group">
      <label for="email">邮箱</label>
      <el-input id="email" v-model="email" placeholder="请输入邮箱"></el-input>
    </div>
    
    <div class="form-group">
      <label for="password">密码</label>
      <el-input id="password" v-model="password" placeholder="请输入密码" show-password></el-input>
    </div>

    <div class="form-group">
      <label for="nick-name">昵称</label>
      <el-input id="nick-name" v-model="nickName" placeholder="请输入昵称"></el-input>
    </div>
    
    <el-button type="success">注册</el-button>
    <el-button type="text" @click="goToLogin">已有账号？前往登录</el-button>
  </div>
</template>

<script>

export default {
  name: 'Register',
  components: {
  },
  data(){
    return {
      email:"",
      password:"",
      rePassword:"",
      nickName:""
    }
  },
  methods:{
    goToLogin(){
      this.$router.push({name:'Login'});
    }
  }
}
</script>

<style scoped lang="less">
.register{
  width:720px;
  background: #fff;
  margin:0 auto;
  height:100%;
  overflow: hidden;
  padding:0 20px;

  h1{
    margin-top:100px;
    text-align: center;
  }

  .form-group{
    margin-bottom:16px;

    label{
      display: block;
      margin-bottom:4px;
      font-size:13px;
      color:#555;
    }
  }
}
</style>