<template>
  <el-container class="view-con">
    <el-aside class="view-bg" width="8%"></el-aside>
    <el-container>
      <el-header class="view-bg" height="10%">
        <p style="color: #fff;float:left;margin-top: 20px;">公寓管理系统</p>
        <login-out></login-out>
      </el-header>
      <el-main class="view-main">
        <munueMain></munueMain>
        <hover-box></hover-box>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="describe">
          <el-breadcrumb-item class="bar-text" :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{buildNum}}楼栋信息</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="init-box">    <!--container(components) all in here!-->
          <div style="height: 60px; width: 400px;margin-top: 20px;float: right;margin-right: 5%;">
            <el-input placeholder="请输入您要查找的信息，如姓名、学号等" v-model="search_Info" class="input-with-select" clearable>
              <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
            </el-input>
          </div >
            <el-col :span="3" class="el-div">
              <el-card shadow="hover" style="height: 450px;">
                <p style="font-size: 15px;margin-top: 10px;color: #499fe8">选择楼层</p>
                  <el-menu
                      default-active="1楼" style="width: 200px;margin-left: -60px;"
                      class="el-menu-vertical-demo">
                    <el-menu-item-group v-for="(floor,index)  in floors" :key="floor.value">
                      <el-menu-item :index="floor.label" class="floorList" @click="checkedFloor(index)">{{floor.label}}</el-menu-item>
                    </el-menu-item-group>
                    <!--<el-menu-item index="1" @click="checkedFloor(index)">-->
                      <!--<span slot="title" >{{floor.label}}</span>-->
                    <!--</el-menu-item>-->
                    
                  </el-menu>
              </el-card>
            </el-col>
          
          <el-card class="queryCard" :body-style="{ padding: '20px 60px' }">
            <el-table :data="build_Info" max-height="380" style="background:#fff;">
              <el-table-column prop="roomNo" label="房间"></el-table-column>
              <el-table-column prop="bunkNo" label="床位"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="studentNumber" label="学号"></el-table-column>
              <el-table-column prop="sex" label="性别"></el-table-column>
            </el-table>
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
    import LoginOut from "../components/main/LoginOut";
    import query from '@/api/query'
    import buildingInfo from '@/api/buildingInfo'

    export default {
        name: "apartment",
        components: {LoginOut, HoverBox, MunueMain},
        data() {
            return {
                search_Info: '',
                buildInfoTable: [],
                buildNum: '',
                buildingId:'',
                floors:[],
                floorsData:[],
                buildCache:[],
            }
        },
        methods: {
            getStudent(buildingId,floorNum){
                let that=this;
                query.getBuildingInfo(buildingId,floorNum).then(function (resp) {
                   
                    if (resp.data.code == 200) {
                        that.buildInfoTable = resp.data.data;
                        that.buildCache=resp.data.data;
                        console.log(resp.data.data);

                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
            loadInfo() {
                let that = this;
                if (that.globolContext.sendBuildNum != '') {
                    that.buildNum = that.globolContext.sendBuildNum;
                    console.log("buildingNum:" + that.buildNum);
                    
                    buildingInfo.NametoId(that.buildNum).then(function (resp) {
                        if (resp.data.code == 200) {
                            that.buildingId = resp.data.data;
                            console.log("resp id:" + that.buildingId);
                            that.getStudent(that.buildingId,1);
                            if (that.buildingId) {
                                buildingInfo.getbuildingInfobyId(that.buildingId).then(function (resp) {
                                    if (resp.data.code == 200) {
                                        let arr = [];
                                        for (let i = 0; i < resp.data.data.numberOfFloor; i++) arr[i] = i + 1;
                                        that.floors = arr.map(item => {
                                            return {value: item, label: item + '楼'};
                                        });
                                    }
                                })
                                    .catch(function (err) {
                                        console.log(err);
                                    })
                            }
                        }
                    })
                        .catch(function (err) {
                            console.log(err);
                        });
                } else {
                    that.$router.push({
                        path: "/index"
                    })
                }
            },
            searchInfo() {
                let that = this;
                if (!that.search_Info) {
                    this.$message({
                        showClose: true,
                        message: '错误！搜索内容不能为空，请输入您要搜索的内容',
                        type: 'warning'
                    })
                }
            },
            checkedFloor(index){
                let that=this;
                console.log(index+1);
                let j=0;
                that.getStudent(that.buildingId,index+1);
                // for(let i=0;i<that.buildCache.length;i++){
                //     if(that.buildCache[i].roomNo.slice(0,1)==(index+1)){
                //         that.floorsData[j]=that.buildCache[i];
                //         j++;
                //     }
                // }
                that.buildInfoTable=that.floorsData;
                console.log(that.floorsData);
            }
        },
        mounted() {
            this.loginControl();
            this.loadInfo();
            
        },
        computed: {
            build_Info() {
                let search = this.search_Info;
                if (search) {
                    return this.buildInfoTable.filter(function (table) {
                        return Object.keys(table).some(function (key) {
                            return String(table[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.buildInfoTable
            },
        },
    }
</script>

<style scoped>
  .queryCard {
    width: 80%;
    height: 450px;
    margin-right: 5%;
    float: right;
  }
  .el-div{
    margin-top: 80px;
    height: 450px;
    margin-left: 12px;
  }
  .floorList{
    margin-top: -10px;
  }
</style>
