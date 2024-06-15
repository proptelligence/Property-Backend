const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');
const { Cashfree } = require('cashfree-pg');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const houseRoutes = require('./routes/houseRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const allowedOrigins = ['http://localhost:3000', 'https://www.proptelligence.net', 'https://server-101.onrender.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Cashfree Configuration
Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.TEST;

// Function to generate Order ID
function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('sha256');
  hash.update(uniqueId);
  const orderId = hash.digest('hex');
  return orderId.substr(0, 12);
}

// Routes
app.use('/', authRoutes);
app.use('/contact', contactRoutes); 
app.use('/house', houseRoutes);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/payment', async (req, res) => {
  try {
    let request = {
      "order_amount": 1.00,
      "order_currency": "INR",
      "order_id": await generateOrderId(),
      "customer_details": {
        "customer_id": "webcodder01",
        "customer_phone": "9999999999",
        "customer_name": "Web Codder",
        "customer_email": "webcodder@example.com"
      },
    };

    Cashfree.PGCreateOrder("2023-08-01", request).then(response => {
      console.log(response.data);
      res.json(response.data);
    }).catch(error => {
      console.error(error.response.data.message);
      res.status(500).send('Error creating payment order');
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/verify', async (req, res) => {
  try {
    let { orderId } = req.body;
    Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then(response => {
      res.json(response.data);
    }).catch(error => {
      console.error(error.response.data.message);
      res.status(500).send('Error verifying payment');
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
