const Product = require("../model/product");
const { startSession } = require("../model/user");
const User = require("../model/user")
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const addProductForm = (req, res)=>{
    res.render("productForm.ejs", {err:" "})
}

const addProductFormSubmit = async(req, res)=>{
 const {name, description, price}=   req.body
 // skapa product i database 
 const product = await new Product({name: name, description:description, price: price}).save();
    
 
 const user = await User.findOne({_id:req.user.user._id})

 user.addProductList(product._id);
 console.log(user)
 res.redirect("/showProducts")
}


const showInstructorProducts =async (req, res)=>{

//hitta vilken user/Instructor som är inloggad 
// populera productList 
// visa den till ejs template 

const user = await User.findOne({_id:req.user.user._id}).populate("productList")

console.log(user.productList);

res.render("instructorPage.ejs", { products: user.productList, err:""})


}


const showProducts = async(req, res)=>{
 const products = await Product.find()
res.render("showProduct.ejs", {err:" ", products:products})
}

const addToShoppingCart = async(req, res) => {

    const productId = req.params.id
  
    const user = await User.findOne({_id:req.user.user._id})
  
   user.addToCart(productId);
   
  const userWithProductData = await User.findOne({_id:req.user.user._id}).populate("shoppingCart");
 
  res.render("shoppingCart.ejs", {cartItem:userWithProductData.shoppingCart, err:" " })
}

const checkout = async(req, res)=> {
    
         const user = await User.findOne({_id: req.user.user._id}).populate("shoppingCart")

     console.log(user.shoppingCart)
    //  success router, cancel router

    //const price = Number(user.shoppingCart[0].price)
    // skapa stripe session 
    if(!user.shoppingCart || user.shoppingCart.length ===0) return res.redirect("/showProducts")
 const session=    await stripe.checkout.sessions.create({
        success_url: 'http://localhost:8002/shoppingSuccess',
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
    res.send(" din  varukorg är tomt . Vi skickar din beställning inom 3 dagar")

}


module.exports= {
    addProductForm, 
    showProducts,
    addProductFormSubmit,
    addToShoppingCart,
    //showInstructorProducts,
    checkout,
    shoppingSuccess
}