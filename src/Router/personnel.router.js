const express = require('express')
const router = express.Router()
const Personnel_Controller = require("../Controller/personnel.controller")
router.get("/get-all-personnel",Personnel_Controller.get_All_Personnel)
router.get("/get-all-personnel-admin",Personnel_Controller.get_All_Personnel_Admin)
router.get("/get-all-personnel/:search",Personnel_Controller.get_Personnel_With_Filter)
router.put("/update-personnel/:personnel_id",Personnel_Controller.update_Personnel)
router.put("/update-isactive/:personnel_id",Personnel_Controller.update_IsActive)
router.put("/personnel-update-bank/:personnel_id",Personnel_Controller.update_Bank)
router.delete("/delete-personnel/:personnel_id",Personnel_Controller.delete_Personnel)
router.put("/update-avatar-personnel/:personnel_id",Personnel_Controller.update_Avatar)
router.put("/update-fcm-token/:personnel_id",Personnel_Controller.update_FCM_Token)
module.exports = router

// ahihi