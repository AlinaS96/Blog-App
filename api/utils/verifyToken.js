const jwt = require('jsonwebtoken')

async function fetchUser(req,res,next){
    
    const token =  req.cookies.access_token 
    // || req.headers['access_token']
    //req.cookies['access-token'] || req.header('access_token')\
    
    if(!token) res.status(403).send("You are not authorized")
    
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) res.status(403).send('Token invalid')
        req.user=user
        next()
    })
}

async function verifyUser(req,res,next){
    const token = req.cookies.access_token || req.headers['access_token']
    if(!token) res.status(403).send("You are not authorized")
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) next(res.status(403).send('Token invalid'))
        req.user=user
        
        if(req.user.id == req.params.id) {
            next()
        }
        else{
            next(res.status(401).send("You are unauthorized"))
        }
    })

}

module.exports = { fetchUser, verifyUser }