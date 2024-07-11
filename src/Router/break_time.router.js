const express = require('express');
const Break_Time_Controller = require('../Controller/break_time.controller');
const app = express;
const router = app.Router()


router.post("/create-breaktime",Break_Time_Controller.insert_break_time)
router.get("/personnel-get-breaktime",Break_Time_Controller.get_break_time)
router.post("/update-breaktime",Break_Time_Controller.update_Break_Time)

module.exports = router