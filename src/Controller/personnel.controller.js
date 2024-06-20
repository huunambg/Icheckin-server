const Personnel_Model = require("../Model/personnel.model")
const Rollcall_Controller = require("./rollcall.controller");
const JWT = require("../Auth/jsonwebtoken")

const create_Personnel = function (req, res) {
    let data = req.body
    let personnel_id = req.body.personnel_id
    Personnel_Model.insert(data, function (result) {
        if (result == "Fail") {
            res.status(502).send({ message: "Error Server" })
        } else if (result == "Email_already_exists") {
            res.status(401).send({ message: "Email already exists" })
        }
        else if (result == "Personnel_id_already_exists") {
            res.status(401).send({ message: "Personnel id already exists" })
        } else {
            let rollcall_detail_res = Rollcall_Controller.init_Rollcall_Detail(personnel_id)
            if (rollcall_detail_res != "Fail") {
                let rollcall_detail_res_day = Rollcall_Controller.init_Rollcall_Detail_Day(personnel_id)
                if (rollcall_detail_res_day != "Fail") {
                    res.send({ data: result, message: "Create personnel complete" })
                }

            }
        }
    })

}

const login_Personnel = function (req, res) {

    let personnel = req.body
    Personnel_Model.getOne(personnel, async function (result) {
        if (result != "Fail") {
            let data = {
                personnel_id:result.personnel_id,
                name:result.name,
                email: result.email,
                password :result.password,

            }
            
            let token = await JWT.make_token(data)

            res.send({ data: result,token :token, message: "Login personnel complete" })
        } else {
            res.status(401).send({ message: "Đăng nhập thất bại tài khoản hoặc mật khẩu không chính xác." })
        }
    })


}


const get_All_Personnel = function (req, res) {
    Personnel_Model.getAll(function (result) {
        if (result != "Fail") {
            res.send({ data: result })
        }
    })

}

const Personnel_Controller = {
    create_Personnel,
    get_All_Personnel,
    login_Personnel
}


module.exports = Personnel_Controller
