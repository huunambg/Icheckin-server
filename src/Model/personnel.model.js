const db = require("../Common/connect")


const Personnel_Model = function (p) {
    this.id = p.id
    this.personnel_id = p.personnel_id
    this.name = p.name
    this.email = p.email
    this.password = p.password
    this.image = p.image
}




Personnel_Model.insert = function (data, result) {

    let sql_check_email = `SELECT personnel .* FROM personnel WHERE email ='${data.email}'`
    let sql = "INSERT INTO personnel SET ?"

    db.query(sql_check_email, function (err, data_email) {
        if (err) {
            result("Fail")
        } else if (data_email.length > 0) {
            result("Email_already_exists")
        }
        else {
            db.query(sql, data, function (err,res_insert) {
                if (err) {
                    result("Fail")
                }
                else {
                    result(res_insert.insertId)
                }

            })
        }


    })
}



Personnel_Model.getOne = function(personnel,result){

    let sql = `SELECT * FROM personnel  WHERE email = '${personnel.email}' and password = '${personnel.password}'`

    db.query(sql,function(err,data){
        if(err){
            result("Fail")
        }
        else if(data.length==0){
            result("Fail")
        }
        else{
            result(data[0])
        }


    })
}


Personnel_Model.update = function(personnel_id,personnel,result){
    let sql = `UPDATE personnel SET ?  WHERE personnel_id = '${personnel_id}'`
    db.query(sql,personnel,function(err,data){
        if(err){
            result("Fail")
        }
        else{
            result(data)
        }
    })
}

Personnel_Model.updateAvatar = function(personnel_id,image,result){
    let sql = `UPDATE personnel SET image ='${image}'?  WHERE personnel_id = '${personnel_id}'`
    db.query(sql,function(err,data){
        if(err){
            result("Fail")
        }
        else{
            result(data)
        }
    })
}



Personnel_Model.delete = function(personnel_id,result){
    let sql = `DELETE FROM personnel  WHERE personnel_id = '${personnel_id}'`
    db.query(sql,function(err,data){
        if(err){
            result("Fail")
        }
        else{
            result(data)
        }
    })
}


Personnel_Model.getAll = function (result) {
    let sql = `SELECT * FROM personnel`

    db.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            result("Fail")
        }
        else {
            result(data)
        }

    })
}

Personnel_Model.getWithFilter = function (search,result) {
    let sql = `SELECT * FROM personnel where name LIKE '%${search}%'`
    db.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            result("Fail")
        }
        else {
            result(data)
        }

    })
}



module.exports = Personnel_Model

// ahhii