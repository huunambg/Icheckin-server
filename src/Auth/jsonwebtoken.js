const jwt = require('jsonwebtoken')
const App = require('../Common/app')

let make_token = function (data) {

    return new Promise((resolve, reject) => {
        jwt.sign({ data: data }, App.ACCESS_TOKEN, { algorithm: "HS256", expiresIn: App.TIME_LIFE_TOKEN }, function (err, _token) {
            if(err){
                return reject(err)
            }
            else{
                return resolve(_token)
            }
        })
    })

}


let check_token = function(token, result){
    try{
        jwt.verify(token, App.ACCESS_TOKEN, function (err, data) {
            if(err){
                result(err, null);
            }
            else{
                result(null, data);
            }
        })
    } catch(e) {
        result(e, null);
    }
}



const JWT ={make_token,check_token}

module.exports = JWT