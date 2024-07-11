const Mac_Address_Model = require('../Model/mac_address.model')

const insert_Mac_Address = function (req, res) {
    let mac = req.body

    Mac_Address_Model.insert(mac, function (result) {
        if (result != "Fail") {
            res.send({ message: "Insert Mac Address complete" })
        } else {
            res.status(401).send({ message: "Insert Mac Address Faild" })
        }

    })

}

const get_Mac_Personnel = function (req, res) {
    Mac_Address_Model.get(function (result) {
        if (result != "Fail") {
            res.send({ data: result, message: "Get Mac Address complete" })
        } else {
            res.status(401).send({ message: "Get Mac Address Faild" })
        }

    })
}

const update_Mac_Personnel = function (req, res) {
    let mac = req.body
    let id = req.params.id

    Mac_Address_Model.update(mac,id,function (result) {
        if (result != "Fail") {
            res.send({ data: result, message: "Update Mac Address complete" })
        } else {
            res.status(401).send({ message: "Update Mac Address Faild" })
        }

    })
}
const delete_Mac_Personnel = function (req, res) {
    let id = req.params.id

    Mac_Address_Model.delete(id,function (result) {
        if (result != "Fail") {
            res.send({ data: result, message: "Delete Mac Address complete" })
        } else {
            res.status(401).send({ message: "Delete Mac Address Faild" })
        }

    })
}

const Mac_Address_Controller = {
    insert_Mac_Address,
    get_Mac_Personnel,update_Mac_Personnel,delete_Mac_Personnel
}

module.exports = Mac_Address_Controller