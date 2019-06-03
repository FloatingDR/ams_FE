<template>
  <el-container class="view-con">
    <el-aside class="view-bg" width="8%"></el-aside>
    <el-container>
      <el-header class="view-bg" height="10%">
        <p style="color: #fff;float:left;margin-top: 20px;">公寓管理系统</p>
        <LoginOut></LoginOut>
      </el-header>
      <el-main class="view-main">
        <munueMain></munueMain>
        <hover-box></hover-box>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="describe">
          <el-breadcrumb-item class="bar-text" :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{local}}区</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="init-box"><!--container(components) all in here!-->
      
          <el-select v-model="area" placeholder="请选择" class="areaCheck" @change="checkArea($event)">
            <el-option
                v-for="item in areacheck"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
  
          <el-card class="queryCard" :body-style="{ padding: '10px 40px' }">
            <div v-for="(build,index) in buildAreas" @click="click(index)" @mouseover="buttonHover(index)" class="buildNames">
              <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                  :content="content">
                <div>
                  <img src="@/assets/suguan.png" height="140" width="110" style="float:left;"/>
                  <div style="margin-left: 20px;float:left;">
                    <p>{{build.buildingNumber}}栋</p>
                    <p>宿管姓名：{{build.supName}}</p>
                    <p>宿管工号：{{build.supNum}}</p>
                    <!--<p>楼栋人数：{{build.totalNum}}</p>-->
                  </div>
                </div>
                <el-button slot="reference" class="buildName" >{{build.buildingNumber}}栋</el-button>
              </el-popover>
               <!--<el-button  class="buildName">{{build}}栋</el-button>-->
            </div>
          </el-card>
        
        </div>
      </el-main>
      <el-footer height="8%" class="view-bg"></el-footer>
    </el-container>
    <el-aside width="8%" class="view-bg"></el-aside>
  </el-container>
</template>

<script>
    import MunueMain from "@/components/main/MunueMain"
    import HoverBox from "@/components/main/hoverBox";
    import LoginOut from "@/components/main/LoginOut";
    
    import query from "@/api/query";

    export default {
        name: "Index",
        components: {LoginOut, HoverBox, MunueMain},
        data(){
            return{
                area:'1',
                local:'西',
                content:'',
                areacheck: [{
                    value: '1',
                    label: '西区'
                }, {
                    value: '2',
                    label: '东区'
                },],
                buildAreas:[
                    // {
                    //     buildingNumber:'0',
                    //     supName:'',
                    //     supNum:'1',
                    // },
                ],
            }
        },
        mounted() {
            this.getNumbyLocal("西");
        },
        methods: {
            click(index){
                let that=this;
                console.log(that.buildAreas[index].buildingNumber);
                that.globolContext.setBuildNum(that.buildAreas[index].buildingNumber);
                console.log("send:"+that.globolContext.sendBuildNum)
                that.$router.push({
                    path: "/index/Apartment",
                })
            },
            buttonHover(index){
                let that=this;
                
            },
            checkArea(val){
                let that=this;
                if(val=='1'){    //西区
                   that.local="西"
                    that.getNumbyLocal("西");
                }else if(val=='2'){   //东
                    that.local="东"
                    that.getNumbyLocal("东");
                }
            },
            getNumbyLocal(local){
                let that=this;
                query.getBuildnumByLocal(local).then(function (resp) {
                    let dataLocal=[];
                    if(resp.data.code==200){
                        console.log(resp.data.data);
                        that.buildAreas=resp.data.data;
                    }else{
                        that.$message.warning("网络错误")
                    }
                })
                    .catch(function (err) {
                        console.log(err);
                    })
            }
        }
    }
</script>

<style scoped>
  .areaCheck{
    margin-top: 15px;
    float: left;
    margin-left: 50px;
    margin-bottom: 15px;
  }
  .queryCard {
    width: 90%;
    height: 450px;
    margin: 0 auto;
  }
  .buildNames{
    margin-top: 30px;
  }
  .buildName{
    float: left;
    margin-top: 30px;
    margin-left: 50px;
  }
  .intorduceInfo{
  
  }
  .supervisor{
  
  }
</style>
