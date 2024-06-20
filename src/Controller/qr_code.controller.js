const QR_Code_Model = require("../Model/qr_code.model")

const insert_QR_Code = function(req,res){
    let qr_code = req.body

    QR_Code_Model.insert(qr_code,function(result){
        if(result!="Fail"){
            res.send({message : "Insert QR Code complete"})
        }
        else{
            res.status(401).send({message : "Insert QR Code Faild"})
        }


    })

}


const get_QR_Code = function(req,res){

    QR_Code_Model.get(function(result){
        if(result!="Fail"){
            res.send({data : result[0]['content'] ,message : "Get QR Code complete"})
        }
        else{
            res.status(401).send({message : "get QR Code Faild"})
        }
    })

}




const QR_Code_Controller ={
    insert_QR_Code,
    get_QR_Code
}

module.exports = QR_Code_Controller