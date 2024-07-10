const express = require('express')
const router = express.Router()
const Personnel_Controller = require("../Controller/personnel.controller")
router.get("/get-all-personnel",Personnel_Controller.get_All_Personnel)
router.get("/get-all-personnel/:search",Personnel_Controller.get_Personnel_With_Filter)
router.put("/update-personnel/:personnel_id",Personnel_Controller.update_Personnel)
router.delete("/delete-personnel/:personnel_id",Personnel_Controller.delete_Personnel)
router.put("/update-avatar-personnel/:personnel_id",Personnel_Controller.update_Avatar)
module.exports = router

// ahihi