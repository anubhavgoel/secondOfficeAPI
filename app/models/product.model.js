const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: String,
    code: String,
    rent: Number,
    location: String,
    procurement_cost: Number,
    status: String,
    category: String,
    size: Number,
    color: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", ProductSchema);
