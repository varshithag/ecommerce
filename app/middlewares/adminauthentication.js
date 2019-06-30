const User=require('../model/user')
const authouriesUser=function(req,res,next){
    const token = req.header('x-auth')
    User.findByToken(token)
    .then(function(user) {
        if(user.isAdmin){
            next()     
        }
        else{
            res.status('404').send({notice:'unauthouries action'})
        }    
     })
    .catch(function (err) {
        res.status('401').send(err)
    })
}

module.exports=authouriesUser

