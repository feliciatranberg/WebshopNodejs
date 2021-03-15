const verifyAdmin = require("../middleware/verifyAdmin")
const {upload} = require("./../middleware/upload");
const express = require("express");
const {addProductHome, addProduct, editProductHome, editProduct, deleteProduct} = require("../controller/admincontroller");
const router = express.Router();

router.get("/addProduct", verifyAdmin, addProductHome);
router.post("/addProduct", verifyAdmin, upload.single("imageurl"), addProduct);

router.get("/addProduct/edit/:id", editProductHome)
router.post("/addProduct/edit/:id", upload.single("imageurl"), editProduct)

router.get("/addProduct/delete/:id", deleteProduct)

module.exports = router;