var mysql = require('mysql')
var conection = mysql.createConnection({
    host: 'localhost',
    user : 'baocaon1_admin',
    password : 'n',
    database : 'baocaon1_chamcong'
})

conection.connect(function(err,conection){
    if(err){
        console.log("Ket noi CSDL that bai")
    }
})

module.exports = conection