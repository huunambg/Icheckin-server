const db =require('../Common/connect')
const MessageModel = function(){

}



MessageModel.insert = function(message,result){

    let sql = `INSERT INTO message SET ?`

    try{
        db.query(sql,message,function(err,data){
            if(err){
                result("Fail")
            }
            else{
                result(data)
            }
            
        })
    }catch(e){
        console.log(e);
    }
}

MessageModel.get_By_Room = function(id_room,result){
    let sql = `SELECT * FROM message where id_room = '${id_room}'`
    db.query(sql,function(err,data){
        if(err){
            console.log(err)
            result("Fail")
        }
        else{
            result(data)
        }
        
    })


}


MessageModel.delete = function(id,result){
    let sql = `DELETE FROM message WHERE id ='${id}'`
    db.query(sql,function(err,data){
        if(err){
            console.log(err)
            result("Fail")
        }
        else{
            result(data)
        }
        
    })


}

module.exports = MessageModel