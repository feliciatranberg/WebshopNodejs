const { 
    addProductForm, 
    addProductFormSubmit,
    showProduct, 
    addToShoppingCart,
    showUserProducts,
    checkout,
    shoppingSuccess
 } = require("../controller/handleProduct");
//  const { 
//     imageUpload, 
//     uploadPost,
//     uploadGet,
//     uploadFiles,
//     fileName,
//     findFile,
//     fileDelete
//  } = require("../controller/imageController");
const express = require("express");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyUser = require("../middleware/verifyUser")
const router = express.Router();

router.get("/", showProduct);
router.get("/home", showProduct);
router.get("/addProduct", verifyUser, verifyAdmin, addProductForm);
router.post("/addProduct", verifyUser, verifyAdmin, addProductFormSubmit);
router.get("/myProducts", verifyUser, showUserProducts);
router.get("/ShoppingCart", verifyUser, addToShoppingCart)
router.get("/ShoppingCart/:id", verifyUser, addToShoppingCart)

router.get("/checkout", verifyUser, checkout)
router.get("/shoppingSuccess", verifyUser, shoppingSuccess)

router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").redirect("/home")
})

// router.get('/', uploadGet)
// router.post('/upload', imageUpload, uploadPost)
// router.get('/files', uploadFiles)
// router.get('/files/:filename', fileName)
// router.get('/image/:filename', findFile)
// router.delete('/files/:id', fileDelete)


module.exports = router;
