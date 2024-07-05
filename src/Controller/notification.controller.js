const Notification_Model = require('../Model/notification.model')
const Personnel_Model = require('../Model/personnel.model')
const insert_Notification = function(req,res){
    let currentDate = new Date();
    let notification = req.body
    notification.time =currentDate

    Notification_Model.insert_Notification(notification,function(result){
        if(result !="Fail"){
            Personnel_Model.getAll(function(result_personnel){

                if(result_personnel!="Fail"){
                    result_personnel.forEach(personnel => {
                        let notification_status= {notification_id : result['insertId'],
                        personnel_id : personnel['personnel_id']}
                    console.log(notification_status)

                    Notification_Model.insert_Notification_status(notification_status,function(result_insert_Notification_status){
                    })
                        
                    });
                                    
                }
            })
            res.send({
                message :"Insert Notification Complete"
            })
        }

    })


}

const update_Notification = function(req,res){
    let notification = req.body
    let id = req.params.id;
    Notification_Model.update_Notification(notification,id,function(result){
        if(result !="Fail"){
            res.send({message:"Cập nhật thông báo thành công"})
        }
        else{
            res.send({message:"Cập nhật thông báo thất bại"})
        }

    })
}


const delete_Notification = function(req,res){
    let id = req.params.id;
    Notification_Model.delete_Notification(id,function(result){
        if(result !="Fail"){
            res.send({message:"Xóa thông báo thành công"})
        }
        else{
            res.send({message:"Xóa thông báo thất bại"})
        }

    })
}

const get_All_Notification = function(req,res){
    
Notification_Model.get_All_Notification(function(result){
    if(result!="Fail"){
        res.send({data : result})
    }
})



}


const Notification_Controller = {
    insert_Notification,
    get_All_Notification,update_Notification,delete_Notification
}

module.exports = Notification_Controller