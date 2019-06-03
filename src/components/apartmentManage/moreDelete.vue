<template>
  <div class="deletecheck">
    <el-select v-model="check_to_delete" placeholder="请选择清空的类型" style="width: 150px;"
               @change="resetOtherStation($event)">
      <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="floor_to_delete" placeholder="选择楼栋" v-if="check_build" style="width: 150px;"
               @change="checkBuild($event)">
      <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="room_to_delete" placeholder="选择楼层" v-if="check_floor" style="width: 150px;"
               @change="checkFloor($event)">
      <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
      </el-option>
    </el-select>
    <el-card shadow="always" class="more-delete">
      <span>{{delete_message}}</span>

      <div v-if="show_buids_delete&&!show_room_delete">
        <el-checkbox-group v-model="checkedBuilds" style="margin-top: 20px;" size="medium">
          <el-checkbox style="float:left;margin-top: 15px;margin-left: 15px;" border size="medium"
                       v-for="build in builds" :label="build" :key="build ">{{build}}栋
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-if="!show_buids_delete">
        <el-radio-group v-model="checkedFloors" style="margin-top: 20px;" max="1">
          <el-radio style="float:left;margin-top: 15px;margin-left: 15px;"
                       v-for="floor in floors" :label="floor" :key="floor">{{floor}}楼
          </el-radio>
        </el-radio-group>
      </div>
      <div v-if="show_room_delete">
        <el-checkbox-group v-model="checkedRooms" style="margin-top: 20px;">
          <el-checkbox style="float:left;margin-top: 15px;margin-left: 15px;"
                       v-for="room in roomObj.rooms" :label="room" :key="room">{{room}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button style="bottom: 30px;right: 20px;position: absolute;" type="primary" icon="el-icon-delete"
                 @click="deleteInfo">清空
      </el-button>
    </el-card>
  </div>
</template>

<script>
    import buildingInfo from '@/api/buildingInfo'

    export default {
        name: "moreDelete",
        data() {
            return {
                buildingId: '',
                checkedBuilds: [],
                checkedFloors: [],
                checkedRooms: [],
                builds: [],
                floors: [],
                roomObj:{
                    id:[],
                    rooms: [],
                },
                check_to_delete: 'builingEmpty',
                floor_to_delete: '',
                room_to_delete: '',
                options1: [{
                    value: 'builingEmpty',
                    label: '楼栋清空'
                }, {
                    value: 'floorEmpty',
                    label: '楼层清空'
                }, {
                    value: 'roomEmpty',
                    label: '房间清空'
                }],
                options2: [],
                options3: [],
            };

        },
        methods: {
            resetOtherStation(value) {
                let that = this;
                if (value == 'builingEmpty') {
                    that.floor_to_delete = '';
                    that.roomObj.rooms = [];
                    that.checkedRooms = [];
                    that.floors = '';
                } else if (value == 'floorEmpty') {
                    that.room_to_delete = '';
                    that.roomObj.rooms = [];
                    that.checkedRooms = [];
                } else if (value == 'roomEmpty') {

                }
            },
            checkBuild(build) {
                console.log(build);
                let that = this;
                if (build) {
                    let that = this;
                    buildingInfo.NametoId(build).then(function (resp) {
                        if (resp.data.code == 200) {
                            that.buildingId = resp.data.data;
                            console.log("resp id:" + that.buildingId);
                            if (that.buildingId) {
                                buildingInfo.getbuildingInfobyId(that.buildingId).then(function (resp) {
                                    if (resp.data.code == 200) {
                                        let arr = [];
                                        that.roomObj.rooms = [];
                                        that.room_to_delete = '';
                                        that.checkedRooms = [];
                                        that.checkedFloors = [];
                                        for (let i = 0; i < resp.data.data.numberOfFloor; i++) arr[i] = i + 1;
                                        that.floors = arr;
                                        that.options3 = arr.map(item => {
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
                }
            },
            checkFloor() {
                let that = this;
                if (that.room_to_delete && that.buildingId) {
                    console.log("room_to_delete:" + that.room_to_delete + ",buildingId:" + that.buildingId);
                    buildingInfo.getAllRoomById(that.buildingId).then(function (resp) {
                        if (resp.data.code == 200) {
                            that.roomObj.rooms = [];
                            that.checkedRooms = [];
                            let j=0;
                            for (let i = 0; i < resp.data.data.length; i++) {
                                if (resp.data.data[i].floorNumber == that.room_to_delete) {
                                    that.roomObj.rooms[j] = resp.data.data[i].roomNumber;
                                    that.roomObj.id[j]=resp.data.data[i].roomId;
                                    j++;
                                }
                            }
                            console.log(that.roomObj);
                        }
                    })
                        .catch(function (err) {
                            console.log(err);
                        })
                }
            },
            deleteInfo() {
                let that = this;
                if (that.check_to_delete == "builingEmpty") {  //楼栋清空
                    console.log(that.checkedBuilds);
                    if (that.checkedBuilds.length) {
                        let qs=require('qs');
                        let checkedbuildsIdList=[];
                        function changeList() {
                            for(let i in that.checkedBuilds){
                                buildingInfo.NametoId(that.checkedBuilds[i]).then(function(resp){
                                    if(resp.data.code==200){
                                        checkedbuildsIdList[i]=resp.data.data;
                                    }
                                }).catch(function (err) {
                                    console.log(err);
                                })
                            }
                            that.$message.warning("正在删除，请稍后")
                            setTimeout(() => deleteMessage(checkedbuildsIdList), 2000);
                        }
                        changeList();
                        function deleteMessage(idlist){
                            if(idlist.length){
                                console.log("checked build id list :"+idlist);
                                let param = {};
                                param.content = idlist;
                                buildingInfo.deletebuildingInfobyId(
                                    qs.stringify(param,{ indices: false }),
                                ).then(function (resp) {
                                    if(resp.data.code==200){
                                        that.$message.success("删除成功");
                                    }else{
                                        that.$message.warning("删除失败");
                                    }
                                })
                                    .catch(function (err) {
                                        console.log(err);
                                    })
                            }else{
                                that.$message.warning("删除失败，请重试")
                            }
                        }
                    } else {
                        that.$message.warning("错误！删除信息为空")
                    }
                } else if (that.check_to_delete == "floorEmpty") { //楼层清空
                    console.log("buildId:" + that.buildingId + ",checkedFloors:" + that.checkedFloors);
                    if (that.buildingId && that.checkedFloors) {
                        buildingInfo.deleteFloor(that.buildingId,that.checkedFloors).then(function (resp) {
                            if(resp.data.code==200){
                                that.$message.success("删除成功");
                            }else{
                                that.$message.warning("删除失败");
                            }
                        })
                    } else {
                        that.$message.warning("错误！删除信息为空")
                    }
                } else if (that.check_to_delete == "roomEmpty") { //房间清空

                    that.rooms=[];
                    console.log("buildId:" + that.buildingId + ",floorNumber:" + that.room_to_delete + ",checkedRooms:" + that.checkedRooms);
                    if (that.buildingId && that.room_to_delete && that.checkedRooms.length&&that.roomObj) {
                        let params={};
                        let list=[];
                        function getParams(){
                            for(let i=0;i<that.checkedRooms.length;i++){
                                for(let j=0;j<that.roomObj.rooms.length;j++){
                                    if(that.checkedRooms[i]==that.roomObj.rooms[j]){
                                        list[i]=that.roomObj.id[j];
                                        break;
                                    }
                                }
                            }
                            that.$message.warning("正在删除，请稍后")
                            setTimeout(() => deleteByRoomIdList(), 2000);
                        }
                        getParams();
                        function deleteByRoomIdList(){
                            let qs=require('qs');
                            params.roomIds=list;
                            buildingInfo.deleteRoomsByIdList(
                                qs.stringify(params,{ indices: false }),
                            ).then(function (resp) {
                                if(resp.data.code==200){
                                    that.$message.success("删除成功");
                                }else{
                                    that.$message.warning("删除失败");
                                }
                            }).catch(function (err) {
                                console.log(err);
                            })
                        }

                    } else {
                        that.$message.warning("错误！删除信息为空")
                    }
                } else {
                    console.log("err:check_to_delete is null");
                    that.$message.warning("错误！删除信息为空")
                }
            }
        },
        mounted() {
            let that = this;
            this.loginControl();  //登录控制
            buildingInfo.getbuildingName().then(function (resp) {
                if (resp.data.code == 200) {
                    that.builds = resp.data.data;
                }
            }).catch(function (err) {
                console.log(err);
            });
            buildingInfo.getbuildingName().then(function (resp) {
                if (resp.data.code == 200) {
                    that.options2 = resp.data.data.map(item => {
                        return {value: item, label: item + '栋'};
                    });
                }
            })
                .catch(function (err) {
                    console.log(err);
                });

        },
        computed: {
            check_build() {
                return (this.check_to_delete != 'builingEmpty') ? true : false;
            },
            check_floor() {
                return (this.check_to_delete == 'roomEmpty') ? true : false;
            },
            delete_message() {
                if (this.check_to_delete == 'builingEmpty') {
                    return "楼栋清空";
                } else if (this.check_to_delete == 'floorEmpty') {
                    return "楼层清空";
                } else {
                    return "房间清空";
                }
            },
            show_buids_delete() {
                return (this.check_to_delete == 'floorEmpty') ? false : true;
            },
            show_room_delete() {
                return (this.check_to_delete == 'roomEmpty') ? true : false;
            }
        }
    }
</script>

<style scoped>
  .deletecheck {
    height: 400px;
    width: 45%;
    position: absolute;
    margin-left: 19%;
  }

  .more-delete {
    height: 330px;
    margin-top: 15px;
  }
</style>
