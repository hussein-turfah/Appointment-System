const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnect = require('./config/database');

const app = express();
const cors = require('cors');
dotenv.config();
//connect database
dbConnect();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
    console.log(`mode: ${process.env.NODE_ENV}`);
    app.use(morgan('dev'));
}

const PORT = process.env.PORT 
const server = app.listen(PORT , ()=>{
    console.log(`App running on PORT ${PORT}`)
})