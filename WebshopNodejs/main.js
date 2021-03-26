const express = require("express");
const app = express();
const mongoose = require("mongoose");
const sassMiddleware = require('node-sass-middleware');
const cookieParser = require("cookie-parser");

const userRouter = require("./router/userroute");
const productRouter = require("./router/productroute");
const adminRouter = require("./router/adminroute");

require('dotenv').config();

const path = require('path');
app.use(sassMiddleware({ 
    src: __dirname + '/sass/', 
    dest: __dirname + '/public/stylesheets/', 
    outputStyle: 'compressed' 
  }),
)

app.use(express.static(path.join(__dirname, 'public')));
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.set('view engine', 'ejs');

app.use(userRouter);
app.use(productRouter);
app.use(adminRouter);

mongoose.connect(process.env.DATABASE_URL, 
{useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true},
     (err)=> {

if(err) {      
console.log(err) 
return 
}

app.listen(process.env.PORT || 8880, ()=>{
    console.log('IT´S WORKING')
})
})
