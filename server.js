const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/connecDB");
const path = require("path");

// dotenv intialize
dotenv.config();

// Express intialization
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Database call
connectDB();

// Routes for users
app.use("/api/v1/users", require("./routes/userRoute"));

// Routes for transaction
app.use("/api/v1/transactions", require("./routes/transactionRoute"));

// Static file
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Port intialization
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
