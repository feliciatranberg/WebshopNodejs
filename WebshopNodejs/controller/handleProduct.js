const Product = require("../model/product");
const { startSession } = require("../model/user");
const User = require("../model/user")
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const addProductForm = (req, res)=>{
    res.render("addProduct.ejs", {err:" "})
}

const addProductFormSubmit = async(req, res)=>{
 const {imageUrl, name, description, price}=   req.body
 // skapa course i database 
 const product = await new Product({
     imageUrl: "/img/" + imageUrl,
     name: name,
     description:description,
     price: price}).save();
    
 const user = await User.findOne({_id:req.user.user._id})

 user.addProductList(product._id);
 console.log(user)
 res.redirect("/addProduct")
}

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
    //req.params.id
    const productId = req.params.id
    // vi ska spara course Id in i user collection
    const user = await User.findOne({_id:req.user.user._id})
  // console.log(user)
    // hur ska vi spara detta 
   user.addToCart(productId);
   //console.log(user);
  const userWithProductData = await User.findOne({_id:req.user.user._id}).populate("shoppingCart");
 // console.log(userWithCourseData.shoppingCart)
  res.render("shoppingCart.ejs", {cartItem:userWithProductData.shoppingCart, err:" " })
}

const checkout = async(req, res)=> {
    
    // hitta courses som ska köpas 
     const user = await User.findOne({_id: req.user.user._id}).populate("shoppingCart")

     console.log(user.shoppingCart)
    //  success router, cancel router

    //const price = Number(user.shoppingCart[0].price)
    // skapa stripe session 
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
    addProductForm, 
    showProduct,
    addProductFormSubmit,
    addToShoppingCart,
    showUserProducts,
    checkout,
    shoppingSuccess
}