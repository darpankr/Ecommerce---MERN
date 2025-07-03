
const express = require('express');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();

// const User = require('./models/user')
// const Product = require('./models/product')
// const Cart = require('./models/cart')
require('./models')

app.use(express.json());

const cors = require('cors');

// Enable CORS for React app
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

//Routes
app.use('/app/auth', require('./routes/auth'));
app.post('/test', (req, res) => res.json({ status: 'POST test route works!' }));
app.use('/app/products', require('./routes/products'));
app.use('/app/cart', require('./routes/cart'));
app.use('/app/bag', require('./routes/bag'));
app.use('/app/profile', require('./routes/profile'));
app.use('/app/dashboard', require('./routes/dashboard'));

//SYNC MODELS AND START SERVER
sequelize.sync({ alter: true }) // ⬅️ This updates tables if needed (not for prod)
  .then(() => {
    console.log('✅ DB synced successfully');
    app.listen(5000, () => {
      console.log('🚀 Server running on port 5000');
    });
  })
  .catch(err => {
    console.error('❌ DB sync failed:', err);
  });