const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/mern-crud-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 })
 .then(() => console.log("Database connected"))
 .catch((err) => console.log(err));