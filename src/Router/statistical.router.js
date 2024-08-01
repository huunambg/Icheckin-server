const express = require('express')
const router = express.Router()
const StatisticalController = require('../Controller/statistical.controller')
router.get("/get-statistical-this-month",StatisticalController.getAllPersonnelThisMonth)
router.get("/get-statistical-by-year-month/:id",StatisticalController.getAllPersonnelByYearMonth)

module.exports =router