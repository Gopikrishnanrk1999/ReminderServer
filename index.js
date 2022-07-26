const express = require('express')

const app = express()

const jwt = require('jsonwebtoken')
// import cors 
const cors = require('cors')

// import DataService 
const dataService= require('./services/data.service')

// server app create using express 

const app = express()

// cors use in server app 
app.use(cors({
    origin:'http://localhost:4200'
}))

// parse JSON data

app.use(express.json())

// application specific middleware 
const appMiddleware = (req,res,next)=>{
    console.log("Application specific middleware");
    next()
}

// use middleware in app 
app.use(appMiddleware)

// bank server 

const jwtMiddleware = (req,res,next)=>{
    // fetch token
    try{
    token = req.headers['x-access-token']
    // verify token 
    const data = jwt.verify(token,'Secretkey2255')
    console.log(data);
    req.currentAcno = data.currentAcno
    next()
    }
    catch{
        res.status(401).json({
                status:false,
                statusCode:401,
                message:'Please Log in'
        })
    }
    
}

app.post('/login',(req,res)=>{
    dataService.login(req.body.username,req.body.pswd)
     .then(result =>{
        res.status(result.statusCode).json(result)
     })
     })

app.listen(3001,()=>{
    console.log("Server started at 3000");
})