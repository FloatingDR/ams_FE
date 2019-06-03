<template>
    <div>
        <el-select v-model="value2" placeholder="请选择要导入的模板" class="selcet2">
            <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-upload
                :http-request="upload"
                 action="localhost:8081/upload"
                class="upload-demo"
                drag accept=".xls,.xlsx"
                multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xls,xlsx文件</div>
        </el-upload>
    </div>
</template>

<script>
    import {SERVER_BASE} from "@/api/config";
    import fileImport from '@/api/fileImport';
    import axios from 'axios'

    export default {
        name: "infoImport",
        data() {
            return {
                value2: '学生信息',
                options2: [{
                    value: '学生信息',
                    label: '学生信息'
                }, {
                    value: '宿管信息',
                    label: '宿管信息'
                }, {
                    value: '教师信息',
                    label: '教师信息'
                },
                    // {
                //     value: '全部导入',
                //     label: '全部导入'
                // }
                   ],
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
                let FileController = SERVER_BASE+"/import/upload";
                let form = new FormData();
                form.append("file", fileObj);
                // fileImport.infoImport(that.value2,form).then(function (resp) {
                //     if(resp.status==200){
                //         that.$message.success("上传成功");
                //         that.download(resp)
                //         console.log(resp);
                //     }else{
                //         that.$message.warning("上传失败")
                //         that.download(resp.data);
                //     }
                // })
                axios({
                    headers: {
                        'token': that.globolContext.token
                    },
                    method: 'post',
                    url: SERVER_BASE+'/import/upload?type='+that.value2,
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
                // let xhr = new XMLHttpRequest();
                // xhr.open("post", FileController, true);
                // //xhr.upload.addEventListener("progress", vm.progressFunction, false); //监听上传进度
                // xhr.onload = function () {
                //     that.$message.success("上传成功")
                // };
                // xhr.send(form);

            },
        },
        mounted() {
            this.loginControl();  //登录控制
        }
    }
</script>

<style scoped>
    .selcet2 {
        margin-top: 4%;
        margin-left: 6%;
        position: absolute;
    }

    .upload-demo {
        margin-top: 10%;
        margin-left: 40%;
        position: absolute;
    }

</style>
