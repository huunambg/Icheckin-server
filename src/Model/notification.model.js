const db = require('../Common/connect')

const Notification_Model = function(){}


Notification_Model.insert_Notification = function(notification,result){

    let sql_notification = "INSERT INTO notification SET ?"

    db.query(sql_notification,notification,function(err,data){
        if(err){
            console.log(err)
            result("Fail")
        }else{
            result(data)
        }
    })
}



Notification_Model.delete_Notification = function(id,result){

    let sql = `DELETE FROM notification WHERE notification_id = '${id}'`

    db.query(sql,function(err,data){
        if(err){
            result("Fail")
        }else{
            result(data)
        }
    })
}

Notification_Model.insert_Notification_status = function(notification_status,result){

    let sql_notification = "INSERT INTO notification_status SET ?"

    db.query(sql_notification,notification_status,function(err,data){
        if(err){
            result("Fail")
        }else{
            result(data)
        }
    })
}




Notification_Model.get_All_Notification= function(result){
    let sql_notification = "SELECT * FROM notification"

    db.query(sql_notification,function(err,data){
        if(err){
            result("Fail")
        }else{
            result(data)
        }
    })
}




module.exports = Notification_Model