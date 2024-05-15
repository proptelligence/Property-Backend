const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors module
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(express.json());

// Configure CORS
const allowedOrigins = ['http://localhost:3000', 'https://www.proptelligence.net'];
app.use(cors({
  origin: function (origin, callback) {
    // Check if the origin is in the allowedOrigins array or if it is undefined (for server-to-server communication)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/', authRoutes);
app.use('/contact', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
