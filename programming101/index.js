const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const cors = require('cors');  // Import cors
const userRoutes = require('./routes/users');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/www.bscs32a.com/user', userRoutes);
mongoose
  .connect(
    'mongodb+srv://napoles1cj:HkH1ud1C2Whiy5ix@cluster0.ccdv9.mongodb.net/'
  )
  .then(() => console.log('Database Connected...'))
  .catch((err) => err.message);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
