require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("../passport");
const authRoute = require("./api/routes/v1/auth.route");
const patientRoute = require("./api/routes/v1/patientRoute");
const doctorRoute = require("./api/routes/v1/doctorRoute");
const app = express();
const session = require("express-session");
const mongoose = require("./config/mongoose");
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
    },
  })
);
mongoose.connect();

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/patient", patientRoute);
app.use("/doctor", doctorRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
