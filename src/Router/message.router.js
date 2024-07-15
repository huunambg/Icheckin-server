const express = require('express');
const Message_Controller = require('../Controller/message.controller');
const app = express;
const router = app.Router()
router.post("/create-message",Message_Controller.insert_message)
router.get("/get-message-by-room/:id",Message_Controller.get_message_by_room)
router.delete("/delete-message/:id",Message_Controller.delete_Message)
module.exports = router