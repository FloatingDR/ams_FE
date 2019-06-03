<template>
  <div>
    <el-card class="stepCard">
      <el-steps :active="activeNumber">
        <el-step title="下载模板" icon="el-icon-download"></el-step>
        <el-step title="填写表格" icon="el-icon-edit"></el-step>
        <el-step title="上传文件" icon="el-icon-upload"></el-step>
        <el-step title="上传成功" icon="el-icon-circle-check"></el-step>
      </el-steps>
    </el-card>
    <el-card class="tpl" :body-style="{padding: '10px 10px 10px 20px'}">
      <el-row>
        <el-col :span="24">
          <div class="tpl-tit">
            <span class="act">用户模板下载</span>
          </div>
          <h4></h4>
          <div class="desc">下载模板到本地编辑后上传。</div>
          <div class="btns">
            <div>
              <i class="el-icon-download"></i>
              <a :href="downloadLink" target="new_window">点击下载</a>
            </div>
            <div>
              <i class="el-icon-document"></i>
              <span>在线预览</span>
            </div>
            <div @click="dialogVisible=true">
              <i class="el-icon-info"></i>
              <span>查看帮助</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        title="用户模板下载使用说明"
        :visible.sync="dialogVisible"
        width="60%" >
        <span style="float:left;">用户模板用于管理公寓管理系统的使用者信息，包括创建用户名和密码或者分配用户权限等（除系统管理员及其权限外），涉及到对系统的使用权，该功能只对系统管理员可见。</span>
        <span class="help-span">下载用户模板后，填入信息完毕，上传文件，每次成功上传将会覆盖之前上传的文件。</span>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </el-card>

    <el-upload
      :http-request="upload"
      action="localhost:8081/upload"
      class="upload"
      drag
      accept=".xls, .xlsx"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传xls,xlsx文件</div>
    </el-upload>
  </div>
</template>

<script>
  import {SERVER_BASE} from "@/api/config";
  import axios from 'axios'

  export default {
    name: "stepOne",
    data() {
      return {
        activeNumber: 3, //步骤条进度
        dialogVisible: false,
        downloadLink: SERVER_BASE+"/import/upload"
      }
    },
    methods: {
      download(data) {
        if (!data) {
          return
        }
        let blob = new Blob([data.data], {type: 'application/x-www-form-urlencoded'})
        let url = window.URL.createObjectURL(blob);
        console.log(url);
        let aLink = document.createElement("a");
        aLink.style.display = "none";
        aLink.href = url;
        aLink.setAttribute("download", name+"错误信息反馈.xlsx");
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink); //下载完成移除元素
        window.URL.revokeObjectURL(url); //释放掉blob对象
      },
      upload(param) {
        let that=this;
        let fileObj = param.file;
        let form = new FormData();
        form.append("file", fileObj);
        axios({
            headers: {
                'token': that.globolContext.token
            },
          method: 'post',
          url: SERVER_BASE+'/import/upload',
          data: form,
          responseType: 'blob'
        }).then(function (resp) {
            if(resp.status==200){
                let blob=new Blob([resp.data]);
                if(blob.size==0){
                    that.$message.success("上传成功")
                }else{
                    that.$message.warning("上传失败")
                    that.download(resp)
                }
            }else{
                that.$message.warning("上传失败")
            }
        })
      },
    },
    mounted() {
      this.loginControl();  //登录控制
    }
  };
</script>

<style scoped>
  .stepCard {
    width: 88%;
    height: 90px;
    margin: 5% auto;
  }

  .upload {
    float: right;
    margin-top: 3%;
    margin-right: 6%;
  }

  .tpl {
    float: left;
    margin-top: 30px;
    margin-left: 6%;
    text-align: left;
    width: 45%;
    height: 180px;
  }

  .tpl img {
    margin-top: 10px;
  }

  .tpl .tpl-tit {
    font-size: 14px;
    color: #999;
  }

  .tpl .tpl-tit span {
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
    color: #1890ff;
  }

  .tpl .btns div {
    cursor: pointer;
    margin-right: 30px;
  }

  .tpl .btns a {
    color: #1890ff;
    text-decoration: none;
  }
  .help-span{
    color: #1890ff;
  }
</style>
