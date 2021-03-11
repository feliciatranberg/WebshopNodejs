const { 
    addProductForm, 
    addProductFormSubmit,
    showProduct, 
    addToShoppingCart,
    showUserProducts,
    checkout,
    shoppingSuccess
    
 } = require("../controller/handleProduct");
const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyUser = require("../middleware/verifyUser")
const router = express.Router();

router.get("/", showProduct);
router.get("/home", showProduct);
router.get("/addProduct", verifyUser, verifyAdmin, addProductForm);
router.post("/addProduct", verifyUser, verifyAdmin, addProductFormSubmit);
router.get("/myProducts", verifyUser, showUserProducts);
router.get("/showShoppingCart", verifyUser, addToShoppingCart)
router.get("/addToCart/:id", verifyUser, addToShoppingCart)

router.get("/checkout", verifyUser, checkout)
router.get("/shoppingSuccess", verifyUser, shoppingSuccess)

router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").redirect("/home")
})

module.exports = router;