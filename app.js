const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Routes API
const userRegisterRouter = require("./api/routes/userRegister");
const moviesRouter = require ("./api/routes/movies");
const userLoginRouter = require("./api/routes/userLogin");

//ALL CONECTIONS BY MONGODB

/*------------------------------------------------
//forma localhost Mongodb Compass Community
MONGODB: admin.products
*/
/*
mongoose.Promise = global.Promise;

const URI = "mongodb://127.0.0.1:27017/CAFETO";


mongoose.connect( URI , { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useMongoClient: true})

  .then(() => { })
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

*/

//---------------------------------------------------------

//Conection Mongodb Atlas

mongoose.connect('mongodb+srv://cafeto-api:cafeto@cluster0-33q9z.mongodb.net/test?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true 
    }
);

mongoose.Promise = global.Promise;

//---------------------------------------------------------


//METODOS PARA POSTMAN
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//APP USE
app.use("/userRegister", userRegisterRouter);
app.use("/movies", moviesRouter);
app.use("/userLogin", userLoginRouter);


//ERORS
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  
  module.exports = app;