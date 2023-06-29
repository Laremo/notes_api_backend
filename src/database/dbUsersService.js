const mongoose = require('mongoose');
const User = require('../models/User');
const Note = require('../models/NotesSchema');
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
    const retrievedUsers = await User.find({}).populate('notes', {
      content: 1,
      date: 1,
      _id: 0,
    });
    return retrievedUsers;
  } catch (error) {
    throw error;
  }
};

dbUsersService.getOneUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

dbUsersService.saveUser = async ({ username, name, password }) => {
  try {
    const toSave = new User({
      username: username,
      name: name,
      passwordHash: password,
    });
    const savedUser = await toSave.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

dbUsersService.updateUser = async (user) => {
  try {
    const result = await User.findByIdAndUpdate(
      user.id,
      {
        $set: {
          username: user.username,
          name: user.name,
          passwordHash: user.password,
          notes: user.notes,
        },
      },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

dbUsersService.deleteUser = async (user) => {
  try {
    const result = User.findByIdAndDelete(user.id);
    await user.notes.forEach(async (note) => {
      await Note.findByIdAndDelete(note);
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = dbUsersService;
