const Product = require("../model/product");

const homeRender = (req, res)=>{
    res.render("homeTest.ejs")
}

const addProductFormSubmit = async(req, res)=>{
    const {name, description, price}=   req.body
    const product = await new Product({name: name, description:description, price: price}).save();
    console.log(product)

    return res.redirect("/")
}

module.exports = {
    homeRender,
    addProductFormSubmit
}