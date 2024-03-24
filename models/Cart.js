const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }, quantity: {
    type: String,
    required: true,
  }, 
  productId: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
