const Personnel_Model = require("../Model/personnel.model")
const Rollcall_Controller = require("./rollcall.controller");
const JWT = require("../Auth/jsonwebtoken")

const create_Personnel = function (req, res) {
    let data = req.body
    Personnel_Model.insert(data, function (result) {
        if (result == "Fail") {
            res.status(502).send({ message: "Error Server" })
        } else if (result == "Email_already_exists") {
            res.status(401).send({ message: "Email already exists" })
        } else {
            let rollcall_detail_res = Rollcall_Controller.init_Rollcall_Detail(result)
            if (rollcall_detail_res != "Fail") {
                let rollcall_detail_res_day = Rollcall_Controller.init_Rollcall_Detail_Day(result)
                if (rollcall_detail_res_day != "Fail") {
                    res.send({ data: { email: data.email, password: data.password, personnel_id: result }, message: "Create personnel complete" })
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
                personnel_id: result.personnel_id,
                name: result.name,
                email: result.email,
                password: result.password,

            }

            let token = await JWT.make_token(data)

            res.send({ data: result, token: token, message: "Login personnel complete" })
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
const get_Personnel_With_Filter = function (req, res) {
    let search = req.params.search
    Personnel_Model.getWithFilter(search, function (result) {
        if (result != "Fail") {
            res.send({ data: result })
        }
    })

}

const update_Personnel = function (req, res) {
    let personnel = req.body
    let personnel_id = req.params.personnel_id
    Personnel_Model.update(personnel_id, personnel, function (result) {
        if (result != "Fail") {
            res.send({ data: result, message: "Cập nhật thông tin thành công" })
        } else {
            res.send({ data: result, message: "Cập nhật thông tin thất bại" })
        }
    })

}


const delete_Personnel = function (req, res) {
    let personnel_id = req.params.personnel_id
    Personnel_Model.delete(personnel_id, function (result) {
        if (result != "Fail") {
            if(result.affectedRows==0){
                res.status(401).send({ data: result, message: "Không tìm thấy người dùng" })
              }else{
                res.send({ data: result, message: "Xóa thành công" })
              }
        } else {
            res.send({ data: result, message: "Xóa thất bại" })
        }
    })

}





const Personnel_Controller = {
    create_Personnel,
    get_All_Personnel,
    login_Personnel, update_Personnel, delete_Personnel, get_Personnel_With_Filter
}


module.exports = Personnel_Controller
