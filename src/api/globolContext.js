export default {
   loginToken:'',
   sendBuildNum:'',
    token:'',
    studentInfoTable:[],
    setLoginToken(token){
       this.loginToken=token;
    },
    setBuildNum(num){
       this.sendBuildNum=num;
    },
    setStudentInfoTable(table){
       this.studentInfoTable=table;
    },
    setToken(token){
       this.token=token;
    }
};
