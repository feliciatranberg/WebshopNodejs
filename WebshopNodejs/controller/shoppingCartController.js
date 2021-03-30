const Product = require("../model/product");
const User = require("../model/user");
require("dotenv").config();

const shoppingCart = async(req, res) => {

    // add to mongoDB shoppingCart
    const product = await Product.findOne({_id: req.params.id})
      const userProduct = await User.findOne({ _id: req.user.user._id });
      await userProduct.addToCart(product._id);
      
       // show on shoppingCart page
         const user = await User.findOne({_id: req.user.user._id}).populate("shoppingCart");
         res.render("shoppingCart.ejs", {products: user.shoppingCart});
}

const checkout = async(req, res)=> {
    
    // totalprice count on checkout page
     let totalprice;
     const user = await User.findOne({_id: req.user.user._id}).populate("shoppingCart");
     const count = (accumulator, currentValue) => accumulator + currentValue;
     if(user.shoppingCart.length === 0) {
         totalprice = 0;
     } else {
     const prices = [];
     user.shoppingCart.map(products => {
         prices.push(products.price);
     })
     totalprice = prices.reduce(count)
     }
     res.render("checkout.ejs", {products: user.shoppingCart, totalprice});
}
  
const removeShoppingCart = async (req,res) => {

    const user = await User.findOne({_id: req.user.user._id})
    const id = req.params.id;

    const toBeRemovedProduct = await Product.findOne({_id: req.params.id});
    user.removeFromShoppingCart(toBeRemovedProduct._id);
    res.redirect("/checkout");
    //res.render("shoppingCart.ejs", {products: user.shoppingCart});
    //res.render("shoppingCart.ejs", {products: user.shoppingCart});
    if(user.shoppingCart.length === 0) {
        console.log("Your Shopping Cart is Empty");

    }
    console.log(shoppingCart);
}

// const removeShoppingCart = async (req,res) => {
//     const user = await User.findOne({_id: req.user.user._id});
//     const id = req.params.id;

//     user.removeFromCart(id);
//     await Product.deleteOne({_id: id});
    
//     res.redirect("/shoppingCart")
//     }

module.exports = {
    shoppingCart,
    checkout,
    removeShoppingCart

}
