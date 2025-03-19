const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image : String,
    name : String,
    price : String,
    image : String,
    bgcolor : String,
    penelcolor : String,
    textcolor : String,
    discount : {
        type : Number,
        default : 0
    },
})

module.exports = module.exports("product", productSchema)