const verifyAdmin = require("../middleware/verifyadmin")
const {upload} = require("./../middleware/upload");
const express = require("express");
const {adminProductHome, addProduct, editProductHome, editProduct, deleteProduct} = require("../controller/admincontroller");
const router = express.Router();

router.get("/admin", verifyAdmin, adminProductHome);
router.post("/admin", verifyAdmin, upload.single("imageurl"), addProduct);

router.get("/admin/edit/:id", verifyAdmin, editProductHome)
router.post("/admin/edit/:id", verifyAdmin, upload.single("imageurl"), editProduct)

router.get("/admin/delete/:id", verifyAdmin, deleteProduct)

module.exports = router;