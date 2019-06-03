<template>
  <el-container style="overflow-y: hidden">
    <img style="position: absolute;" src="../assets/login.2.png" height="100%" width="100%"/>
    <img style="z-index: 1;top:5%;left: 5%;position: absolute;" src="../assets/banner_title.png" height="7%"
         width="32%"/>
    <el-col :span="4" :offset="18" style="z-index:1;">
      <p style="font-family:'华文新魏';color:#fff;font-size: 45px;margin-top: 3%;position: absolute;">公寓管理系统</p>
    </el-col>
    <el-col :span="2" :offset="11"
            style="margin-top: 7%;border-radius:50%;background:rgba(249,249,249,0.28);z-index: 2;height: 17%;position: absolute;">
      <img style="margin-top: 5%;" src="../assets/logo.png" height="90%" width="90%"/>
    </el-col>
    <el-col :span="6" :offset="9" class="main-box">
      <p style="color: #003f72;font-size: 25px;margin-top: 8%;">登录</p>
      <el-form>
        <el-form-item>
          <el-input class="input-box i-b" clearable placeholder="请输入账号" prefix-icon="el-icon-tay-user"
                    v-model="username" style="width: 300px;" autocomplete="new-password"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-input class="input-box p-b" clearable placeholder="密码" prefix-icon="el-icon-tay-unlock" v-model="password"
                    type="password" style="width: 300px;" @keyup.enter.native="login"
                    autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="input-box" type="primary" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="input-box p-b" type="primary" @click="changePassword">
            修改密码
          </el-button>
        </el-form-item>
      </el-form>
      <span><a href="#" class="a-forget-password">忘记密码？</a></span>
    </el-col>
    
    <el-dialog
        title="修改密码"
        :visible.sync="centerDialogVisible"
        width="25%"
        center>
      <span slot="footer" class="dialog-footer">
      <el-form>
         <el-form-item>
           <el-input placeholder="请输入账号" v-model="change_account" clearable prefix-icon="el-icon-tay-user"
                     class="input-box"></el-input>
         </el-form-item>
         <el-form-item>
           <el-input placeholder="请输入旧密码" type="password" v-model="change_password" show-password
                     prefix-icon="el-icon-tay-unlock" class="input-box" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item>
           <el-input placeholder="请输入新密码" type="password" v-model="change_new_password" show-password
                     prefix-icon="el-icon-tay-unlock" class="input-box" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item>
           <el-input placeholder="确认密码" type="password" v-model="change_accept_password" show-password
                     prefix-icon="el-icon-tay-unlock" class="input-box" autocomplete="new-password"
                     @keyup.enter.native="upChangePassword"></el-input>
        </el-form-item>
      </el-form>
        <div style="margin-top: 40px;">
           <el-button @click="centerDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="upChangePassword">确 定</el-button>
        </div>
   
    
  </span>
    </el-dialog>
  
  </el-container>
</template>
<script>
    import Login from "@/api/Login"

    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                centerDialogVisible: false,
                change_account: '',
                change_password: '',
                change_new_password: '',
                change_accept_password: '',

            }
        },
        methods: {
            login() {
                let qs = require('qs');
                let that = this;
                if (this.username && this.password) {
                    Login.login(this.username,this.password).then(function (resp) {
                        if (resp.data.code==200) {
                            that.globolContext.setToken(resp.data.msg);
                            that.$message.success("登陆成功");
                            that.$cookies.set('username', that.username, 24 * 60 * 60 * 1000);
                            let token_local = Math.random().toString(36).substr(2);
                            that.globolContext.setLoginToken(token_local);
                            that.$cookies.set('token', that.globolContext.loginToken, 24 * 60 * 60 * 1000)
                            that.$router.push({
                                path: "/index"
                            })
                        } else if (resp.data.code == 404) {
                            that.username = '';
                            that.password = '';
                            that.$message.warning("用户不存在,请重试");

                        } else if (resp.data.code == 403) {
                            that.password = '';
                            that.$message.warning("密码错误，请重试");
                        } else {
                            that.username = '';
                            that.password = '';
                            that.$message.warning("登陆失败，请检查用户名和密码")
                        }
                    })

                } else {
                    that.username = '';
                    that.password = '';
                    that.$message.warning("错误！用户名和密码不能为空");
                }
            },
            changePassword() {
                let that = this;
                that.change_account = that.username
                that.centerDialogVisible = true
            },
            upChangePassword() {
                let qs = require('qs');
                let that = this;
                that.centerDialogVisible = false;
                if (that.change_new_password == that.change_accept_password) {
                    Login.changePassword(
                        qs.stringify({
                            userName: that.change_account,
                            oldPass: that.change_password,
                            newPass:that.change_new_password,
                        }, {indices: false})).then(function (resp) {
                        if (resp.data.code == 200) {
                            that.clear();
                            that.$message.success("修改密码成功");
                        } else if(resp.data.code==404){
                            that.clear();
                            that.$message.warning("用户不存在")
                        } else if(resp.data.code==400){
                            that.clear();
                            that.$message.warning("原密码错误")
                        } else{
                            that.clear();
                            that.$message.success("修改失败");
                        }
                    }).catch(function (err) {
                        console.log(err);
                    })
                } else {
                    that.$message.warning("请核对密码");
                    that.clear();
                }
            },
            clear(){
                this.change_password='';
                this.change_new_password='';
                this.change_accept_password='';
            }
        },
        mounted() {
            this.$cookies.remove('username');
            this.$cookies.remove('token');
        }
    }
</script>
<style>
  .main-box {
    background: rgba(255, 255, 255, 0.91);
    margin-top: 13%;
    border-radius: 2%;
    height: 60%;
    z-index: 1;
    position: absolute;
  }
  
  .main-box:hover {
    box-shadow: 3px 3px 3px rgba(239, 239, 239, 0.28),
    3px -3px 3px rgba(239, 239, 239, 0.28),
    -3px 3px 3px rgba(239, 239, 239, 0.28),
    -3px -3px 3px rgba(239, 239, 239, 0.28);
  }
  
  .input-box {
    width: 300px;
  }
  
  /*.p-b {*/
  /*margin-top: 10%;*/
  /*}*/
  
  /*.p-c {*/
  /*margin: 8% 2% 0 auto;*/
  /*}*/
  
  .a-forget-password {
    right: 10px;
    bottom: 15px;
    font-size: 13px;
    color: #636363;
    text-decoration: none;
    position: absolute;
  }
  
  .a-forget-password:hover {
    color: #1083e6;
  }
</style>
