const MessageModel = require('../Model/message.model')

const insert_message = function (req, res) {
    let message = req.body

    MessageModel.insert(message, function (result) {
        if (result != "Fail") {
            res.send({ message: "Insert message complete" })
        }
        else {
            res.status(401).send({ message: "Insert message Faild" })
        }
    })

}


const get_message_by_room = function (req, res) {
    let id_room = req.params.id
    MessageModel.get_By_Room(id_room, function (result) {
        if (result != "Fail") {
            res.send({ data: result, message: "Get message complete" })
        }
        else {
            res.status(401).send({ message: "Get message Faild" })
        }

    })

}


const delete_Message = function (req, res) {
    let id = req.params.id
    MessageModel.delete(id, function (result) {
        if (result != "Fail") {
            res.send({ data: result, message: "Delete message complete" })
        }
        else {
            res.status(401).send({ message: "Delete message Faild" })
        }

    })

}


const Message_Controller = { insert_message, get_message_by_room, delete_Message }

module.exports = Message_Controller