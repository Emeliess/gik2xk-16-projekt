var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/users", require("./routes/userRoute"));
app.use("/carts", require("./routes/cartRoute"));
app.use("/products", require("./routes/productRoute"));
app.use("/ratings", require("./routes/ratingRoute"));
app.use("/rows", require("./routes/rowRoute"));

module.exports = app;
