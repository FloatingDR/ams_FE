import { SERVER_BASE, http } from "./config";

export default {
  deleteStudentByBunkId(bunkId) {
    return http.get(SERVER_BASE + "/student/delete/one?bunkId="+bunkId);
  },
  getStudentInfobybunkId(bunkId){
    return http.get(SERVER_BASE + "/student/getbybunk?bunkId="+bunkId);
  },
  getBunkId(roomId,bunkNum){
    return http.get(SERVER_BASE + "/room/bunkid?roomId="+roomId+"&bunkNum="+bunkNum);
  },
  getBunkInfo(buildingNumber,romNumber){
    return http.get(SERVER_BASE + "/room/bunkinfo?buildingNumber="+buildingNumber+"&romNumber="+romNumber);
  },
  getRoomId(buildingId,roomNumber){
    return http.get(SERVER_BASE + "/room/getroom?buildingId="+buildingId+"&roomNumber="+roomNumber);
  }
};
