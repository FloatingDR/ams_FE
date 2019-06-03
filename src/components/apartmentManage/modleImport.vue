<template>
  <div>
    <el-upload
        :http-request="upload"
        action="localhost:8081/upload"
        class="upload"
        drag accept=".xls,.xlsx"
        multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传xls,xlsx文件</div>
    </el-upload>
    <el-dialog title="分配方案" :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="freshmanTable" max-height="330" style="background:#fff;">
        <el-table-column fixed prop="build" label="楼栋" width="80"></el-table-column>
        <el-table-column fixed prop="roomNo" label="寝室号" width="80"></el-table-column>
        <el-table-column fixed prop="bunkId" label="床位" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="studentNumber" label="学号" width="120"></el-table-column>
        <el-table-column prop="gender" label="性别" width="80"></el-table-column>
        <el-table-column prop="identifyNumber" label="身份证号" width="190"></el-table-column>
        <el-table-column prop="nation" label="民族" width="100"></el-table-column>
        <el-table-column prop="place" label="籍贯" width="100"></el-table-column>
        <el-table-column prop="school" label="学院" width="100"></el-table-column>
        <el-table-column prop="major" label="专业" width="150"></el-table-column>
        <el-table-column prop="grade" label="年级" width="80"></el-table-column>
        <el-table-column prop="studentClass" label="班级" width="80"></el-table-column>
        <el-table-column prop="status" label="职务" width="80"></el-table-column>
        <el-table-column prop="instructorId" label="辅导员" width="80"></el-table-column>
        <el-table-column prop="tel" label="联系方式" width="120"></el-table-column>
        <el-table-column prop="photo" label="照片" width="120"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unaccept">取 消</el-button>
        <el-button type="primary" @click="accept">接 受</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {SERVER_BASE} from "@/api/config";
    import axios from 'axios'

    export default {
        name: "modleImport",
        data() {
            return {
                modleImport_action: SERVER_BASE + "/import/upload_basic",
                dialogTableVisible: false,
                freshmanTable: [
                    {
                        name: "",
                        studentNumber: "",
                        gender: "",
                        identifyNumber: "",
                        nation: "",
                        place: "",
                        build: "",
                        roomNo: "",
                        bunkId: "",
                        school: "",
                        major: "",
                        grade: "",
                        studentClass: "",
                        status: "",
                        instructorId: "",
                        tel: "",
                        photo: "",
                    }
                ]
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
            unaccept() {
                let that = this;
                that.dialogTableVisible = false;


            },
            accept() {
                let that = this;
                that.dialogTableVisible = false;

                that.$message.success("分配成功！");
            }
        },
        mounted() {
            this.loginControl();  //登录控制
        }
    }
</script>

<style scoped>
  .upload {
    margin-top: 20px;
    float: left;
    margin-left: 10%;
  }
</style>
