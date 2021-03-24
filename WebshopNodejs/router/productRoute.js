const { 
    pagination,
    showProduct, 
    addToShoppingCart,
    showUserProducts,
    checkout,
    shoppingSuccess
 } = require("../controller/handleProduct");
const express = require("express");
const verifyUser = require("../middleware/verifyuser")
const router = express.Router();

router.get("/", showProduct, pagination);
router.get("/home", showProduct, pagination);
router.get("/myProducts", verifyUser, showUserProducts);
router.get("/ShoppingCart", verifyUser, addToShoppingCart)
router.get("/ShoppingCart/:id", verifyUser, addToShoppingCart)

router.get("/showproduct", verifyUser, showProduct)



router.get("/checkout", verifyUser, checkout)
router.get("/shoppingSuccess", verifyUser, shoppingSuccess)

router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").redirect("/home")
})

module.exports = router;
