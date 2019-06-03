<template>
    <el-col :span="12">
      <img src="../../assets/logo.png" height="60" width="60"
           style="position: absolute;left: 12%;"/>
      <el-menu
        class="el-menu-vertical-demo"
        text-color="#717173"
        router
        :default-active="$route.path"
        :default-openeds="openurl"
        unique-opened>
        <el-submenu index="1" >
          <template slot="title">
            <span class="navSpan">查询</span>
          </template>
          <el-menu-item-group >
            <el-menu-item  @click="open1" index="/query/student" class="subSpan sub1">学生查询</el-menu-item>
            <el-menu-item  @click="open1"  index="/query/worker" class="subSpan sub2">职工查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" v-if="userManageShowable">
          <template slot="title">
            <span class="navSpan" >用户管理</span>
          </template>
          <el-menu-item-group >
            <el-menu-item  @click="open2"  index="/user/manage/import" class="subSpan sub1">用户批量导入</el-menu-item>
            <el-menu-item  @click="open2"  index="/user/manage/building/power" class="subSpan sub2">楼宇权限分配</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span class="navSpan">信息管理</span>
          </template>
          <el-menu-item-group >
            <el-menu-item @click="open3" index="/info/mangae/input" class="subSpan sub1">导入</el-menu-item>
            <el-menu-item @click="open3" index="/info/mangae/output" class="subSpan sub2">导出</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span class="navSpan" >公寓管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-if="userManageShowable" @click="open4" index="/manage/building" class="subSpan sub1">建立楼宇</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item @click="open4" index="/manage/distribute" class="subSpan sub1">公寓分配</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item @click="open4" index="/manage/delete" class="subSpan sub1">公寓清空</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item @click="open5" index="/dormitory/adjust">
          <span slot="title" class="navSpan">宿舍调整</span>
        </el-menu-item>
      </el-menu>
    </el-col>
</template>

<script>
  var openurlx=['0',]   //利用created刷新路由菜单状态（保存菜单状态，created不会重置该变量）
    export default {
      name: "munueMain",
      data() {
        return {
          openurl:['0',],
        };
      },
      methods:{
        open1(){
          openurlx=['1',]
        },open2(){
          openurlx=['2',]
        },open3(){
          openurlx=['3',]
        },open4(){
          openurlx=['4',]
        },open5(){
          openurlx=['5',]
        },
        upopenUrl(){
          this.openurl=openurlx;
        }
      },
      created(){
        this.upopenUrl();
      },
      computed:{
          userManageShowable(){
              let that=this;
              if(that.$cookies.get('username')=='admin'){
                  return true;
              }
              return false;
          }
      }
    }
</script>

<style scoped>
.el-menu-vertical-demo{
  top: 60px;
  left: 0;
  width: 25%;
  border: 0;
  text-align: left;
  overflow: hidden;
}
</style>
