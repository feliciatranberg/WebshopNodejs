const { 
    addProductForm, 
    addProductFormSubmit,
    showProducts, 
    addToShoppingCart,
    //showInstructorProducts,
    checkout,
    shoppingSuccess
 } = require("../controller/handleProduct");
const express = require("express");
//const verifyInstructor = require("../middleware/verifyInstructor");
const verifyUser = require("../middleware/verifyUser")

const router = express.Router();



router.get("/addProduct", verifyInstructor, addProductForm);
router.post("/addProduct", verifyInstructor, addProductFormSubmit);
router.get("/showProducts", verifyUser, showProducts)
router.get("/showShoppingCart", verifyUser, addToShoppingCart)
router.get("/addToCart/:id", verifyUser, addToShoppingCart)
//router.get("/showMyProducts", verifyInstructor, showInstructorProducts);

router.get("/checkout", verifyUser, checkout)
router.get("/shoppingSuccess", verifyUser, shoppingSuccess)
module.exports = router;