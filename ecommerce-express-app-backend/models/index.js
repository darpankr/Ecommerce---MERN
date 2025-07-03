
const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Bag = require('./bag');

// Define associations
User.hasMany(Cart);
Cart.belongsTo(User); // Adds UserId to Cart

Product.hasMany(Cart);
Cart.belongsTo(Product); // Adds ProductId to Cart

User.hasMany(Bag);
Bag.belongsTo(User);

Product.hasMany(Bag);
Bag.belongsTo(Product);

module.exports = { User, Product, Cart, Bag };