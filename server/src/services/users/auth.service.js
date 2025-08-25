const User = require("../../models/user");

const registerUser = async ({ name, email, password, role }) => {
  const newUser = new User({ name, email, password, role });
  await newUser.save();
  return newUser;
};

const findUserByEmail = async (email) => {
  const user = User.findOne({ email });
  return user;
};

module.exports = { registerUser, findUserByEmail };
