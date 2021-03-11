const express = require("express");
const router = express.Router();
const {homeRender} = require("../controller/homeController");

router.get("/", homeRender);
router.get("/home", homeRender);

router.get("/logout", (req, res)=>{
    res.clearCookie("jwtToken").redirect("/home")
})

module.exports = router;