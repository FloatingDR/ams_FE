<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>信息导出</span>
      <el-button style="float: right; padding: 4px 0" type="text" icon="el-icon-document" @click="outputBuildingsInfo">
        导出
      </el-button>
    </div>
    <div>
      <span style="float: left;position: relative;">楼栋导出:</span>
      <div style=";">
        <el-checkbox-group
                v-model="checkedBuildingList">
          <el-checkbox
                  style="margin-top: 25px;float: left;margin-bottom: 20px;margin-left: 15px;" border size="medium"
                  v-for="build in builds" :key="build.id" :label="build">{{build}}栋
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </el-card>
</template>

<script>
    import buildingInfo from '@/api/buildingInfo'
    import {SERVER_BASE} from '@/api/config'
    import axios from 'axios'

    export default {
        name: "infoOutput",
        data() {
            return {
                builds: [],
                checkedBuildingList: [],
            };
        },
        mounted() {
            let that = this;
            this.loginControl();  //登录控制
            buildingInfo.getbuildingName().then(function (resp) {
                if (resp.data.code == 200) {
                    that.builds = resp.data.data;
                } else {
                    console.log(err);
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        methods: {
            download(data) {
                let that=this;
                if (!data) {
                    return
                }
                let blob = new Blob([data.data], {type: 'application/x-www-form-urlencoded'})
                let url = window.URL.createObjectURL(blob);
                console.log(url);
                let aLink = document.createElement("a");
                aLink.style.display = "none";
                aLink.href = url;
                let name='';
                if(that.checkedBuildingList.length!=0){
                    for(let i=0;i<that.checkedBuildingList.length;i++){
                        if(i<1){
                            name=that.checkedBuildingList[i]
                        }else{
                            name=name+","+that.checkedBuildingList[i]
                        }
                    }
                }
                aLink.setAttribute("download", name+"楼栋信息.xlsx");
                document.body.appendChild(aLink);
                aLink.click();
                document.body.removeChild(aLink); //下载完成移除元素
                window.URL.revokeObjectURL(url); //释放掉blob对象
            },
            outputBuildingsInfo() {
                let that = this;
                let qs = require('qs');
                if (that.checkedBuildingList.length != 0) {
                    let param = {};
                    param.buildingNumber = that.checkedBuildingList;
                    axios({
                        headers: {
                            'token': that.globolContext.token
                        },
                        method: 'post',
                        url: SERVER_BASE+'/upload/buildinginfo',
                        data: qs.stringify(param,{ indices: false }),
                        responseType: 'blob'
                    }).then(
                        response => {
                        that.download(response)
                    }).catch((error) => {
                        console.log(error);
                    })
                } else {
                    that.$message.warning("请选择要导出的楼栋");
                }
            }
        }
    }
</script>

<style scoped>
  .box-card {
    width: 80%;
    height: 450px;
    margin: 7% auto;
  }
</style>
