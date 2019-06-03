<template>
  <el-card shadow="always" class="checklist">
    <span>床位清空</span>
    <el-select class="subcheck" v-model="val1" clearable placeholder="请选择楼栋"
               @change="selectBuild($event)">
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select class="subcheck" v-model="val2" clearable placeholder="请选择寝室" :disabled="room_check_able"
               @change="selectRoom($event)">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select class="subcheck" v-model="val3" clearable placeholder="请选择床位" :disabled="bunk_check_able"
               @change="selectBunk($event)">
      <el-option
        v-for="item in options3"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

  </el-card>
</template>

<script>
  import buildingInfo from '@/api/buildingInfo'
  import apartmentManage from '@/api/apartmentManage'

  export default {
    name: "specificCheck",
    data() {
      return {
        val1: '',
        val2: '',
        val3: '',
        bunkId: '',
        buildId: '',
        roomId: '',
        options1: [],
        options2: [],
        options3: [],
        getAllRoomById_cache:[],
        numberOfBunk:'',
      }
    },
    computed: {
      room_check_able() {
        let that = this;
        return (that.val1) ? false : true;
        console.log(that.val1);
      },
      bunk_check_able() {
        let that = this;
        return (that.val2 && that.val1) ? false : true;
      }
    },
    mounted() {
      let that = this;
        this.loginControl();  //登录控制
      buildingInfo.getbuildingName().then(function (resp) {
        if (resp.data.code == 200) {
          that.options1 = resp.data.data.map(item => {
            return {value: item, label: item + '栋'};
          });
        }
      })
        .catch(function (err) {
          console.log(err);
        });
    },
    methods: {
      selectBuild(build) {
        let that = this;
        that.val2 = '';
        that.val3 = '';
        that.roomId = '';
        that.sendbunkId.$emit('toChangeStudentInfo', 0);
        buildingInfo.NametoId(build).then(function (resp) {
          if (resp.data.code == 200) {
            that.buildId = resp.data.data;
            console.log("resp buildId:" + that.buildId);
            if (that.buildId) {
              buildingInfo.getAllRoomById(that.buildId).then(function (resp) {
                if (resp.data.code == 200) {
                  let arr = [];
                  that.getAllRoomById_cache=resp.data.data;
                  //console.log(that.getAllRoomById_cache);
                  for (let i = 0; i < resp.data.data.length; i++) {
                    arr[i] = resp.data.data[i].roomNumber;
                  }
                  console.log(arr);
                  that.options2 = arr.map(item => {
                    return {value: item, label: build + '-' + item};
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
          })
      },
      getRoomIdByVal2(val2){
        let that=this;
        let roomid='';
        that.numberOfBunk='';
        that.getAllRoomById_cache.forEach(function (v,i) {
          if(v.roomNumber==val2){
            roomid=v.roomId;
            that.numberOfBunk=v.numberOfBunk;
            return;
          }
        })
        return roomid;
      },
      selectRoom() {
        let that = this;
        that.roomId = '';
        that.val3 = '';
        that.sendbunkId.$emit('toChangeStudentInfo', 0);
        if(that.val2&&that.getAllRoomById_cache){
            that.roomId=that.getRoomIdByVal2(that.val2);
            console.log(that.roomId);
            if(that.numberOfBunk){
              let arr = [];
              for (let j = 0; j < that.numberOfBunk; j++) {
                arr[j] = j + 1;
              }
              that.options3 = arr.map(item => {
                return {value: item, label: item + "号床"};
              });
            }else{
              console.log("numberOfBunk is null")
            }
        }else{
          console.log("that.val2 or that.getAllRoomById_cache is null")
        }
        // if (that.val2) {
        //   buildingInfo.getAllRoomById(that.buildId).then(function (resp) {
        //     // if(resp.data.code==200){
        //     //   console.log("val2=" + that.val2);
        //     //   for (let i = 0; i < resp.data.data.length; i++) {
        //     //     if (resp.data.data[i].roomNumber == that.val2) {
        //     //       console.log(resp.data.data[i]);
        //     //       console.log("roomNumber=" + resp.data.data[i].roomNumber);
        //     //       that.roomId = resp.data.data[i].roomId;
        //     //       let bunkNumber = resp.data.data[i].numberOfBunk;
        //     //       let arr = [];
        //     //       for (let j = 0; j < bunkNumber; j++) {
        //     //         arr[j] = j + 1;
        //     //       }
        //     //       that.options3 = arr.map(item => {
        //     //         return {value: item, label: item + "号床"};
        //     //       });
        //     //       break;
        //     //     } else{
        //     //       console.log(resp.data.data[i].roomNumber == that.val2);
        //     //       console.log(",roomNumber=" + resp.data.data[i].roomNumber + ",val2=" + that.val2);
        //     //     }
        //     //   }
        //     //   console.log("roomId:"+that.roomId);
        //     // }else{
        //     //   console.log(resp.data.code+","+resp.data.msg);
        //     // }
        //
        //   })
        //     .catch(function (err) {
        //       console.log(err);
        //     })
        // }else{
        //   console.log("val2 is null");
        // }
      },
      selectBunk() {
        let that = this;
        that.sendbunkId.$emit('toChangeStudentInfo', 0);
        if (that.val3 && that.roomId) {
          console.log("roomId:" + that.roomId + ",val3:" + that.val3);
          apartmentManage.getBunkId(that.roomId, that.val3).then(function (resp) {
            that.sendbunkId.$emit('toChangeStudentInfo', resp.data.data);
            if (resp.data.code == 200) {
              that.buildId = resp.data.data;
              console.log("bunk id is:" + that.buildId);
            } else {
              console.log('bunkid is null');
            }
          })
            .catch(function (err) {
              console.log(err);
            })
        }else{
          console.log("that.val3:"+that.val3+",that.roomId:"+that.roomId);
        }
      }
    }
  }
</script>

<style scoped>
  .subcheck {
    margin-top: 35px;
  }

  .checklist {
    width: 200px;
    height: 331px;
    margin-top: 55px;
    position: absolute;
    margin-left: 4%;
  }
</style>
