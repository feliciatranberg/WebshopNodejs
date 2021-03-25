const {showProduct} = require("../controller/handleProduct");
 const {addShoppingCart, removeShoppingCart, shoppingCartRender} = require("../controller/shoppingCartController");
const express = require("express");
const verifyUser = require("../middleware/verifyuser")
const router = express.Router();

router.get("/", showProduct);
router.get("/home", showProduct, addShoppingCart);
router.get("/shoppingCart", verifyUser, addShoppingCart, shoppingCartRender, removeShoppingCart)
router.post("/shoppingCart", verifyUser, addShoppingCart, shoppingCartRender, removeShoppingCart)
router.get("/shoppingCart/:id", verifyUser, addShoppingCart, removeShoppingCart)
router.get("/shoppingCart/delete/:id", verifyUser, addShoppingCart, removeShoppingCart);

router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").redirect("/home")
})

module.exports = router;
