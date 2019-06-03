<template>
  <div class="introduce">
    <div
      style="width: 100%;height:100%;position:absolute;z-index: 10;margin-top: 0;margin-left: 0px;">
      <img src="../assets/banner_title.png" height="7%" width="32%"
           style="z-index: 11;top:5%;left: 5%;position: absolute;"/></div>
    <img class="logo z_index" src="../assets/logo.png" height="60" width="60" />
    <el-col :span="4" :offset="4" class="intro-text z_index">
      <p class="textConChinese1">公寓</p>
      <p class="textConChinese2">管理系统</p>
      <hr color="#fff" width="90%" size="1" style="float: right;margin-top: -5%;"/>
      <p class="textConEnglish1">Apartment</p>
      <p class="textConEnglish2">Management System</p>
    </el-col>
    <el-col :span="4" :offset="4" class="public-notice z_index">
      <p class="noticeConChinese n1">公告：</p>
      <p class="noticeConChinese n2">追根溯源 , 登高之台已筑起</p>
      <p class="noticeConChinese n2">加深了解 , 少年壮志情飞扬</p>
      <p class="noticeConChinese n2">严守纪律 , 党团在心素质高</p>
    </el-col>
    <el-col :span="1" :offset="20" class="login-button-div" >
      <div class="login-button" @click="loginRouter">登录</div>
    </el-col>
    <el-col :span="4" :offset="18">
      <p class="system-name z_index" style="font-family: '华文新魏';">公寓管理系统</p>
    </el-col>
    <el-carousel class="el-carou" :height="getHeight + 'px'" indicator-position="none">
      <el-carousel-item v-for="item in images" :key="item.id">
        <img :src="item.src" height="100%" width="100%"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>

  export default {
    name: 'Introduce',
    data() {
      return {
        images: [
          {
            id: 1,
            src: require('../assets/into_c.png')
          },
          {
            id: 2,
            src: require('../assets/into_a.png')
          },
          {
            id: 3,
            src: require('../assets/into_f.png')
          },
          {
            id: 4,
            src: require('../assets/into_u.png')
          },
          {
            id: 5,
            src: require('../assets/into_fc.png')
          },
          {
            id: 6,
            src: require('../assets/into_cafuc.png')
          },
        ],
        bannerHeight: '',
      }
    },
    methods: {
      loginRouter(){
        this.$router.push({
          path: "/login",
        })
      }
    },
    computed: {
      getHeight() {
        let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
        return height;
      }
    },
      mounted() {
        this.$cookies.remove('username');
      }
  }
</script>
<style>
  .z_index{
    z-index:11;
  }
  .introduce {
    width: 100%;
    height: 100%;
    background: #000;
    position: absolute;
  }
  .logo{
    position: absolute;
    margin-top: 2.5%;
    margin-left:20% ;
  }
  .system-name{
    font-family:'华文新魏';
    color:#fff;
    font-size: 45px;
    margin-top: 3%;
    position: absolute;
  }
  .intro-text{
    position: absolute;
    margin-top: 13%;
  }
  .textConChinese1{
    float: right;
    font-size: 25px;
    margin-left: 150px;
    color: #fff;
  }
  .textConChinese2{
    float: right;

    margin-top: -7%;
    font-size: 25px;
    margin-left: 50%;
    color: #fff;
  }
  .textConEnglish1{
    float: right;
    color: #fff;
    font-size: 22px;
    margin-top: -3%;
  }
  .textConEnglish2{
    float: right;
    color: #fff;
    font-size: 22px;
    margin-top: -6%;
  }
  .public-notice{
    position: absolute;
    margin-top: 30%;
  }
  .noticeConChinese{
    font-size: 17px;
    color: #fff;
    float: right;
  }
  .n1{
    margin-left: 30%;
  }
  .n2{
    margin-top:-4% ;
  }
  .login-button-div{
    z-index: 11;
    bottom: 10%;
    position: absolute;
    cursor: pointer;
  }
  .login-button{
    color: #d6d6d6;
    height: 30px;
    line-height: 30px;
    border-radius: 20px;
    border: 1px solid #d6d6d6;
  }
  .login-button-div :hover{
    color: #fff;
    border: 1px solid #fff;
  }
</style>
