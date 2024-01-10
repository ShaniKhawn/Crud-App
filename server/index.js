const express = require('express');
const cors = require('cors');
require('./models/db');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routers
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/customers', require('./routes/customers'));

const PORT = process.env.PORT || 9002;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
