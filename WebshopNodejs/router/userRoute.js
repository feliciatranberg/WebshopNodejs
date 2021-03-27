const express = require("express");
const router = express.Router(); 
const {registerRender, registerSubmit } =require("../controller/registercontroller")
const {loginRender, loginSubmit} = require("../controller/logincontroller");
const {resetRender, resetSubmit, resetParams, resetFormSubmit} = require("../controller/resetpassword");

router.get("/register",   registerRender );
router.post("/register", registerSubmit);
router.get("/login", loginRender );
router.post("/login", loginSubmit) 
router.get("/reset",  resetRender);
router.post("/reset", resetSubmit)
router.get("/reset/:token", resetParams)
router.post("/resetPasswordForm", resetFormSubmit)

module.exports = router;
