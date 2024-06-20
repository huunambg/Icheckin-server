const db =require('../Common/connect')

const QR_Code_Model = function(){

}


QR_Code_Model.insert = function(qr_code,result){

    let sql = "INSERT INTO qr_code SET ?"

    db.query(sql,qr_code,function(err,data){
        if(err){
            result("Fail")
        }else{
            result(data)
        }
    })

}

QR_Code_Model.get = function(result){

    let sql = "SELECT * FROM qr_code WHERE status = 'oke'"

    db.query(sql,function(err,data){
        if(err){
            result("Fail")
        }else{
            result(data)
        }
    })
}


module.exports = QR_Code_Model