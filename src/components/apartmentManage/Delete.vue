<template>
  <el-row class="topDelete" >
    <el-col>
      <el-card shadow="always">
        <span class="messBox">姓名：{{name}}</span>
        <span class="messBox">学号：{{id}}</span>
        <span class="messBox">专业：{{major}}</span>
        <el-popover class="dele"
                    placement="top"
                    width="160"
                    v-model="visible2">
          <p>确定要删除该信息吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="deleteStudent">确定</el-button>
          </div>
          <el-button type="primary" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
        </el-popover>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import apartmentManage from '@/api/apartmentManage'
    export default {
      name: "Delete",
      data(){
        return{
          name:'暂无数据',
          id:'暂无数据',
          major:'暂无数据',
          bunkId:'',
          visible2: false,
        }
      },
      mounted(){
        let that=this;
        that.getStudentInfo();
        this.loginControl();  //登录控制
      },
      methods:{
        getStudentInfo(){
          let that=this;
          that.sendbunkId.$on('toChangeStudentInfo',function (bunkId) {
            if(bunkId){
              that.bunkId=bunkId;
              console.log("recived bunkId is:"+bunkId);
              apartmentManage.getStudentInfobybunkId(bunkId).then(function (resp) {
                if(resp.data.code==200){
                  that.name=resp.data.data.name;
                  that.id=resp.data.data.studentNumber;
                  that.major=resp.data.data.major;
                }
              })
                .catch(function (err) {
                  console.log(err);
                })
            }else{
              that.bunkId='';
              that.name='暂无数据';
              that.id='暂无数据';
              that.major='暂无数据';
            }
          })
        },
        deleteStudent(){
          let that=this;
          that.visible2=false;
          console.log("ready to delete bunkId is"+that.bunkId);
          if(that.bunkId){
            apartmentManage.deleteStudentByBunkId(that.bunkId).then(function (resp) {
              if(resp.data.code==200){
                that.bunkId='';
                that.name='暂无数据';
                that.id='暂无数据';
                that.major='暂无数据';
                that.$message.success("删除成功");
              }else{
                that.$message.warning("删除失败");
              }
            })
              .catch(function (err) {
                console.log(err);
              })
          }else{
            that.$message.warning("删除信息为空");
          }

        }
      }
    }
</script>

<style scoped>
 .topDelete{
  width: 88%;
  margin: 15px auto;
}
  .messBox{
    margin-right: 60px;
  }
  .dele{
    float: right;
    margin-top: -5px;
  }

</style>
