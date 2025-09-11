require('dotenv').config();
const express = require('express');
const connectDB = require('./connect');
const routeToHomePage = require('./routes/staticRouter')
const routeToAuth = require('./routes/auth')
const routeToAddCustomerDetails = require('./routes/staticRouter')
const addMeasurements = require('./routes/customer')
const cookieParser = require("cookie-parser");

//setting express app
const app = express();

//connecting the DB
connectDB();

app.use(express.static("public"));
//json Parser 
app.use(express.json());
//cookie Parser
app.use(cookieParser());
//URL encoded parser
app.use(express.urlencoded({ extended: true }));
//telling the express the we are going to use ejs for view engine
app.set("view engine", "ejs");


//Homepage route: evryone needs to get an entry from her
app.use('/', routeToHomePage);

//Safe passage for log in
app.use('/auth', routeToAuth);

//Now everything goes from this from seaerching to adding new customers
app.use('/customer', routeToAddCustomerDetails, addMeasurements )

//listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`🚀 Server running on port ${PORT}`));
