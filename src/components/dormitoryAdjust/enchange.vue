<template>
  <div>
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
    
    <div style="height: 60px; width: 400px;margin-top: 20px;float: right;margin-right: 5%;">
      <el-input placeholder="请输入您要查找的信息，如姓名、学号等" v-model="search" class="input-with-select" clearable>
        <el-button slot="append" icon="el-icon-search" @click="searchStudent"></el-button>
      </el-input>
    </div>
    <el-card class="initBox" v-if="tableShowable">
      <el-table
                :data="tableData"
                style="width: 100%"
                max-height="360">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="民族" prop="nation"></el-table-column>
        <el-table-column label="楼栋" prop="build"></el-table-column>
        <el-table-column label="寝室号" prop="roomNo"></el-table-column>
        <el-table-column label="床位号" prop="bunkNo"></el-table-column>
        <el-table-column label="年级" prop="grade"></el-table-column>
        <el-table-column label="专业" prop="major" width="180"></el-table-column>
        <el-table-column fixed="right">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination v-if="pageShowable"
                       :pager-count="11"
                       :page-size="1"
                       layout="prev, pager, next"
                       :total="totalPage"
                       @current-change="handleCurrentChange"
                       style="margin-top: 15px;">
        </el-pagination>
      </div>
    </el-card>
    
    <el-dialog title="宿舍调整" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" style="text-align: left;margin: 0 auto;width: 300px;">
        <el-form-item label="姓名:" :label-width="formLabelWidth">
          <span>{{form.studentName}}</span>
        </el-form-item>
        <el-form-item label="学号:" :label-width="formLabelWidth">
          <span>{{form.studentNum}}</span>
        </el-form-item>
        <el-form-item label="楼栋" :label-width="formLabelWidth">
          <el-select class="subcheck" v-model="selected_build" clearable placeholder="请选择楼栋"
                     @change="getBuildsRoom($event)">
            <el-option
                v-for="item in builds"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="寝室" :label-width="formLabelWidth">
          <el-select class="subcheck" v-model="selected_room" clearable placeholder="请选择寝室"
                     @change="getRoomsBunk($event)">
            <el-option
                v-for="item in rooms"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="床位" :label-width="formLabelWidth">
          <el-select class="subcheck" v-model="selected_bunk" clearable placeholder="请选择床位">
            <el-option
                v-for="item in bunks"
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
  
  </div>
</template>

<script>
    import query from "@/api/query";
    import buildingInfo from '@/api/buildingInfo';
    import dormitoryAdjust from '@/api/dormitoryAdjust';

    export default {
        name: "enchange",
        data() {
            return {
                dataLocal: [],
                major: '',
                selectedMajor: '',
                getAllRoomById_cache: '',
                search: '',
                builds: '',
                rooms: '',
                bunks: '',
                selected_build: '',
                selected_room: '',
                selected_bunk: '',
                tableShowable: false,
                gridData: [{
                    date: '',
                    name: '',
                    address: ''
                },],
                dialogFormVisible: false,
                form: {
                    studentName: '',
                    studentNum: '',
                    buildingNum: '',
                    roomNum: '',
                    bunkNum: '',
                },
                formLabelWidth: '50px',
                totalPage: '',
                pageShowable: false,
                currentPage:1,
            };
        },
        methods: {
            handleCurrentChange(val) {
                this.currentPage=val;
                this.loadInfo(this.selectedMajor, val, 250)
            },
            filterInfo(major) {
                let that = this;
                console.log(major);
                if (major) {
                    that.loadInfo(major, 1, 250);
                }
            },
            loadInfo(major, pageNum, pageSize) {
                let that = this;
                query.getStudentInfobyMajor(major, pageNum, pageSize).then(function (resp) {
                    if (resp.data.code == 200) {
                        that.dataLocal = resp.data.data.list;
                        that.totalPage = resp.data.data.lastPage;
                        that.pageShowable = true;
                        that.tableShowable = true;
                    }
                })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            getAllMajor() {
                let that = this;
                query.getAllMajor().then(function (resp) {
                    if (resp.data.code == 200) {
                        let arr = resp.data.data;
                        that.major = arr.map(item => {
                            return {value: item, label: item};
                        });
                    }
                })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            getAllBuild() {
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
            getBuildsRoom(build) {
                let that = this;
                that.selected_room = '';
                that.rooms = '';
                that.selected_bunk = '';
                that.bunk = '';
                buildingInfo.NametoId(build).then(function (resp) {
                    if (resp.data.code == 200) {
                        let buildId = resp.data.data;
                        console.log("buildId:" + buildId);
                        if (buildId) {
                            buildingInfo.getEmptybunkInfo(buildId).then(function (resp) {
                                if(resp.data.code==200){
                                    let arr=[];
                                    that.getAllRoomById_cache=resp.data.data;
                                    for(let i=0;i<resp.data.data.length;i++){
                                        arr[i]=resp.data.data[i].roomNumber;
                                    }
                                    console.log("id:"+buildId+arr);
                                    that.rooms=arr.map(item=>{
                                        return {value: item, label: build + '-' + item};
                                    })
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
            getRoomsBunk(room) {
                let that = this;
                that.selected_bunk = '';
                that.bunk = '';
                //let numberOfBunk = '';
                if (that.getAllRoomById_cache && room) {
                    that.getAllRoomById_cache.forEach(function (v, i) {
                        if (v.roomNumber == room) {
                            //numberOfBunk = v.numberOfBunk;
                            let arr=[];
                            for(let i=0;i<v.emptyBunk.length;i++){
                                arr[i]=v.emptyBunk[i].bunkNumber;
                            }
                            that.bunks = arr.map(item => {
                                return {value: item, label: item + "号床"};
                            });
                            console.log("cw"+that.bunks);
                        }
                    })
                    // if (numberOfBunk) {
                    //     let arr = [];
                    //     for (let j = 0; j < numberOfBunk; j++) {
                    //         arr[j] = j + 1;
                    //     }
                    //     that.bunks = arr.map(item => {
                    //         return {value: item, label: item + "号床"};
                    //     });
                    // } else {
                    //     console.log("numberOfBunk is null")
                    // }
                }
            },
            handleEdit(index, row) {
                let that = this;
                this.dialogFormVisible = true;
                console.log(index, row);
                that.form = {};
                that.form.studentName = that.dataLocal[index].name;
                that.form.studentNum = that.dataLocal[index].studentNumber;
                that.selected_build = '';
                that.selected_room = '';
                that.selected_bunk = '';
            },
            searchStudent() {
                let that = this;
                if (!that.search) {
                    that.$message.warning('错误！搜索内容不能为空，请输入您要搜索的内容');
                }
            },
            submit() {
                let that = this;
                that.dialogFormVisible = false;
                if (that.form != {}) {
                    that.form.buildingNum = that.selected_build;
                    that.form.roomNum = that.selected_room;
                    that.form.bunkNum = that.selected_bunk;
                    console.log(that.form);
                    dormitoryAdjust.updataStudentInfo(that.form).then(function (resp) {
                        console.log(resp)
                        if (resp.data.code == 200) {
                            that.$message.success('提交成功');
                            that.loadInfo(that.selectedMajor,that.currentPage,250);
                        } else if (resp.data.code == 401) {
                            that.$message.warning('床位不存在')
                        } else if (resp.data.code == 400) {
                            that.$message.warning('提交失败，该床位已被分配');
                        } else {
                            that.$message.warning('提交失败');
                        }
                    })
                        .catch(function (err) {
                            console.log(err);
                        })

                } else {
                    that.$message.err('提交错误，内容为空');
                }
            },
        },
        mounted() {
            this.getAllBuild();
            this.getAllMajor();
            this.loginControl();  //登录控制
        },
        computed: {
            tableData() {
                let that = this;
                if (that.search) {
                    return this.dataLocal.filter(function (dataNews) {
                        return Object.keys(dataNews).some(function (key) {
                            return String(dataNews[key]).toLowerCase().indexOf(that.search) > -1
                        })
                    })
                }
                return that.dataLocal
            }
        }
    };
</script>

<style scoped>
  .initBox {
    width: 90%;
    height: 450px;
    margin: 3% auto;
  }
</style>
