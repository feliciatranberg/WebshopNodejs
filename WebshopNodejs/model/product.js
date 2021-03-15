const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    imageUrl: String,
    name: {type: String}, 
    description: String, 
    price : {type:Number}
})

const Product = mongoose.model("product", productSchema)

module.exports = Product;