const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const Schema=mongoose.Schema
const userSchema=new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return "invalid email"
            }
        }
    },
    password:{
            type:String,
            required:true,
            minlength:6,
            maxlength:128
        },
        tokens:[


            {
                token:{
                    type:String
                },
                createdAt:{
                    type:Date,
                    default:Date.now
                }
            } 
        ]
    })
userSchema.pre('save',function(next){
    const user=this
    if(user.isNew){ 
        console.log('in if')
        bcryptjs.genSalt(10)
        .then(function(salt){
            console.log('in bcrypt'+user.password)
            bcryptjs.hash(user.password,salt)
                 .then(function(encryptedPassword){
                console.log('in encpass')
                user.password=encryptedPassword
                console.log(user+'at the end')
                next()
            })
        })   
    }
    else{
        next()
    }

})
userSchema.statics.findByCredentials=function(email,password){
const User=this

return User.findOne({email})
        .then(function(user){
            
            if(!user){
                return Promise.reject('invalid email/password')

            }
            return bcryptjs.compare(password,user.password)
                .then(function(result){
                    
                    if(result){
                        return Promise.resolve(user)
                    }
                   else{
                       return Promise.reject('invalid email/password')
                   }
                })
                .catch(function(err){
                    return Promise.reject(err)
                })
        })
}

userSchema.statics.findByToken=function(token){
    const User=this
    console.log('i am in findby token')
    let tokenData
    try{
        tokenData=jwt.verify(token,'jwt@123')
    }
    catch(err){
        return Promise.reject(err)
    }
    return User.findOne({
        _id:tokenData.id,
        'tokens.token':token
    })
}
userSchema.methods.gentrateToken=function(){
   
    const user=this
    console.log(user)
    const tokenData={
        _id:user._id,
        username:user.username,
        createdAt:Number(Date.now())
    }
    const token=jwt.sign(tokenData,'jwt@123')
   
    user.tokens.push({
        token
    })  
    return user.save()
    .then(function(user){
        return Promise.resolve(token)
    })
    .catch(function(err){
        return Promise.reject(err)
    })
}
const User=mongoose.model('User',userSchema)
module.exports=User