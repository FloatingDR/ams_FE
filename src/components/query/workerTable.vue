<template>
  <div>
    <div style="height: 60px; width: 400px;margin-top: 20px;float: right;margin-right: 5%;">
      <el-input placeholder="请输入您要查找的信息，如姓名、工号等" v-model="search_worker" class="input-with-select" clearable>

        <el-button slot="append" icon="el-icon-search" @click="searchWorker"></el-button>
      </el-input>
    </div>

    <el-card class="queryCard" :body-style="{ padding: '10px 40px' }">
      <el-table :data="workerTable_shortTime" max-height="380" style="background:#fff;">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="supervisorNumber" label="工号" width="190"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80"></el-table-column>
        <el-table-column prop="role" label="职位" width="90"></el-table-column>
        <el-table-column prop="place" label="籍贯" width="100"></el-table-column>
        <el-table-column prop="identifyNumber" label="身份证号" width="190"></el-table-column>
        <el-table-column prop="tel" label="联系方式" width="120"></el-table-column>
        <el-table-column prop="watchSpan" label="监管范围" width></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import query from "@/api/query";
export default {
  name: "workerTable",
  data() {
    return {
      search_worker: "",
      select: "1",
      workerTable: [],
    };
  },
  computed:{
    workerTable_shortTime(){
        let search=this.search_worker;
        if(search){
          return  this.workerTable.filter(function(table){
            return Object.keys(table).some(function(key){
              return String(table[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.workerTable
      }
  },
  methods: {
    searchWorker() {
      let that=this;
       if(!that.search_worker){
          this.$message({
            showClose: true,
            message: '错误！搜索内容不能为空，请输入您要搜索的内容',
            type: 'warning'
          })
       }
    }
  },
  mounted() {
    let that = this;
      this.loginControl();  //登录控制
    query
      .getsupervisorInfo()
      .then(function(resp) {
        if (resp.data.code == 200) {
          that.workerTable = resp.data.data;
        } else {
          console.log("暂无数据");
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.queryCard {
  width: 90%;
  height: 450px;
  margin: 0 auto;
}
.el-select {
  width: 100px;
}
</style>
