const Product = require("../model/product");
const User = require("../model/user")
require("dotenv").config();

const showProduct = async (req, res)=>{

 const page = +req.query.page || 1;
  const totalData = await Product.find().countDocuments();
  const dataToShowPerReq = 4;
  const totalDataPart = Math.ceil(totalData/dataToShowPerReq);
  const dataToShow= dataToShowPerReq * page
   
 const products =  await Product.find().limit(dataToShow)
   res.render("home.ejs", 
   { products,
     totalData,
     totalDataPart, 
     dataToShow,
     dataToShowPerReq,
     errors:"empty",    
    })  
  } 

module.exports= {showProduct}