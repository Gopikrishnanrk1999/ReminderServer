const mongoose = require('mongoose')

// connection string 
mongoose.connect('mongodb://localhost:27017/reminderApp',{
    useNewUrlParser:true
})
// model defition 
const User = mongoose.model('Users',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction: []


})

module.exports={
    User
}