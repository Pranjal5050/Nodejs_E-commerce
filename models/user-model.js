const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        minLength : 3,
        trim : true,
    },
    email : String,
    password : String,
    contact : Number,
    picture : String,
    orders : {
        type : Array,
        default : []
    },
    cart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "product",
    }],
});

module.exports = mongoose.model("user", userSchema);