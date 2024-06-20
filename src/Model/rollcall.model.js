const db = require("../Common/connect")

const Rollcall_Model = function () {

}


Rollcall_Model.insert_Rollcall = function (data, result) {

    let sql = "INSERT INTO rollcall SET ?";

    db.query(sql, data, function (err, kq) {

        if (err) {
            result("Fail")
        }
        else {
            result(kq)
        }


    })

}


Rollcall_Model.insert_Rollcall_Detail = function (data, result) {
    let sql = "INSERT INTO rollcall_detail SET ?";
    db.query(sql, data, function (err, kq) {

        if (err) {
            result("Fail")
        }
        else {
            result(kq)
        }


    })

}


Rollcall_Model.update_Rollcall_Detail = function (data, result) {
    let sql = `UPDATE rollcall_detail SET ? WHERE id = '${data['id']}'`;
    db.query(sql, data, function (err, kq) {

        try {
            if (err) {
                console.log(err)
                result("Fail")
            }
            else {
                result(data)
            }
        } catch (error) {
            console.log(error)
            result("Fail")
        }

    })

}




Rollcall_Model.insert_Rollcall_Detail_Day = function (data, result) {
    let sql = "INSERT INTO rollcall_detail_day SET ?";
    db.query(sql, data, function (err, data) {
        if (err) {
            result("Fail")
        }
        else {
            result(data)
        }
    })

}


Rollcall_Model.get_Rollcall_Detail_by_Year_Month = function (year_month, personnel_id, result) {

    let sql = `SELECT * FROM rollcall_detail WHERE rollcall_id = '${year_month}' and personnel_id = '${personnel_id}'`

    db.query(sql, function (err, data) {
        if (err) {
            result("Fail")
        } else if (data.length == 0) {
            result("Fail")
        }
        else {
            result(data[0])
        }

    })

}

Rollcall_Model.get_Rollcall_Detail_Day_by_Year_Month = function (year_month, personnel_id, result) {

    let sql = `SELECT * FROM rollcall_detail_day WHERE rollcall_id = '${year_month}' and personnel_id = '${personnel_id}'`

    db.query(sql, function (err, data) {
        if (err) {
            result("Fail")
        }
        else {
            result(data)
        }

    })
}


Rollcall_Model.get_Rollcall_Detail_Day_by_Year_Month_Day = function (year_month, personnel_id, day, result) {

    let sql = `SELECT * FROM rollcall_detail_day WHERE rollcall_id = '${year_month}' and personnel_id = '${personnel_id}' and day = '${day}'`

    db.query(sql, function (err, data) {
        try{
            if (err) {
                result("Fail")
            }
            else {
                result(data[0])
            }
        }
        catch(e){
            result("Fail")
        }
       

    })

}


Rollcall_Model.update_Rollcall_Detail_Day_by_Year_Month_Day = function (data_update, id, result) {
    let sql = `UPDATE rollcall_detail_day SET ? WHERE id = '${id}'`

    db.query(sql, data_update, function (err, data) {
        if (err) {
            result("Fail")
        }
        else {
            result(data_update)
        }

    })

}





module.exports = Rollcall_Model





