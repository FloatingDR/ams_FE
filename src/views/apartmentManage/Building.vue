<template>
  <el-container class="view-con">
    <el-aside class="view-bg" width="8%"></el-aside>
    <el-container>
      <el-header class="view-bg" height="10%">
        <p style="color: #fff;float:left;margin-top: 20px;">公寓管理系统</p>
        <login-out></login-out>
      </el-header>
      <el-main class="view-main">
        <munueMain></munueMain>
        <hover-box></hover-box>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="describe">
          <el-breadcrumb-item class="bar-text" :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公寓管理</el-breadcrumb-item>
          <el-breadcrumb-item>建立楼宇</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="init-box">    <!--container(components) all in here!-->
           <p style="color: #2489f3;margin-top: 27%;">功能待开发中</p>
        </div>
        
        <!--<el-table class="loading"-->
                  <!--v-loading="loading"-->
                  <!--:data="tableData">-->
        <!--</el-table>-->

      </el-main>
      <el-footer height="8%" class="view-bg"></el-footer>
    </el-container>
    <el-aside width="8%" class="view-bg"></el-aside>
  </el-container>
</template>

<script>
  import MunueMain from "@/components/main/MunueMain"
  import HoverBox from "@/components/main/hoverBox";
  import LoginOut from "../../components/main/LoginOut";

  export default {
    name: "Building",
    components: {LoginOut, HoverBox, MunueMain},
    data() {
      return {
        // tableData: [{
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }],
        // loading: true
      };
    }
  }
</script>

<style scoped>
.loading{
  width: 60%;
  height: 500px;
  float: left;
  margin-left: 25%;
  margin-top: -1550px;

}
</style>
