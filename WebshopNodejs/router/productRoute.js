const {showProduct} = require("../controller/handleProduct");
 const {shoppingCart, removeShoppingCart, checkout} = require("../controller/shoppingCartController");
const express = require("express");
const verifyUser = require("../middleware/verifyuser")
const router = express.Router();

router.get("/", showProduct);
router.get("/home", showProduct);
router.post("/home", showProduct, shoppingCart);
router.get("/shoppingCart/:id", verifyUser, shoppingCart)
router.get("/checkout", verifyUser, checkout)

router.get("/shoppingCart/delete/:id", verifyUser, removeShoppingCart);




router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").redirect("/home")
})

module.exports = router;
