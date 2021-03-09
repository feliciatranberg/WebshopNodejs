const express = require("express");
const router = express.Router();
const {homeRender, addProductFormSubmit} = require("../controller/homeControllerTest");

router.get("/", homeRender);
router.post("/", addProductFormSubmit);

module.exports = router;