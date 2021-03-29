const {showProduct} = require("../controller/handleProduct");
 const {shoppingCart, checkout} = require("../controller/shoppingCartController");
const express = require("express");
const verifyUser = require("../middleware/verifyuser")
const router = express.Router();

router.get("/", showProduct);
router.get("/home", showProduct);
router.post("/home", showProduct, shoppingCart);
router.get("/shoppingCart/:id", verifyUser, shoppingCart)
router.get("/checkout", verifyUser, checkout)

// router.get("/shoppingCart/delete/:id", verifyUser);




router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").redirect("/home")
})

module.exports = router;
