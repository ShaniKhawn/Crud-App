const bcrypt = require('bcrypt');
const User = require('../models/user');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.send({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.send({ message: 'Server error' });
  }
};

module.exports = {registerUser};