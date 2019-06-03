<template>
  <div>
    <!--<el-checkbox-group-->
    <!--:min="1"-->
    <!--:max="2"-->
    <!--v-model="checkList"-->
    <!--style="float:left;margistudent_shortTimen-left: 5%;margin-top: 30px;"-->
    <!--&gt;-->
    <!--<el-checkbox label="在校生" ></el-checkbox>-->
    <!--<el-checkbox label="往届生" ></el-checkbox>-->
    <!--</el-checkbox-group>-->
    
    
    <el-select v-model="selectedMajor" placeholder="请选择专业"
               style="margin-top:20px;float:left;margin-left: 5%;width: 200px;" clearable
               @change="filterInfo($event)">
      <el-option
          v-for="maj in major"
          :key="maj.value"
          :label="maj.label"
          :value="maj.value">
      </el-option>
    </el-select>
    
    <div style="height: 60px; width: 500px;margin-top: 20px;float: right;margin-right: 5%;">
      <el-input placeholder="请输入您要查找的信息，如姓名、学号等" v-model="search_student" class="input-with-select" clearable>
        <el-select v-model="filerOrSearch" slot="prepend" placeholder="请选择" style="width: 120px;" @change="checkChange($event)">
          <el-option label="信息过滤" value="1"></el-option>
          <el-option label="查询学号" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchStudent"></el-button>
      </el-input>
    </div>
    
    
    <el-card class="queryCard" :body-style="{ padding: '10px 40px' }" v-if="cardShowable">
      <el-table :data="studentTable_shortTime" max-height="370" style="background:#fff;">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="studentNumber" label="学号" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80"></el-table-column>
        <el-table-column prop="identifyNumber" label="身份证号" width="190"></el-table-column>
        <el-table-column prop="nation" label="民族" width="100"></el-table-column>
        <el-table-column prop="place" label="籍贯" width="100"></el-table-column>
        <el-table-column prop="build" label="楼栋" width="80"></el-table-column>
        <el-table-column prop="roomNo" label="寝室号" width="80"></el-table-column>
        <el-table-column prop="bunkNo" label="床位" width="80"></el-table-column>
        <el-table-column prop="school" label="学院" width="150"></el-table-column>
        <el-table-column prop="major" label="专业" width="180"></el-table-column>
        <el-table-column prop="grade" label="年级" width="80"></el-table-column>
        <el-table-column prop="studentClass" label="班级" width="80"></el-table-column>
        <el-table-column prop="status" label="职位" width="80"></el-table-column>
        <el-table-column prop="instructorId" label="辅导员" width="80"></el-table-column>
        <el-table-column prop="tel" label="联系方式" width="120"></el-table-column>
      </el-table>
      
      <div class="block" style="margin-top: 20px;">
        <span class="demonstration"></span>
        <el-pagination v-if="pageShowable"
                       :page-size="1"
                       :pager-count="11"
                       layout="prev, pager, next"
                       :total="totalPage"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
    import query from "@/api/query";

    export default {
        name: "studentTable",
        data() {
            return {
                checkList: ["在校生"],
                filerOrSearch:'1',
                search_student: "",
                select: "1",
                pageShowable: false,
                cardShowable:false,
                studentTable: [],
                student_shortTime: [],
                selectedMajor: '',
                major: '',
                totalPage:10,
            };
        },
        computed: {
            studentTable_shortTime() {
                let that = this;
                let search = this.search_student;
                if (search&&that.filerOrSearch=="1") {
                    return that.student_shortTime.filter(function (table) {
                        return Object.keys(table).some(function (key) {
                            return String(table[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return that.student_shortTime
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.getStudentInfo(this.selectedMajor,val,250)
            },
            filterInfo(major) {
                let that = this;
                console.log(major);
                if (major) {
                    that.getStudentInfo(major,1,250);
                }
            },
            checkChange(val){
                let that=this;
                console.log(val);
                that.pageShowable=false;
                if(val=='2'){
                    that.cardShowable=true;
                    that.pageShowable=false;
                    that.student_shortTime=[];
                }else{
                    that.getStudentInfo(that.selectedMajor,1,250);
                }
            },
            searchStudent() {
                let that = this;
                if (!that.search_student&&that.filerOrSearch=="2") {
                    this.$message({
                        showClose: true,
                        message: '错误！搜索内容不能为空，请输入您要搜索的内容',
                        type: 'warning'
                    })
                }else if(that.search_student&&that.filerOrSearch=="2"){
                    query.searchStudent(that.search_student).then(function (resp) {
                        if(resp.data.code==200){
                            let arr=[];
                            arr[0]=resp.data.data;
                            console.log(arr);
                            that.student_shortTime=arr;
                        }else{
                            that.$message.warning("没有查到学号为"+that.search_student+"的学生")
                        }
                    })
                        .catch(function (err) {
                            console.log(err);
                        })
                   
                }
            },
            getAllMajor() {
                let that = this;
                query.getAllMajor().then(function (resp) {
                    if (resp.data.code == 200) {
                        let arr = resp.data.data;
                        that.major = arr.map(item => {
                            return {value: item, label: item};
                        });
                        console.log(that.major);
                    }
                })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            getStudentInfo(major,pageNum,pageSize) {
                let that = this;
                if(that.filerOrSearch=="1"){
                    query
                        .getStudentInfobyMajor(major,pageNum,pageSize)
                        .then(function (resp) {
                            if (resp.data.code == 200) {
                                console.log(resp);
                                that.totalPage=resp.data.data.lastPage;
                                console.log(that.totalPage);
                                that.student_shortTime = resp.data.data.list;
                                that.cardShowable=true;
                                that.pageShowable = true;
                            } else {
                                console.log("暂无数据");
                            }
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }
            }
        },
        mounted() {
            let that = this;
            that.getAllMajor();
            this.loginControl();  //登录控制
            // console.log(that.studentTable.studentGender);
            //this.getStudentInfo();
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
