var mysql = require('mysql')
var conection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : '',
    database : 'chamcong'
})

conection.connect(function(err,conection){
    if(err){
        console.log("Ket noi CSDL that bai")
    }
})

module.exports = conection