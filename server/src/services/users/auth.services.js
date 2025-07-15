const User = require("../../models/user");

const registerUser = async ({ name, email, password }) => {
  const newUser = new User({ name, email, password });
  return await newUser.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getProfileDB = async (id) => {
  return await User.findById(id).populate("addresses");
};

module.exports = { registerUser, findUserByEmail, getProfileDB };
