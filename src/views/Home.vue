<template>
    <div class="home">
        <!-- 导航栏 -->
        <nav>
            <h1>问题列表</h1>
            <el-dropdown @command="handleProfileOperation">
                <span class="el-dropdown-link">
                    {{nickName}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </nav>
        <!-- 导航栏 [完]-->

        <!-- 页面主要内容 -->
        <main>
            <div style="margin-top: 15px;">
                <el-input placeholder="请输入你要提问的内容" v-model="myQuestion">
                    <el-button slot="append" @click="createQuestion">提问</el-button>
                </el-input>
            </div>
            <div class="submit-question-options">
                <el-checkbox v-model="isAnonymous">匿名提问</el-checkbox>
            </div>
            <h1>问题列表</h1>
            <div class="question-item" v-for="questionItem of questionList" :key="questionItem.id">
                <p class="content">{{questionItem.question}}</p>
                <p class="time">{{questionItem.time}} by {{questionItem.userName}}</p>
            </div>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getQuestionList"
                :page-count="pageCount">
            </el-pagination>
        </main>
        <!-- 页面主要内容 [完] -->

    </div>
</template>

<script>
import axios from "axios";
import api from "@/api";
import responseHandler from '@/utils/responseHandler';
export default {
    name: "Home",
    data() {
        return {
            nickName: "赖志楚",
            myQuestion:"",
            isAnonymous:false,
            pageCount:1,
            questionList: [
                // {
                //     id: 12,
                //     question: "asdkjasldajslkas",
                //     time: "2019-08-02 20:47:53",
                //     userName: "赖志楚"
                // },
                // {
                //     id: 13,
                //     question: "asdkjasldajslkas",
                //     time: "2019-08-02 20:47:53",
                //     userName: "赖志楚"
                // },
                // {
                //     id: 14,
                //     question: "asdkjasldajslkas",
                //     time: "2019-08-02 20:47:53",
                //     userName: "赖志楚"
                // }
            ]
        };
    },
    created() {
        this.getNickName();
        this.getQuestionList();
    },
    methods: {
        getNickName(){
            axios
                .get("/api" + api.getNickName)
                .then(response => {
                    if(!responseHandler.handle(response.data,this)){return;}
                    this.nickName = response.data.data;
                });
        },
        getQuestionList(page=1){
            axios
                .get("/api" + api.getQuestionList,{
                    params:{
                        page
                    }
                })
                .then(response => {
                    if(!responseHandler.handle(response.data,this)){return;}
                    this.questionList = response.data.data.questions;
                    this.pageCount = response.data.data.pageCount;
                });
        },
        logout(){
            axios
                .post("/api" + api.logout)
                .then(response => {
                    this.$router.push({ name: "Login" });
                });
        },
        createQuestion(){
            if(this.myQuestion.trim()===""){
                this.$message.error({
                    message:'你需要填入你想要提问的内容！',
                    duration:1000    
                });
                return;
            }
            axios
                .post("/api" + api.createQuestion,{
                     question:this.myQuestion,
                     isAnonymous:this.isAnonymous
                })
                .then(response => {
                    if(!responseHandler.handle(response.data,this)){return;}
                    this.myQuestion = "";
                    this.getQuestionList();
                });
        },
        handleProfileOperation(command){
            switch (command) {
                case "logout":
                    this.logout();
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="less">
.home {
    height: 100%;

    nav {
        background: #f8f8f8;
        border-bottom: 1px solid #fdfdfd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        height: 60px;
        box-sizing: border-box;

        h1 {
            color: #777;
            font-size: 18px;
            margin: 0;
        }
    }

    main {
        width: 720px;
        min-height: calc(100% - 60px);
        background: #fff;
        padding: 0 20px;
        margin: 0 auto;
        overflow: hidden;
    }

    .question-item {
        width: 100%;
        background: #fff;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        padding: 20px 20px 40px;
        margin-bottom: 16px;
        position: relative;
        box-sizing: border-box;

        .content {
        }

        .time {
            position: absolute;
            bottom: 10px;
            left: 20px;
            font-size: 12px;
            color: #ccc;
            margin-top: 10px;
        }
    }

    .submit-question-options{
        text-align: right;
        padding:4px;
        box-sizing: border-box;
    }
}
</style>