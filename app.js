require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/notificationRoutes');

const app = express();
app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.listen(3000, () => console.log('Server running on port 3000'));
