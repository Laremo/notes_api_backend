const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const dbUsersService = {};

const { MONGO_URI, MONGODB_URI_TEST, NODE_ENV } = process.env;
const connectionString = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGO_URI;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dbUsersService.getAllUsers = async () => {
  try {
    const retrievedUsers = await User.find();
    return retrievedUsers;
  } catch (error) {
    throw error;
  }
};

dbUsersService.getOneUser = async (id) => {
  try {
  } catch (error) {
    throw error;
  }
};

dbUsersService.saveUser = async (user) => {
  try {
    const toSave = new User(user);
    const savedUser = await toSave.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

dbUsersService.updateUser = async (user) => {
  try {
  } catch (error) {
    throw error;
  }
};

dbUsersService.deleteUser = async (id) => {
  try {
  } catch (error) {
    throw error;
  }
};

module.exports = dbUsersService;
