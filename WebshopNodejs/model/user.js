const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema({

    email: {type:String, required:true, unique: true},
    password:{type:String, required:true},
    role: String, 
    token:String,
    tokenExpiration: Date,
    shoppingCart: [
        {
            type:mongoose.Schema.Types.ObjectId, 
            ref: "product"
        }
    ], 
    adminProducts: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "product"
    }]
})

userSchema.methods.addToCart = function(productId) {
   this.shoppingCart.push(productId)
   this.save();
}

userSchema.methods.removeFromCart = function (productId) {
    let index = this.shoppingCart.indexOf(productId);
    this.shoppingCart.splice(index, 1);
    this.save();
}

userSchema.methods.addAdminProducts = function(productId){

    this.adminProducts.push(productId);
    this.save();
}

userSchema.methods.removeAdminProducts = function (productId) {
    let index = this.adminProducts.indexOf(productId);
    this.adminProducts.splice(index, 1);
    this.save();
}

const User = mongoose.model("user", userSchema)

module.exports = User; 