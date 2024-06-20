const express = require('express');
const Mac_Address_Controller = require('../Controller/mac_address.controller');
const app = express;
const router = app.Router()


router.post("/create-macaddress",Mac_Address_Controller.insert_Mac_Address)
router.get("/personnel-get-macaddress",Mac_Address_Controller.get_Mac_Personnel)

module.exports = router