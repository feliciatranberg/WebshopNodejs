const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyTokenAdmin = (req, res, next)=>{
    const token = req.cookies.jwtToken;
    if(!token ) return res.render("login.ejs", {err:"Du måste logga in"})
 
    const validUser = jwt.verify(token, process.env.SECRET_KEY)
  
  console.log(" verify admin is triggered")
  console.log(validUser.user.role)
  if(!validUser.user.role) return res.render("login.ejs", {err:"Du har inte authorization för att kunna göra detta"})
  req.user = validUser;
  next();
}

module.exports = verifyTokenAdmin;