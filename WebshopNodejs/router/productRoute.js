const { 
    showProduct, 
    addToShoppingCart,
    checkout,
    shoppingSuccess
 } = require("../controller/handleProduct");
const express = require("express");
const verifyUser = require("../middleware/verifyuser")
const router = express.Router();

router.get("/", showProduct);
router.get("/home", showProduct);
router.get("/ShoppingCart", verifyUser, addToShoppingCart)
router.get("/ShoppingCart/:id", verifyUser, addToShoppingCart)

router.get("/checkout", verifyUser, checkout)
router.get("/shoppingSuccess", verifyUser, shoppingSuccess)

router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").redirect("/home")
})

module.exports = router;
