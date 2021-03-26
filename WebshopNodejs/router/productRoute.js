const {showProduct} = require("../controller/handleProduct");
 const {addShoppingCart, shoppingCartRender} = require("../controller/shoppingCartController");
const express = require("express");
const verifyUser = require("../middleware/verifyuser")
const router = express.Router();

router.get("/", showProduct, );
router.get("/home", showProduct, shoppingCartRender);
router.post("/home", showProduct, addShoppingCart, shoppingCartRender);
router.get("/shoppingCart", verifyUser, addShoppingCart, shoppingCartRender)
router.get("/shoppingCart/:id", verifyUser, addShoppingCart, shoppingCartRender)
router.get("/shoppingCart/delete/:id", verifyUser);

router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").redirect("/home")
})

module.exports = router;
