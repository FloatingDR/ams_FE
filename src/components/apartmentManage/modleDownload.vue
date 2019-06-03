<template>
  <el-card class="tpl" :body-style="{padding: '10px 10px 10px 20px'}">
    <el-row>
      <el-col :span="24">
        <div class="tpl-tit">
          <span class="act">公寓分配模板下载（新生或没有分配宿舍的学生）</span>
        </div>
        <h4></h4>
        <div class="desc">下载模板到本地编辑后上传。</div>
        <div class="btns">
          <div>
            <i class="el-icon-download"></i> <a :href="InfoDownloadLink" target="new_window">点击下载</a>
          </div>
          <div @click="showDemo = true">
            <i class="el-icon-document"></i> <span>在线预览</span>
          </div>
          <div @click="dialogVisible=true">
            <i class="el-icon-info"></i> <span>查看帮助</span>
          </div>
        </div>
      </el-col>
      <el-col :span="8" style="float: right;margin-right: 10px;">
        <img src="../../assets/tplbg.png" height="120" width="150">
      </el-col>
    </el-row>
    <el-dialog title="模板查看" :visible.sync="showDemo" width="80%">
      <img :src="demoUrl" style="width: 100%;margin-left: -20px;">
    </el-dialog>
    <el-dialog
      title="公寓分配模板下载使用说明"
      :visible.sync="dialogVisible"
      width="60%" style="text-align: left">
      <span class="help-span">公寓分配模板用于对新生或者未分配床位的学生进行公寓分配，为方便系统进行分配，应该对学生信息进行基础编辑，模板在模板下载处下载。由于各个学院学生的宿舍楼不固定，为保证不混乱，需要上传者手动选择要上传至哪一栋，系统将在这一栋楼寻找空床进行自动分配。分配完毕后可在线预览分配方案，若对分配结果不满意可以手动填写分配方案后在信息管理的导入页导入，或者在宿舍调整页进行微调。</span>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
  import {SERVER_BASE} from "@/api/config";

  export default {
      name: "modleDownload",
      data(){
          return{
            showDemo: false,
            dialogVisible:false,
            demoUrl:require("../../assets/studentdemo.png"),
            InfoDownloadLink:SERVER_BASE+"/upload/basic",
          }
      },
      mounted() {
          this.loginControl();  //登录控制
      }
  }
</script>

<style scoped>
  .tpl {
    float: left;
    margin-top: 2%;
    margin-left: 10%;
    text-align: left;
    width: 60%;
    height: 200px;
  }
  .tpl img {
    margin-top: -120px;
    position: absolute;
  }
  .tpl .tpl-tit {
    font-size: 14px;
    color: #999;
  }
  .tpl .tpl-tit span{
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
  .help-span{
    color: #1890ff;
  }
</style>
