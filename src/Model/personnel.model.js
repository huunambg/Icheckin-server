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
    let sql_check_personnel_id = `SELECT personnel .* FROM personnel WHERE personnel_id ='${data.personnel_id}'`
    let sql = "INSERT INTO personnel SET ?"


    db.query(sql_check_email, function (err, data_email) {
        if (err) {
            result("Fail")
        } else if (data_email.length > 0) {
            result("Email_already_exists")
        }
        else {
            db.query(sql_check_personnel_id, function (err, data_personnel_id) {
                if (err) {
                    result("Fail")
                }
                else if (data_personnel_id.length > 0) {
                    result("Personnel_id_already_exists")
                }
                else {
                    db.query(sql, data, function (err) {
                        if (err) {
                            result("Fail")
                        }
                        else {
                            result(data)
                        }

                    })

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


module.exports = Personnel_Model

