const Break_Time_Model = require('../Model/break_time.model')

const insert_break_time = function(req,res){
    let break_time = req.body

    Break_Time_Model.insert(break_time,function(result){
        if(result!="Fail"){
            res.send({message : "Insert break_time complete"})
        }
        else{
            res.status(401).send({message : "Insert break_time Faild"})
        }
    })

}


const get_break_time = function(req,res){
 Break_Time_Model.get(function(result){
    if(result!="Fail"){
        res.send({data:result,message : "Get break_time complete"})
    }
    else{
        res.status(401).send({message : "Get break_time Faild"})
    }

 })

}

const Break_Time_Controller = {insert_break_time,get_break_time}

module.exports = Break_Time_Controller