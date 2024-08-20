const express = require('express');
const Notification_Controller = require('../Controller/notification.controller');
const app = express;
const router = app.Router()

router.post("/create-notification",Notification_Controller.insert_Notification)
router.put("/update-notification/:id",Notification_Controller.update_Notification )
router.delete("/delete-notification/:id",Notification_Controller.delete_Notification )
router.get("/get-all-notification",Notification_Controller.get_All_Notification)
router.post("/send-notification",Notification_Controller.pushNotification )
router.post("/send-notification-active",Notification_Controller.sendNotificationActiveAccount)
module.exports = router
//ahihisdssđfdf