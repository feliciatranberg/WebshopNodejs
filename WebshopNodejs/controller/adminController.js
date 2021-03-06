const Product = require("../model/product");
const User = require("../model/user");


const adminProductHome = async(req, res) => {
   
        const user = await User.findOne({_id: req.user.user._id}).populate("adminProducts");
        res.render("admin.ejs", {products: user.adminProducts, id: " "});
}
const addProduct = async (req,res) => {

        const product = await new Product({
            name: req.body.name,
            image: "/uploads/" + req.file.filename,
            description: req.body.description,
            price: req.body.price,
        }).save();

        const user = await User.findOne({_id: req.user.user._id})

        user.addAdminProducts(product._id);
        res.redirect("/admin")
}

const editProductHome = async (req, res) => {

        const id = req.params.id;
        const user = await User.findOne({_id: req.user.user._id}).populate("adminProducts");
        res.render("admin.ejs", {id:id, products: user.adminProducts});

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
        res.redirect("/admin");
}

const deleteProduct = async (req, res) => {

    const user = await User.findOne({_id: req.user.user._id});
    const id = req.params.id;

    user.removeAdminProducts(id);
    await Product.deleteOne({_id: id});
    
    res.redirect("/admin")
}

module.exports= {
    adminProductHome,
    addProduct,
    editProductHome,
    editProduct,
    deleteProduct
}