require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["https://portfolio-client-liard-three.vercel.app"],
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: "Content-Type, Authorization",  // Allow these headers
  credentials: true
}));

// Handle preflight request (OPTIONS)
app.options('*', cors());  // Enable preflight across all routes

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
