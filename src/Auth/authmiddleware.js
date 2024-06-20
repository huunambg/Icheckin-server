const JWT = require('./jsonwebtoken')

let is_Auth = async function (req,res,next){

    let token = req.headers.authorization
    if(token){
        try {
          JWT.check_token(token.split(' ')[1],function(err,data){
            if(err){
                res.status(401).send({
                    "message": "Token incorrect"
                });
            }else{
             //   console.log(data)
                next();
            }
          })
     
        } catch (e) {
            console.log(e)
            res.status(401).send({
                "message": "Token incorrect"
            });
    
        }
    }
    else{
        res.status(401).send({
            "message": "You have not sent tokens yet"
        });

    }
}


module.exports = {is_Auth : is_Auth}