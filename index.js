const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const forgotPasswordRoute = require("./routes/forgot-password");
const resetPasswordRoute = require("./routes/reset-password");
const visitRequestRouter = require("./routes/visit-request");
const productRouter = require("./routes/product");
const update = require("./routes/update");
const productUpdate = require("./routes/productUpdate");
const getProduct = require("./routes/getProducts");
const getCart = require("./routes/getCart");
const cart = require("./routes/cart");
const getUser = require("./routes/getUser");
const deletes = require("./routes/delete");
const deleteCart = require("./routes/deleteCart");
// const uploadFile = require("./routes/uploadFile");

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));

// Register the routes
app.use(registerRoute);
app.use(loginRoute);
app.use(forgotPasswordRoute);
app.use(resetPasswordRoute);
app.use(visitRequestRouter);
app.use(productRouter);
app.use(update);
app.use(productUpdate);
app.use(getProduct);
app.use(getCart);
app.use(cart);
app.use(getUser);
app.use(deletes);
app.use(deleteCart);

app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`);
});
