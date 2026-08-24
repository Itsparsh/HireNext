const mongoose = require('mongoose');
const User = require('./models/User');

const test = async () => {
  await mongoose.connect('mongodb://127.0.0.1:54289/');
  const user = await User.findOne({ email: 'muskandutta022@gmail.com' }).select('+password');
  console.log("User:", user);
  if (user) {
    const isMatch = await user.matchPassword('12345678');
    console.log("Password match for 12345678:", isMatch);
  }
  process.exit(0);
};

test();
