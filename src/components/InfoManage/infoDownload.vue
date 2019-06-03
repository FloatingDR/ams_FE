<template>
    <div>
        <el-select v-model="value1" placeholder="请选择要下载的模板" class="selcet1" >
            <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-card class="tpl" :body-style="{padding: '10px 10px 10px 20px'}">
            <el-row>
                <el-col :span="24">
                    <div class="tpl-tit">
                        <span class="act">信息管理模板下载</span>
                    </div>
                    <p class="hdesc">{{showDownloadLink}}</p>
                    <div class="desc">下载模板到本地编辑后上传。</div>
                    <div class="btns">
                        <div>
                            <i class="el-icon-download"></i> <a :href="InfoDownloadLink" target="new_window" @click="logDownplace">点击下载</a>
                        </div>
                        <div @click="showDemo = true">
                            <i class="el-icon-document"></i> <span>在线预览</span>
                        </div>
                        <div @click="dialogVisible=true">
                            <i class="el-icon-info"></i> <span>查看帮助</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8" style="float: left;position: absolute;margin-left: 300px;">
                    <img src="../../assets/tplbg.png" height="120" width="150">
                </el-col>
            </el-row>
            <el-dialog :title="showDownloadLink" :visible.sync="showDemo" width="80%">
                <img :src="demoUrl" style="width: 100%">
            </el-dialog>
            <el-dialog
                    title="信息管理模板下载使用说明"
                    :visible.sync="dialogVisible"
                    width="62%" style="text-align: left">
        <span>信息管理模板用于向公寓管理系统提交各种信息，包括学生信息、宿管信息、辅导员信息等（注：【该界面下载和上传的学生信息只能是已分配的，即已有分配好的床位，不能是未分配学生或者新生，若要上传未分配学生或者新生信息，
          请到公寓管理的公寓分配页上传下载】），信息管理的上传和下载功能共有有四个选项，可选择对应选项进行上传下载，也可在线预览要下载的模板。
        </span>
                <span class="help-span">下载信息管理模板后，填入信息完毕，上传文件，每次成功上传将会覆盖之前上传的内容。</span>
                <span slot="footer" class="dialog-footer">
      </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
  import {SERVER_BASE} from "@/api/config";

  export default {
        name: "infoDownload",
        data(){
            return{
                value1: 'studentInfo',
                showDownloadLink:'',
                showDemo: false,
                dialogVisible:false,
                demoUrl:"",
                options1: [{
                    value: 'studentInfo',
                    label: '学生信息'
                }, {
                    value: 'supervisorInfo',
                    label: '宿管信息'
                }, {
                    value: 'instructorInfo',
                    label: '教师信息'
                },
                //     {
                //     value: 'allInfo',
                //     label: '全部导出'
                // }
                ],
            }
        },
        methods:{
            logDownplace(){
                console.log(this.InfoDownloadLink);
            }
        },
        mounted(){
            this.loginControl();  //登录控制
        },
        computed:{
            InfoDownloadLink(){
                let that=this;
                if(that.value1=="studentInfo"){
                    that.showDownloadLink="学生信息导出";
                    that.demoUrl=require("../../assets/studentdemo.png");
                    return SERVER_BASE+"/upload/student"
                }
                else if(that.value1=="supervisorInfo"){
                    that.showDownloadLink="宿管信息导出";
                    that.demoUrl=require("../../assets/superdemo.png");
                    return SERVER_BASE+"/upload/superviosr"
                }
                else if(that.value1=="instructorInfo"){
                    that.showDownloadLink="辅导员信息导出";
                    that.demoUrl=require("../../assets/instrodemo.png");
                    return SERVER_BASE+"/upload/instructor"
                }
                // else if(that.value1=="allInfo"){
                //     that.showDownloadLink="全部信息导出";
                //     that.demoUrl=require("../../assets/alldemo.png");
                //     return SERVER_BASE+"/upload/basic"
                // }
                else{
                    that.showDownloadLink="";
                    return ""
                }
            }
        }
    }
</script>

<style scoped>
    .selcet1{
        margin-top: 4%;
        margin-left: -32%;
        position: absolute;
    }
    .tpl {
        float: left;
        margin-top: 10%;
        margin-left: 30px;
        text-align: left;
        position: absolute;
        width: 500px;
        height: 180px;
    }

    .tpl img {
        margin-top: 10px;
    }

    .tpl .tpl-tit {
        font-size: 14px;
        color: #999;
    }

    .tpl .tpl-tit span {
        display: inline-block;
        margin-right: 6px;
    }

    .tpl .tpl-tit .act {
        color: #000;
    }

    .tpl .desc {
        margin-top: 30px;
        font-size: 14px;
        color: #888;
    }

    .tpl .btns {
        display: flex;
        margin-top: 50px;
        font-size: 14px;
        color: #1890FF;
    }

    .tpl .btns div {
        cursor: pointer;
        margin-right: 30px;
    }

    .tpl .btns a {
        color: #1890FF;
        text-decoration: none;
    }
    .hdesc{
        position: absolute;
        margin-top: 60px;
        color: #888;
        font-size: 14px;
    }
    .help-span{
        float: left;
        margin-top: 20px;
        color: #1890ff;
    }
</style>
