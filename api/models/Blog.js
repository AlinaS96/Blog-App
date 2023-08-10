const mongoose = require('mongoose')
const {Schema} = mongoose;

const blogSchema = new mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        default:'Life'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps:true})

module.exports = mongoose.model('Blog', blogSchema)