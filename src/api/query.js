import { SERVER_BASE, http } from "./config";

export default {
  getStudentInfo() {
    return http.get(SERVER_BASE + "/student/info");    //查询所有学生信息
  },
  getsupervisorInfo() {
    return http.get(SERVER_BASE + "/workerinfo/supervisor/all");    //查询所有宿管信息
  },
  getAllMajor(){
    return http.get(SERVER_BASE+"/student/major");
  },
  getBuildingInfo(buildingId,floorNum){
    return http.get(SERVER_BASE+"/student/buildinfo?buildingId="+buildingId+"&floorNum="+floorNum)
  },
  getStudentInfobyMajor(major,pageNum,pageSize){
    return http.get(SERVER_BASE+"/student/majorget?major="+major+"&pageNum="+pageNum+"&pageSize="+pageSize);
  },
  searchStudent(studentNum){
    return http.get(SERVER_BASE+"/student/getstudent?studentNum="+studentNum);
  },
  getBuildnumByLocal(local){
    return http.get(SERVER_BASE+"/building/region?region="+local);
  }
};
