const { completeUserInfo } = require('../../middleware/checkCompleteUser');
const dbUsersService = require('../database/dbUsersService');
const UsersService = {};

UsersService.getAllUsers = async () => {
  try {
  } catch (error) {
    throw error;
  }
};

UsersService.getOneUser = async (id) => {
  try {
  } catch (error) {
    throw error;
  }
};

UsersService.saveUser = async (user) => {
  try {
    if (!completeUserInfo(user))
      return { ok: false, status: 400, savedUser: 'User info is missing' };

    const existingUsers = await dbUsersService.getAllUsers();
    for (let i = 0; i < existingUsers.length; i++) {
      if (existingUsers[i].username === user.username) {
        return {
          ok: false,
          status: 400,
          savedUser: 'This username is unavailable',
        };
      }
    }

    if (!user.notes) user.notes = [];

    const savedUser = await dbUsersService.saveUser(user);
    if (!savedUser)
      return { ok: false, status: 500, savedUser: 'something went wrong' };
    return { ok: true, status: 201, savedUser: savedUser };
  } catch (error) {
    throw error;
  }
};

UsersService.updateUser = async (user) => {
  try {
  } catch (error) {
    throw error;
  }
};

UsersService.deleteUser = async (id) => {
  try {
  } catch (error) {
    throw error;
  }
};

module.exports = UsersService;
