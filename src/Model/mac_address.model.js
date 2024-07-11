const db = require('../Common/connect')

const Mac_Address_Model = function(){}


Mac_Address_Model.insert = function(address,result){
    let sql = "INSERT INTO mac_address SET ?"

    db.query(sql,address,function(err,data){
        if(err){
            result("Fail")
        }else{
            result(data)
        }
    })


}

Mac_Address_Model.get = function(result){
    let sql = "SELECT * FROM mac_address"

    db.query(sql,function(err,data){
        if(err){
            result("Fail")
        }else{
            result(data)
        }
    })


}

Mac_Address_Model.update = function(mac,id,result){
    let sql = `UPDATE mac_address SET ? WHERE id = '${id}'`
    db.query(sql,mac,function(err,data){
        if(err){
            result("Fail")
        }else{
            result(data)
        }
    })


}

Mac_Address_Model.delete = function(id,result){
    let sql = `DELETE FROM mac_address WHERE id = '${id}'`
    db.query(sql,function(err,data){
        if(err){
            result("Fail")
        }else{
            result(data)
        }
    })


}



module.exports =Mac_Address_Model