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
          <el-breadcrumb-item>公寓清空</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="init-box">    <!--container(components) all in here!-->
          <delete></delete>
          <specific-check></specific-check>
          <more-delete></more-delete>



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
  import Delete from "@/components/apartmentManage/Delete";
  import SpecificCheck from "@/components/apartmentManage/specificCheck";
  import MoreDelete from "@/components/apartmentManage/moreDelete";
  import LoginOut from "../../components/main/LoginOut";
  export default {
    name: "apartmentDelete",
    components: {LoginOut, HoverBox, MunueMain,MoreDelete, SpecificCheck, Delete},
    }
</script>

<style scoped>

</style>
