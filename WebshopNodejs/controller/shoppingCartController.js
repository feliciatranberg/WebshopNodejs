const Product = require("../model/product");
const User = require("../model/user");
require("dotenv").config();

const shoppingCart = async(req, res) => {

    const product = await Product.findOne({_id: req.params.id})
    
      const userProduct = await User.findOne({ _id: req.user.user._id });
      await userProduct.addToCart(product._id);
      
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
         res.render("shoppingCart.ejs", {products: user.shoppingCart, id: "", totalprice});
}

const checkout = async(req, res)=> {
    
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
     res.render("checkout.ejs", {products: user.shoppingCart, id: "", totalprice});
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
    checkout 

}
