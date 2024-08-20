const Notification_Model = require('../Model/notification.model')
const Personnel_Model = require('../Model/personnel.model')
const admin = require('../Common/firebaseadminconfig');
const { response } = require('express');
const { token } = require('morgan');


const insert_Notification = function (req, res) {
    let currentDate = new Date();
    let notification = req.body
    notification.time = currentDate

    Notification_Model.insert_Notification(notification, async function (result) {
        if (result != "Fail") {
            Personnel_Model.getAll(function (result_personnel) {

                if (result_personnel != "Fail") {
                    result_personnel.forEach(personnel => {
                        let notification_status = {
                            notification_id: result['insertId'],
                            personnel_id: personnel['personnel_id']
                        }
                        console.log(notification_status)

                        Notification_Model.insert_Notification_status(notification_status, function (result_insert_Notification_status) {
                        })

                    });

                }
            })
            const message = {
                topic: "personnel",
                notification: {
                    title: notification.title,
                    body: notification.description
                }
            };
            await sendNotification(message)
            res.send({
                message: "Insert Notification Complete"
            })
        }

    })


}

const update_Notification = function (req, res) {
    let notification = req.body
    let id = req.params.id;
    Notification_Model.update_Notification(notification, id, function (result) {
        if (result != "Fail") {
            res.send({ message: "Cập nhật thông báo thành công" })
        }
        else {
            res.send({ message: "Cập nhật thông báo thất bại" })
        }

    })
}


const delete_Notification = function (req, res) {
    let id = req.params.id;
    Notification_Model.delete_Notification(id, function (result) {
        if (result != "Fail") {
            res.send({ message: "Xóa thông báo thành công" })
        }
        else {
            res.send({ message: "Xóa thông báo thất bại" })
        }

    })
}

const get_All_Notification = function (req, res) {

    Notification_Model.get_All_Notification(function (result) {
        if (result != "Fail") {
            res.send({ data: result })
        }
    })

}

const sendNotification = async function (message) {
    try {
        await admin.messaging().send(message).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    } catch (e) {
        console.log(e)
    }
}


const sendNotificationToken = function (fcm_token, image, message, name) {
    const data = {
        token: fcm_token,
        notification: {
            title: name,
            body: message.content,
            image: image
        }
    };
    sendNotification(data)
}


const sendNotificationActiveAccount = async function (req, res) {
    let fcm_token = req.body.fcm_token
    let username = req.body.username
    const data = {
        token: fcm_token,
        notification: {
            title: "Xin chào " + username,
            body: "Tài khoản của bạn đã được kích hoạt thành công bạn có thể đăng nhập để sử dụng",
        }
    };
    await sendNotification(data)
    res.send({
        message: "Sent Notification Complete"
    })


}


const pushNotification = async function (req, res) {
    let notification = req.body
    const message = {
        topic: "personnel",
        notification: {
            title: notification.title,
            body: notification.description
        }
    };

    await sendNotification(message);
    res.send("Success")
}


const Notification_Controller = {
    insert_Notification,
    get_All_Notification, update_Notification, delete_Notification, pushNotification, sendNotificationToken, sendNotificationActiveAccount
}

module.exports = Notification_Controller