const Product = require("../model/product");
const User = require("../model/user");
require("dotenv").config();

const addShoppingCart = async(req, res) => {
    try{

    const product = await Product.findOne({_id: req.params.id})
    
      const user = await User.findOne({ _id: req.user.user._id });
      await user.addToCart(product._id);
      
      const userProduct = await User.findOne({ _id: req.user.user._id }).populate("shoppingCart");
      res.render("shoppingCart.ejs", {products: userProduct.shoppingCart, _id: " "});
    }
 catch (error) {
    console.log(error);
}
    };


    const renderShoppingCart = async(req, res)=> {
    
         const user = await User.findOne({_id: req.user.user._id}).populate("shoppingCart")
    
    
    res.render("shoppingCart.ejs" , {products: user.shoppingCart})
    
    }



// const removeShoppingCart = async (req,res) => {
//     const user = await User.findOne({_id: req.user.user._id});
//     const id = req.params.id;

//     user.removeFromCart(id);
//     await Product.deleteOne({_id: id});
    
//     res.redirect("/shoppingCart")
//     }

    
module.exports = {
    addShoppingCart,
    renderShoppingCart
   
}
