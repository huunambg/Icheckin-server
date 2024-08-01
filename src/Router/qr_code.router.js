const express = require('express');
const QR_Code_Controller = require('../Controller/qr_code.controller');
const app = express;
const router = app.Router()


router.post("/create-qr",QR_Code_Controller.insert_QR_Code)

router.get("/personnel-get-qr",QR_Code_Controller.get_QR_Code)
router.delete("/delete-qr/:id",QR_Code_Controller.delete_QR_Code)
router.put("/update-qr/:id",QR_Code_Controller.update_QR_Code)
module.exports = router