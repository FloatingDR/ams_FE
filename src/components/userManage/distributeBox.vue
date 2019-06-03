<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>宿管人员职位分配</span>
    </div>
    <el-table
            :data="tableData"
            style="width: 100%"
            max-height="350">
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="工号" prop="supervisorNumber"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column prop="role" label="职位" width="90"></el-table-column>
      <el-table-column label="籍贯" prop="place"></el-table-column>
      <el-table-column label="监管范围" prop="watchSpan"></el-table-column>
      <el-table-column label="联系电话" prop="tel" width="150"></el-table-column>
      <el-table-column fixed="right">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="宿管人员职位分配" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="dataLocal" style="text-align: left;margin: 0 auto;width: 300px;">
        <el-form-item label="姓名:" :label-width="formLabelWidth">
          <span>{{dataLocal.name}}</span>
        </el-form-item>
        <el-form-item label="工号:" :label-width="formLabelWidth">
          <span>{{dataLocal.supervisorNumber}}</span>
        </el-form-item>
        <el-form-item label="楼栋" :label-width="formLabelWidth">
          <el-select class="subcheck" v-model="selected_build" clearable placeholder="监管楼栋">
            <el-option
                    v-for="item in builds"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
  import query from '@/api/query'
  import buildingInfo from '@/api/buildingInfo'
  import userManage from '@/api/userManage'

  export default {
    name:'distributeBox',
    data() {
      return{
          tableData:[],
          dialogFormVisible:false,
          builds:[],
          selected_build:'',
          form:{
              name:'',
              supervisorNumber:'',
              gender:'',
              role:'',
              place:'',
              watchSpan:'',
          },
          dataLocal:{
              name:'',
              supervisorNumber:'',
              watchSpan:'',
          },
          formLabelWidth: '50px'
      };
    },
    methods:{
        getallInfo(){
           let that=this;
           query.getsupervisorInfo()
               .then(function (resp) {
                   if(resp.data.code==200){
                       that.tableData=resp.data.data;
                       for (let gender = 0; gender < that.tableData.length; gender++) {
                           that.tableData[gender].role="宿管";
                           if (that.tableData[gender].gender) {
                               that.tableData[gender].gender = "男";
                           } else {
                               that.tableData[gender].gender = "女";
                           }
                       }
                   }else{
                       console.log("暂无数据")
                   }
               })
               .catch(function (err) {
                   console.log(err);
               })
        },
        getAllBuild(){
            let that = this;
            buildingInfo.getbuildingName().then(function (resp) {
                if (resp.data.code == 200) {
                    that.builds = resp.data.data.map(item => {
                        return {value: item, label: item + '栋'};
                    });
                }
            })
                .catch(function (err) {
                    console.log(err);
                });
        },
        handleEdit(index, row) {
            let that=this;
            that.selected_build='';
            that.dialogFormVisible = true;
            that.dataLocal={};
            that.dataLocal.name=that.tableData[index].name;
            that.dataLocal.supervisorNumber=that.tableData[index].supervisorNumber;
        },
        submit(){
            let that=this;
            that.dialogFormVisible=false;
            console.log(that.dataLocal);
            if(that.dataLocal!={}){
                let qs=require('qs');
                that.dataLocal.watchSpan=that.selected_build;
                console.log(that.dataLocal);
                userManage.updateWorkerPower(
                    qs.stringify({
                        workerNum: that.dataLocal.supervisorNumber,
                        buildNum: that.dataLocal.watchSpan,
                    },{ indices: false })
                ).then(function (resp) {
                    if(resp.data.code==200){
                        that.$message.success('提交成功');
                        that.getallInfo();
                    }else{
                        that.$message.warning('提交失败');
                    }
                })
                    .catch(function (err) {
                        that.$message.warning('提交失败');
                        console.log(err);
                    })
            }else{
                that.$message.err('提交错误，内容为空');
            }
        }
    },
    mounted() {
        this.getallInfo();
        this.getAllBuild();
        this.loginControl();  //登录控制
    }
  };
</script>

<style scoped>
  .box-card{
    height: 36%;
    width: 88%;
    margin:  5% auto;
  }
</style>
