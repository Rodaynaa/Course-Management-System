const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const courseRoutes = require('../routes/courses');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/courses', courseRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

module.exports.handler = serverless(app);
