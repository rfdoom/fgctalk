const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const characterRoutes = require('./routes/charRoutes');


// middleware
app.use(express.json()) // checks body of req and attaches it to request object

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
})

app.use('/api/characters', characterRoutes);

// connect to database
async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to mongodb');
  }
  catch(err) {
    console.log(err.message);
  }
};

connect();

// start server on port 
app.listen(process.env.PORT, () => {
  console.log('listening on port 4000');
})