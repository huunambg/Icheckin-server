const Rollcall_Model = require("../Model/rollcall.model")


let init_Rollcall = function (req, res) {
    let currentDate = new Date();
    // var month = currentDate.getMonth() + 1;
    let month = 1;
    let year = currentDate.getFullYear();
    let fulldata = []
    for (let i = month; i <= 12; i++) {
        let number_day_in_month = new Date(year, i, 0).getDate()
        let data = {
            rollcall_id: `${year}${i}`,
            year: year,
            month: i,
            caculation_date: `${year}-${i}-20`,
            number_day_in_month: number_day_in_month
        }
        Rollcall_Model.insert_Rollcall(data, function (result) {
            if (result == "Fail") {
                res.status(401).send({ message: "Init RolllCall Fail" })
            }
        })

        fulldata.push(data)

    }
    res.send({ message: "Init RolllCall Success", data: fulldata })

}


let init_Rollcall_Detail = function (personnel_id) {

    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7);
    let month = 1;
    let year = currentDate.getFullYear();
    let fulldata = []
    for (let i = month; i <= 12; i++) {
        let data = {
            rollcall_id: `${year}${i}`,
            personnel_id: personnel_id,

        }
        Rollcall_Model.insert_Rollcall_Detail(data, function (result) {
            if (result == "Fail") {
                return "Fail"
            }
        })

        fulldata.push(data)

    }
    return "Success"
}

let init_Rollcall_Detail_Day = function (personnel_id) {
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7);
    let month = 12;
    let year = currentDate.getFullYear();
    for (let i = 1; i <= month; i++) {
        let number_day_in_month = new Date(year, i, 0).getDate()
        for (let j = 1; j <= number_day_in_month; j++) {
            let data = {
                rollcall_id: `${year}${i}`,
                personnel_id: personnel_id,
                day: j
            }
            Rollcall_Model.insert_Rollcall_Detail_Day(data, function (result) {
                if (result != "Fail") {
                    return "Fail"
                }
            })
        }
    }
    return "Success"
}


let get_Rollcall_Detail_by_this_month = function (req, res) {
    let personnel_id = req.params.personnel_id
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7);
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    let year_month = `${year}${month}`

    Rollcall_Model.get_Rollcall_Detail_by_Year_Month(year_month, personnel_id, function (result) {
        if (result != "Fail") {
            res.send({ data: result })
        }
        else {
            res.status(401).send({ message: "Get data Fail" })
        }
    })
}


let get_Rollcall_Detail_by_Year_Month = function (req, res) {
    let personnel_id = req.body.personnel_id
    let month = req.body.month
    let year = req.body.year

    let year_month = `${year}${month}`

    Rollcall_Model.get_Rollcall_Detail_by_Year_Month(year_month, personnel_id, function (result) {
        if (result != "Fail") {
            res.send({ data: result })
        }
        else {
            res.status(401).send({ message: "Get data Fail" })
        }
    })
}

let get_Rollcall_Detail_Day_by_Year_Month = function (req, res) {
    let personnel_id = req.body.personnel_id
    let month = req.body.month
    let year = req.body.year
    let year_month = `${year}${month}`

    Rollcall_Model.get_Rollcall_Detail_Day_by_Year_Month(year_month, personnel_id, function (result) {
        if (result != "Fail") {
            res.send({ data: result })
        }
        else {
            res.status(401).send({ message: "Get data Fail" })
        }
    })
}


let get_Rollcall_Detail_Day_by_Year_Month_Day = function (req, res) {
    let personnel_id = req.body.personnel_id
    let month = req.body.month
    let year = req.body.year
    let day = req.body.day
    let year_month = `${year}${month}`

    Rollcall_Model.get_Rollcall_Detail_Day_by_Year_Month_Day(year_month, personnel_id,day, function (result) {
        if (result != "Fail") {
            res.send({ data: result })
        }
        else {
            res.status(401).send({ message: "Get data Fail" })
        }
    })
}


let rollcall = function (req, res) {
    let personnel_id = req.params.personnel_id
    let currentDate = new Date();

    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    let day = currentDate.getDate();
    let year_month = `${year}${month}`
    let place = req.body.place

    Rollcall_Model.get_Rollcall_Detail_Day_by_Year_Month_Day(year_month, personnel_id, day, function (result) {
        if (result != "Fail") {
            try {
                let data = result;
                if (data['in1'] == null) {
                    data['in1'] = currentDate
                    data['place_in1'] = place
                    Rollcall_Model.update_Rollcall_Detail_Day_by_Year_Month_Day(data, result['id'], function (result) {
                        res.send({ message: "Successful Attendance", data: result })
                    })
                }
                else if (data['out1'] == null) {
                    let time_old = data['time'];
                    data['out1'] = currentDate
                    let time_in1 = new Date(data['in1'])
                    let time_out1 = currentDate
                    let khoangCach = Math.ceil((time_out1.getTime() - time_in1.getTime()) / (1000 * 60));
                    data['place_out1'] = place
                    data['time'] = time_old + khoangCach

                    Rollcall_Model.get_Rollcall_Detail_by_Year_Month(year_month, personnel_id, function (result) {
                        let data_rollcall_detail = result
                        let total_working_time_old = result['total_working_time']
                        let total_working_day_old = result['total_working_day']
                        data_rollcall_detail[`d${day}`] = "V"
                        data_rollcall_detail['total_working_time'] = total_working_time_old + khoangCach
                        data_rollcall_detail['total_working_day'] = total_working_day_old + 1
                        Rollcall_Model.update_Rollcall_Detail(data_rollcall_detail,function(result_update_Rollcall_Detail){
                            if(result_update_Rollcall_Detail=="Fail"){
                                res.status(401).send({ message: "Rollcall Fail" })
                            }
                        })
                    })
                    Rollcall_Model.update_Rollcall_Detail_Day_by_Year_Month_Day(data, result['id'], function (result) {

                        res.send({ message: "Successful Attendance", data: result })

                    })

                }
                else if (data['in2'] == null) {
                    data['in2'] = currentDate
                    data['place_in2'] = place

                    Rollcall_Model.update_Rollcall_Detail_Day_by_Year_Month_Day(data, result['id'], function (result) {
                        res.send({ message: "Successful Attendance", data: result })

                    })
                } else if (data['out2'] == null) {
                    let time_old = data['time'];
                    let time_in2 = new Date(data['in2'])
                    let time_out2 = currentDate
                    let khoangCach = Math.ceil((time_out2.getTime() - time_in2.getTime()) / (1000 * 60));
                    data['out2'] = currentDate
                    data['place_out2'] = place
                    data['time'] = time_old + khoangCach

                    Rollcall_Model.get_Rollcall_Detail_by_Year_Month(year_month, personnel_id, function (result) {
                        let data_rollcall_detail = result
                        let total_working_time_old = result['total_working_time']
                        data_rollcall_detail['total_working_time'] = total_working_time_old + khoangCach
                        Rollcall_Model.update_Rollcall_Detail(data_rollcall_detail,function(result_update_Rollcall_Detail){
                            if(result_update_Rollcall_Detail=="Fail"){
                                res.status(401).send({ message: "Rollcall Fail" })
                            }
                        })
                    })

                    Rollcall_Model.update_Rollcall_Detail_Day_by_Year_Month_Day(data, result['id'], function (result) {
                        if(result!="Fail"){
                            res.send({ message: "Successful Attendance", data: result })
                        }
                        else{
                              res.status(401).send({ message: "Rollcall Fail" })
                        }

                    

                    })
                } else {
                    res.status(300).send({ message: "You have completed Rolcall for the day" })
                }
            } catch (e) {
                res.status(401).send({ message: "Rollcall Fail" })
            }


        }
        else {
            res.status(401).send({ message: "Rollcall Fail" })
        }
    })

}


let get_Last_Rollcall_Time = function(req,res){

    let personnel_id = req.params.personnel_id
    let currentDate = new Date();
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    let year_month = `${year}${month}`
    let day = currentDate.getDate();

    time_old = "2024-04-06T04:02:29.749Z";

    Rollcall_Model.get_Rollcall_Detail_Day_by_Year_Month_Day(year_month,personnel_id,day,function(result){
        
        if(result['in1'] ==null){
            res.send({time :time_old})
        }else if(result['out1'] ==null){
            res.send({time : result['in1']})
        }else if(result['in2']==null){
            res.send({time : result['out1']})
        }else{
            res.send({time : result['in2']})
        }
    })


}




const Rollcall_Controller = {
    init_Rollcall,
    init_Rollcall_Detail,
    init_Rollcall_Detail_Day,
    get_Rollcall_Detail_by_this_month,
    get_Rollcall_Detail_by_Year_Month,
    get_Rollcall_Detail_Day_by_Year_Month,
    rollcall,
    get_Rollcall_Detail_Day_by_Year_Month_Day,
    get_Last_Rollcall_Time
}


module.exports = Rollcall_Controller