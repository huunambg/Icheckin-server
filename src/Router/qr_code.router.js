const express = require('express');
const QR_Code_Controller = require('../Controller/qr_code.controller');
const app = express;
const router = app.Router()


router.post("/create-qr",QR_Code_Controller.insert_QR_Code)

router.get("/personnel-get-qr",QR_Code_Controller.get_QR_Code)

module.exports = router