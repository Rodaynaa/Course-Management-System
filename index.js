const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const courseRoutes = require('./routes/courses');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/courses', courseRoutes);

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch(err => console.error(err));
