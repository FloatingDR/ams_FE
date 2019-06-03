<template>
  <div class="loging-container">
    <el-dropdown @command="handleCommand">
      <div class="Login-photo">
        <img src="@/assets/user.jpg" class="login-img"/>
      </div>
      <p class="login-p">{{user}}</p>
      <el-dropdown-menu slot="dropdown" style="width: 150px;">
        <el-dropdown-item>账号信息</el-dropdown-item>
        <el-dropdown-item command="changeAccount">切换账号</el-dropdown-item>
        <el-dropdown-item command="out">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定要退出登录吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="loginOut">确 定</el-button>
     </span>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "LoginOut",
      data(){
        return{
          user:'',
          dialogVisible:false,
        }
      },
       mounted(){
           this.user=this.$cookies.get('username')
       },
      methods: {
        handleCommand(command){
          let that=this;
          if(command=='out'){
            that.dialogVisible=true;

          }else if(command=='changeAccount'){
            this.$router.push({
              path: "/login",
            })
          }
        },
        loginOut(){
          let that=this;
          this.loginControl();  //登录控制
          that.dialogVisible=false;
          this.$message({
            showClose: true,
            message: '已退出登录',
            type: 'warning'
          });
          this.$router.push({
            path: "/",
          });
        }
      },
    }
</script>

<style scoped>
  .loging-container{
    width: 180px;
    margin-top: 1%;
    float: right;
  }
  .login-img{
    width: 100%;
    height: 100%;
  }
  .Login-photo{
    width: 50px;
    height: 50px;
    position: absolute;
    border-radius:50%;
    overflow: hidden;
    cursor: pointer;
  }
  .Login-photo:hover{
    box-shadow: 2px 2px 2px rgba(239, 239, 239, 0.28),
    2px -2px 2px rgba(239, 239, 239, 0.28),
    -2px 2px 2px rgba(239, 239, 239, 0.28),
    -2px -2px 2px rgba(239, 239, 239, 0.28);
  }
  .login-p{
    color: #d9d9d9;
    float: left;
    margin-left: 70px;
    cursor: pointer;
  }
  .login-p:hover{
    color: #fff;
  }
  .message{
    color: #fff;
    float: left;
    margin-left: 30px;
    font-size: 14px;
    margin-top: 15px;
    cursor: pointer;
  }
</style>
