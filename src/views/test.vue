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
          <el-breadcrumb-item>查询</el-breadcrumb-item>
          <el-breadcrumb-item>学生查询</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="init-box">    <!--container(components) all in here!-->
          
          <el-col :span="12">
            <h5>默认颜色</h5>
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
               >
              
                <el-menu-item-group>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
              
              
            </el-menu>
          </el-col>
        
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
    import LoginOut from "@/components/main/LoginOut";

    export default {
        name: 'test',
        components: {LoginOut, HoverBox, MunueMain},
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style>
  .view-main{
    overflow: hidden;
  }
</style>
