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

userSchema.methods.addToCart = async function(productId) {
   this.shoppingCart.push(productId)
   await this.save();
}

// userSchema.methods.removeFromCart = async function (productId) {
//     let index = this.shoppingCart.indexOf(productId);
//     this.shoppingCart.splice(index, 1);
//     await this.save();
// }

userSchema.methods.removeFromShoppingCart = async function (productId) {
    let index = this.shoppingCart.indexOf(productId);
    this.shoppingCart.splice(index, 1);
    await this.save();
    console.log("deleting from shopping Cart")
    
}

// userSchema.methods.removeFromMyShoppingCart = function(selectedProduct) {
//     const isFound = (element) => element._id.equals(selectedProduct._id);
//     let index = this.myShoppingCart.findIndex(isFound);
//     this.myShoppingCart.splice(index, 1);
//     this.save()
// }

userSchema.methods.addAdminProducts = async function(productId){

    this.adminProducts.push(productId);
    await this.save();
}

userSchema.methods.removeAdminProducts = async function (productId) {
    let index = this.adminProducts.indexOf(productId);
    await this.adminProducts.splice(index, 1);
    this.save();
}

const User = mongoose.model("user", userSchema)

module.exports = User; 