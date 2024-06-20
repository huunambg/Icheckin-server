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

module.exports = Location_Model