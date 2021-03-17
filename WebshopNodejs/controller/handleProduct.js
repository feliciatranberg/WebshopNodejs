const Product = require("../model/product");
const { startSession } = require("../model/user");
const User = require("../model/user")
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const showUserProducts =async (req, res)=>{
const user = await User.findOne({_id:req.user.user._id}).populate("productList")
console.log(user.productList);
res.render("myProducts.ejs", { products: user.productList, err:""})
}

const showProduct = async(req, res)=>{
 const products = await Product.find()
res.render("home.ejs", {err:" ", products:products})
}

const addToShoppingCart = async(req, res) => {
    const productId = req.params.id
    const user = await User.findOne({_id:req.user.user._id})
   user.addToCart(productId);
  const userWithProductData = await User.findOne({_id:req.user.user._id}).populate("shoppingCart");
  console.log(userWithProductData.shoppingCart);
  res.render("shoppingCart.ejs", {cartItem:userWithProductData.shoppingCart, err:" " })
  
}

const checkout = async(req, res)=> {
     const user = await User.findOne({_id: req.user.user._id}).populate("shoppingCart")
     console.log(user.shoppingCart)
    
    if(!user.shoppingCart || user.shoppingCart.length ===0) return res.redirect("/shoppingCart")
 const session=    await stripe.checkout.sessions.create({
        success_url: 'http://localhost:7777/shoppingSuccess',
        cancel_url: 'https://example.com/cancel',
        payment_method_types: ['card'],
        line_items: user.shoppingCart.map( product => {

            return {
                name: product.name, 
                amount:  product.price * 100, 
                quantity: 1, 
                currency: "sek"
            }
        }), 
      mode: 'payment',
    })
res.render("checkout.ejs" , {cartItem: user.shoppingCart, sessionId: session.id})
}

const shoppingSuccess = async (req, res)=>{
    const user =  await User.findOne({_id: req.user.user._id})
    user.shoppingCart = [];
    user.save();
    console.log(user)
    res.render("shoppingSuccess.ejs")
}

module.exports= { 
    showProduct,
    addToShoppingCart,
    showUserProducts,
    checkout,
    shoppingSuccess
}