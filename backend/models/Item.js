const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: String,
  image: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

ProductSchema.plugin(idvalidator);
const Item = mongoose.model('Item', ProductSchema);
module.exports = Item;