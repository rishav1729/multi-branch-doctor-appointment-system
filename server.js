const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwtlib = require("jsonwebtoken");
// const bcript=require('bcriptjs')

//--------------------------------------------------
app.get("/sts", (req, res) => {
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-methods": "*",
  });
  const jwt = generateJWTForOTTBot();
  data = {
    jwt: jwt,
  };
  res.send(JSON.stringify(data));
});
function generateJWTForOTTBot() {
  const payload = {
    iat: new Date().getTime() / 1000,
    exp: new Date().getTime() / 1000 + 86400,
    aud: "https://idproxy.kore.ai/authorize",
    iss: "cs-24d546fd-547f-59ab-99b2-a19c6cebdcd0",
    sub: "1729rishav@gmail.com",
  };
  const secret = "YgdxJnOUDIylmDg+4ndbRlJwIJQfvAD1X5XEzrUnc8o=";
  var token = jwtlib.sign(payload, secret);
  return token;
}

//---------------------------------------------------------------

mongoose.connect("mongodb://localhost:27017/finalhospital_db");

//const db = require('./config/db');
const branchRoutes = require("./routes/branchRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routes

// Use the routes
app.use("/auth", authRoutes);
app.use("/", express.static("./public/"));
app.use("/api/branches", branchRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
