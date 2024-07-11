const db =require('../Common/connect')
const Break_Time_Model = function(){

}



Break_Time_Model.insert = function(break_time,result){

    let sql = `INSERT INTO break_time SET ?`

    db.query(sql,break_time,function(err,data){
        if(err){
            result("Fail")
        }
        else{
            result(data)
        }
        
    })


}

Break_Time_Model.get = function(result){
    let sql = `SELECT * FROM break_time`
    db.query(sql,function(err,data){
        if(err){
            console.log(err)
            result("Fail")
        }
        else{
            result(data[0])
        }
        
    })


}


Break_Time_Model.update = function(break_time,result){
    let sql = `UPDATE break_time SET time = '${break_time}' WHERE id ='2'`
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

module.exports = Break_Time_Model