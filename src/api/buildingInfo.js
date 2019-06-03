import { SERVER_BASE, http } from "./config";

export default {
  getbuildingId() {
    return http.get(SERVER_BASE + "/building/getid");    //查询所有楼栋id
  },
  getbuildingName() {
    return http.get(SERVER_BASE + "/building/getname");    //查询所有楼栋名称
  },
  NametoId(buildingNumber) {
    return http.get(SERVER_BASE + "/building/nametoid?num="+buildingNumber);    //查询所有楼栋名称
  },
  getbuildingInfobyId(id){
    return http.get(SERVER_BASE + "/building/info?BuildingId="+ id);      //通过id查询楼栋信息
  },
  deletebuildingInfobyId(idList){
    return http.post(SERVER_BASE + "/building/empty",idList)    //通过id删除楼栋信息
  },
  outputbuildingInfo(buildingNumber){
    return http.post(SERVER_BASE +"/upload/buildinginfo", buildingNumber)    //导出楼栋信息表
  },
  getAllRoomById(buildingId){
    return http.get(SERVER_BASE+"/building/getallroom?buildingId="+buildingId)     //某栋所有房间信息
  },
  deleteRoomsByIdList(idList){
    return http.post(SERVER_BASE+"/room/empty",idList);
  },
  deleteFloor(buildingId,floorNum){
    return http.get(SERVER_BASE+"/building/emptyFloor?buildingId="+buildingId+"&floorNum="+floorNum)
  },
  getEmptybunkInfo(buildingId){
    return http.get(SERVER_BASE+"/room/emptyinfo/bunk?buildingId="+buildingId)
  }
};
