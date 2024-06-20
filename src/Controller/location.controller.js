const Location_Model = require('../Model/location.model')

const insert_Location = function(req,res){
    let location = req.body

    Location_Model.insert(location,function(result){
        if(result!="Fail"){
            res.send({message : "Insert location complete"})
        }
        else{
            res.status(401).send({message : "Insert location Faild"})
        }
    })

}


const get_Location = function(req,res){
 Location_Model.get(function(result){
    if(result!="Fail"){
        res.send({data:result,message : "Get location complete"})
    }
    else{
        res.status(401).send({message : "Get location Faild"})
    }

 })

}

const Location_Controller = {insert_Location,get_Location}

module.exports = Location_Controller