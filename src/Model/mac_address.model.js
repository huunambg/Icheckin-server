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



module.exports =Mac_Address_Model