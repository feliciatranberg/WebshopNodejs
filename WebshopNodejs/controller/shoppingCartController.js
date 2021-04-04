const Product = require("../model/product");
const User = require("../model/user");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
   
    const session = await stripe.checkout.sessions.create({
           success_url: 'http://localhost:7777/shoppingSuccess',
           cancel_url: 'https://example.com/cancel',
           payment_method_types: ['card'],
           line_items: user.shoppingCart.map( products => {
   
               return {
                   name: products.name, 
                   amount:  products.price * 100, 
                   quantity: 1, 
                   currency: "sek"
               }
           }), 
         mode: 'payment',
         
       })
   console.log(session)
   res.render("checkout.ejs" , {products: user.shoppingCart, totalprice, sessionId: session.id})
   }
 
  
const removeShoppingCart = async (req,res) => {

    const user = await User.findOne({_id: req.user.user._id})
    const id = req.params.id;

    const toBeRemovedProduct = await Product.findOne({_id: req.params.id});
    user.removeFromShoppingCart(toBeRemovedProduct._id);
    res.redirect("/checkout");
    //res.render("shoppingCart.ejs", {products: user.shoppingCart});
  
    if(user.shoppingCart.length === 0) {
        console.log("Your Shopping Cart is Empty");
    }
    }

const shoppingSuccess = async (req, res)=>{

    const user =  await User.findOne({_id: req.user.user._id})
    user.shoppingCart = [];
    user.save();
    console.log(user)
    res.send("Your cart is emty. We will send the order in 1-2 days!")
}

module.exports = {
    shoppingCart,
    checkout,
    removeShoppingCart,
    shoppingSuccess
}
