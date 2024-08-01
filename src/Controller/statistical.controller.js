const StatisticalModel = require("../Model/statistical.model")

const getAllPersonnelThisMonth = function(req,res){
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    let yearMonth = `${currentYear}${currentMonth}`;
    

    StatisticalModel.getAllPersonnel(yearMonth,function(result){
        if(result!="Fail"){
            res.send({data :result})
        }
        else{
            res.status(401).send({message : "Get Data Fail"})
        }


    })

}
const getAllPersonnelByYearMonth = function(req,res){
    let yearMonth = req.params.id

    StatisticalModel.getAllPersonnel(yearMonth,function(result){
        if(result!="Fail"){
            res.send({data :result})
        }
        else{
            res.status(401).send({message : "Get Data Fail"})
        }


    })
}

const StatisticalController = {
getAllPersonnelThisMonth,
getAllPersonnelByYearMonth
}


module.exports = StatisticalController