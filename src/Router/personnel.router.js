const express = require('express')
const router = express.Router()
const Personnel_Controller = require("../Controller/personnel.controller")

router.post("/register",Personnel_Controller.create_Personnel)
router.get("/get-all-personnel",Personnel_Controller.get_All_Personnel)
router.post("/login-personnel",Personnel_Controller.login_Personnel)
router.put("/update-personnel/:personnel_id",Personnel_Controller.update_Personnel)
router.delete("/delete-personnel/:personnel_id",Personnel_Controller.delete_Personnel)
module.exports = router

// ahihi