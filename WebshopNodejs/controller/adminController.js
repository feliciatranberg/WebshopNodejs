const Product = require("../model/product");
const User = require("../model/user");

const addProductHome = async(req, res) => {
   
        const user = await User.findOne({_id: req.user.user._id}).populate("productList");
        res.render("addProduct.ejs", {products: user.productList, id: " "});
   
}
const addProduct = async (req,res) => {

        const product = await new Product({
            name: req.body.name,
            image: "/uploads/" + req.file.filename,
            description: req.body.description,
            price: req.body.price,
        }).save();

        const user = await User.findOne({_id: req.user.user._id})

        user.addProductList(product._id);
        res.redirect("/addProduct")
}

const editProductHome = async (req, res) => {

        const id = req.params.id;
        const user = await User.findOne({_id: req.user.user._id}).populate("productList");
        res.render("addProduct.ejs", {id:id, products: user.productList});

}

const editProduct = async (req,res) => {
 
        if (req.file == undefined) {
            console.log("undefined");
            await Product.updateOne({_id: req.params.id}, {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            });
        }else {
            console.log("defined");
            await Product.updateOne({_id: req.params.id}, {
                name: req.body.name,
                image: "/uploads/" + req.file.filename,
                description: req.body.description,
                price: req.body.price,
            });
        }  
        res.redirect("/addProduct");
}

const deleteProduct = async (req, res) => {
        const id = req.params.id;
        await Product.deleteOne({_id: id});

res.redirect("/addProduct");
}

module.exports= {
    addProductHome,
    addProduct,
    editProductHome,
    editProduct,
    deleteProduct
}