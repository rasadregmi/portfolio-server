require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: "https://www.rasadregmi.com.np",  // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Allow OPTIONS method
  allowedHeaders: "Content-Type, Authorization",  // Allow specific headers
  credentials: true  // Allow credentials (cookies, etc.) if needed
};

app.use(cors());

// Preflight OPTIONS request handler
app.options('*', cors());  // Handle preflight requests globally

// Routes
app.use('/api/contact', contactRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
