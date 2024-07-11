const db =require('../Common/connect')
const Location_Model = function(){

}



Location_Model.insert = function(location,result){

    let sql = `INSERT INTO location SET ?`

    db.query(sql,location,function(err,data){
        if(err){
            result("Fail")
        }
        else{
            result(data)
        }
        
    })


}

Location_Model.get = function(result){
    let sql = `SELECT * FROM location`
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
Location_Model.update = function(location,result){
    let sql = `UPDATE location SET ? WHERE id ='2'`
    db.query(sql,location,function(err,data){
        if(err){
            console.log(err)
            result("Fail")
        }
        else{
            result(data)
        }
        
    })


}
module.exports = Location_Model