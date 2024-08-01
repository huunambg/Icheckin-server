const db = require('../Common/connect')

const StatisticalModel = function () {

}



StatisticalModel.getAllPersonnel = function (rollcallId,result) {

    let sql = `SELECT personnel.name,rollcall_detail.work_day,rollcall_detail.leave_permission,rollcall_detail.leave_without_permission,rollcall_detail.sunday_work,rollcall_detail.holiday_work,rollcall_detail.total_working_day,rollcall_detail.total_working_time
                FROM personnel, rollcall_detail
                WHERE personnel.personnel_id = rollcall_detail.personnel_id
                AND rollcall_id = '${rollcallId}' AND personnel.role != 'admin';
                `

    db.query(sql, function (err, data) {
        if (err) {
            result("Fail")
        } else {
            result(data)
        }
    })
}


StatisticalModel.delete = function (id, result) {

    let sql = `DELETE FROM qr_code WHERE id = '${id}'`

    db.query(sql, function (err, data) {
        if (err) {
            result("Fail")
        } else {
            result(data)
        }
    })
}

module.exports = StatisticalModel