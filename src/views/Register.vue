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

        <el-button type="success" @click="register">注册</el-button>
        <el-button type="text" @click="goToLogin">已有账号？前往登录</el-button>
    </div>
</template>

<script>
import axios from "axios";
import api from "@/api";
export default {
    name: "Register",
    components: {},
    data() {
        return {
            email: "",
            password: "",
            nickName: ""
        };
    },
    methods: {
        goToLogin() {
            this.$router.push({ name: "Login" });
        },
        register() {
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
            if (this.password.length < 6) {
                this.$message.error({
                    message:'密码不能少于6位数',
                    duration:1000    
                });
                return;
            }
            if (this.nickName.trim() === "") {
                this.$message.error({
                    message:'您没有输入昵称',
                    duration:1000    
                });
                return;
            }
            axios
                .post("/api" + api.register, {
                    email: this.email,
                    password: this.password,
                    nickName: this.nickName,
                })
                .then(response => {
                    if (response.data.code === "0000") {
                        this.$message({
                            message:'注册成功',
                            duration:1000    
                        });
                        this.$router.push({ name: "Login" });
                    }
                });
        }
    }
};
</script>

<style scoped lang="less">
.register {
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