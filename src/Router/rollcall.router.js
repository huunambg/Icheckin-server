const express = require('express')
const app = express()
const router = express.Router()

const Rollcall_Controller = require('../Controller/rollcall.controller')
router.get("/init-rollcall-year",Rollcall_Controller.init_Rollcall)
router.get("/get-rollcall-detail-this-month/:personnel_id",Rollcall_Controller.get_Rollcall_Detail_by_this_month)
router.post("/get-rollcall-detail-month",Rollcall_Controller.get_Rollcall_Detail_by_Year_Month)
router.post("/get-rollcall-detail-day-month",Rollcall_Controller.get_Rollcall_Detail_Day_by_Year_Month)
router.post("/rollcall/:personnel_id",Rollcall_Controller.rollcall)
router.post("/get-rollcall-detail-day-one-day",Rollcall_Controller.get_Rollcall_Detail_Day_by_Year_Month_Day)
router.get("/get-last-rollcall-time/:personnel_id",Rollcall_Controller.get_Last_Rollcall_Time)
module.exports =router