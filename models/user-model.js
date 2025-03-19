const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        minLength : 3,
        trim : true
    },
    email : String,
    password : String,
    contact : Number,
    picture : String,
    isadmin : Boolean,
    orders : {
        type : Array,
        default : []
    },
    cart : {
        type : Array,
        default : []
    },
})

module.exports = module.exports("user", userSchema)