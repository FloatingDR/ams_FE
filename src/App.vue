<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family:PingFangSC-Regular;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background: #003f72;
    text-align: center;
  }
  .view-con{
    margin: 0;
    padding: 0;
    height: 100%;
  }
  .view-bg{
    background: #003f72;
    margin: 0;
    padding: 0;
  }
  .view-main{
    margin: 0;
    padding: 0;
    background: #fff;
    border-radius: 7px;
    overflow: hidden;
  }
  .describe{
    font-size: 15px;
    position: absolute;
    top: 12.5%;
    margin-left: 13.5%;
  }
  .bar-text{
    font-size: 16px;
  }
  .init-box{
    width: 81%;
    height: 1600px;
    float: right;
    margin-top: -1550px;
    margin-right: 3%;
    background: #f2f5fa;
  }
</style>
