import Vue from "vue";
import Router from "vue-router";

import Index from "@/views/Index";

import Introduce from "@/views/Introduce";

import Login from "@/views/Login";

import Import from "@/views/InfoManage/Import"; //导入
import Output from "@/views/InfoManage/Output"; //导出

import Building from "@/views/apartmentManage/Building"; //建立楼宇
import apartmentDelete from "@/views/apartmentManage/apartmentDelete"; //公寓清空
import apartmentDistribute from "@/views/apartmentManage/apartmentDistribute"; //公寓分配

import Student from "@/views/query/Student"; //学生查询
import Worker from "@/views/query/Worker"; //职工查询

import buildingPower from "@/views/userManage/buildingPower"; //楼宇权限分配
import userImport from "@/views/userManage/userImport"; //用户批量导入

import dormitoryAdjust from "@/views/dormitoryAdjust/dormitoryAdjust"; //宿舍调整

import apartment from '@/views/apartment'      //A栋link
import test from '@/views/test'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path:"/index",
      component:Index,
    },
    {
      path:"/",
      component:Introduce
    },
    {
      path:"/login",
      component:Login
    },
    {
      path: "/manage/building",
      component: Building
    },
    {
      path: "/manage/distribute",
      component: apartmentDistribute
    },
    {
      path: "/manage/delete",
      component: apartmentDelete
    },
    {
      path: "/info/mangae/input",
      component: Import
    },
    {
      path: "/info/mangae/output",
      component: Output
    },
    {
      path: "/dormitory/adjust",
      component: dormitoryAdjust
    },
    {
      path: "/query/student",
      component: Student
    },
    {
      path: "/query/worker",
      component: Worker
    },
    {
      path: "/user/manage/building/power",
      component: buildingPower
    },
    {
      path: "/user/manage/import",
      component: userImport
    },
    {
      path:"/index/apartment",
      component:apartment
    },
    {
      path:"/mytest/test",
      component:test
    },
  ]
});
