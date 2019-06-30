const express=require('express')
const router=express.Router()
const User=require('../model/user')
const authenticateUser=require('../middlewares/authentication')

router.post('/register',function(req,res){
    const body=req.body
    const user=new User(body) 
    console.log(user)
    user.save()
        .then(function(user){
             res.send(user)
        })
    .catch(function(err){
            res.send(err)
    })
})
router.post('/login', function(req, res){
    const body = req.body    
    User.findByCredentials(body.email, body.password)
        .then(function(user){
             return user.gentrateToken()
        })
        .then(function(token){
            res.send({token})
            // res.setHeader('x-auth', token).send({})
        })
        .catch(function(err){
            res.send(err)
        })

})
router.get('/account',authenticateUser,function(req, res){
    const { user } = req 
    console.log(user)
    res.send(user)
})


// localhost:3000/users/logout
router.delete('/logout',authenticateUser,function(req, res){
    const { user, token } = req 
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token }}})
        .then(function(){
            res.send({notice: 'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
})


const usersRouter= router
module.exports = usersRouter

