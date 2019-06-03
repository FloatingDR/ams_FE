import { SERVER_BASE, http } from "./config";

export default {
    login(account,password){
        return http.post(SERVER_BASE+"/login?account="+account+"&password="+password)
    },
    changePassword(change_password){
        return http.post(SERVER_BASE+"/changepass",change_password)
    }
};
