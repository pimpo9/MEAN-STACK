var mongoose=require('mongoose')

var url="mongodb://localhost:27017/mean79"

mongoose.connect(url)

var con=mongoose.connection


module.exports=con

console.log('connection done...')

