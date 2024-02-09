require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
<<<<<<< HEAD
const passportSetup = require("../passport");
const authRoute = require("./api/routes/v1/auth.route");
const patientRoute = require("./api/routes/v1/patientRoute");
const doctorRoute = require("./api/routes/v1/doctorRoute");
const ScheduleRoute = require("./api/routes/v1/scheduleRoute");
const RecordRoute = require("./api/routes/v1/recordRoutes");
const PrescriptionsRoute = require("./api/routes/v1/prescriptionRoutes");
const InvoiceRoute = require("./api/routes/v1/invoiceRoutes")
const SecretaryRoute = require("./api/routes/v1/secretaryRoute");
const app = express();
=======
const routes = require("./api/routes/v1/index");
>>>>>>> a1262b79f6703c109b0f09bb37104ae50f8215df
const session = require("express-session");
const mongoose = require("./config/mongoose");
const app = express();
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
// app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);


app.use("/v1", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
