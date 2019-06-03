import { SERVER_BASE, http } from "./config";

export default {
    updataStudentInfo(student) {
        return http.post(SERVER_BASE + "/student/adjustStuInfo",student);
    },
};