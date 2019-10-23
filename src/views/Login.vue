<template>
    <div class="login">
        <h1>登录</h1>

        <div class="form-group">
            <label for="email">邮箱</label>
            <el-input id="email" v-model="email" placeholder="请输入邮箱"></el-input>
        </div>

        <div class="form-group">
            <label for="password">密码</label>
            <el-input id="password" v-model="password" placeholder="请输入密码" show-password></el-input>
        </div>

        <el-button type="success" @click="login">登录</el-button>
        <el-button type="text" @click="goToRegister">没有账号？注册一个</el-button>
    </div>
</template>

<script>
import axios from "axios";
import api from "@/api";
import responseHandler from '@/utils/responseHandler';

export default {
    name: "Login",
    components: {},
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        goToRegister() {
            this.$router.push({ name: "Register" });
        },
        login() {
            // 验证
            if (this.email.trim() === "") {
                this.$message.error({
                    message:'您没有输入账号',
                    duration:1000    
                });
                return;
            }
            if (this.password.trim() === "") {
                this.$message.error({
                    message:'您没有输入密码',
                    duration:1000    
                });
                return;
            }
            axios
                .post("/api" + api.login, {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    if(!responseHandler.handle(response.data,this)){return;}
                    this.$router.push({ name: "Home" });
                });
        }
    }
};
</script>

<style scoped lang="less">
.login {
    width: 720px;
    background: #fff;
    margin: 0 auto;
    height: 100%;
    overflow: hidden;
    padding: 0 20px;

    h1 {
        margin-top: 100px;
        text-align: center;
    }

    .form-group {
        margin-bottom: 16px;

        label {
            display: block;
            margin-bottom: 4px;
            font-size: 13px;
            color: #555;
        }
    }
}
</style>