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
          <el-breadcrumb-item>公寓分配</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="init-box">    <!--container(components) all in here!-->
          <modle-download></modle-download>
          <modle-import></modle-import>


        </div>
      </el-main>
      <el-footer height="8%" class="view-bg"></el-footer>
    </el-container>
    <el-aside width="8%" class="view-bg"></el-aside>
  </el-container>
</template>

<script>
  import MunueMain from "@/components/main/MunueMain"
  import HoverBox from "@/components/main/hoverBox";
  import ModleDownload from "@/components/apartmentManage/modleDownload";
  import LoginOut from "../../components/main/LoginOut";
  import ModleImport from "../../components/apartmentManage/modleImport";
  export default {
        name: "apartmentDistribute",
    components: {ModleImport, LoginOut, HoverBox, MunueMain, ModleDownload},
    }
</script>

<style scoped>

</style>
