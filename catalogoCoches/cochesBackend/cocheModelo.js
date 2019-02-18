let mongoose = require('mongoose')
let Schema = mongoose.Schema
let cocheSchema = Schema({
    _id:{type:Schema.ObjectId,auto:true},
    //id:String,
    nombre:String,
    modelo:String,
    precio:Number
})

module.exports = mongoose.model('Coche',cocheSchema)