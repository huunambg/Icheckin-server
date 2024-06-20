const express = require('express');
const Location_Controller = require('../Controller/location.controller');
const app = express;
const router = app.Router()


router.post("/create-location",Location_Controller.insert_Location)
router.get("/personnel-get-location",Location_Controller.get_Location)




module.exports = router