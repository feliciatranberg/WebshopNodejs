const {showProduct} = require("../controller/handleProduct");
 const {addShoppingCart, renderShoppingCart} = require("../controller/shoppingCartController");
const express = require("express");
const verifyUser = require("../middleware/verifyuser")
const router = express.Router();

router.get("/", showProduct, );
router.get("/home", showProduct);
router.post("/home", showProduct, addShoppingCart);
router.get("/shoppingCart", verifyUser, renderShoppingCart)
router.get("/shoppingCart/:id", verifyUser, addShoppingCart)
router.get("/shoppingCart/delete/:id", verifyUser);

router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").redirect("/home")
})

module.exports = router;
