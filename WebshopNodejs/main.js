const express = require("express");
const app = express();
const mongoose = require("mongoose");
const sassMiddleware = require('node-sass-middleware');

const homeRouter = require('./router/homeRouteTest');

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

app.set('view engine', 'ejs');

app.use(homeRouter);

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

app.listen(7777, ()=>{
    console.log('IT´S WORKING')
})
})