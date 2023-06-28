const { completeUserInfo } = require('../../middleware/checkCompleteUser');
const dbUsersService = require('../database/dbUsersService');
const bcrypt = require('bcrypt');

const UsersService = {};

UsersService.getAllUsers = async () => {
  try {
    const users = await dbUsersService.getAllUsers();
    if (!users.length) return { ok: true, users: 'No users registered' };
    return { ok: true, users: users };
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

    const pss = await bcrypt.hash(user.password, 10);
    user.password = `${pss}`;
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
    if (!completeUserInfo(user))
      return { ok: false, status: 400, savedUser: 'User info is missing' };

    const existingUsers = await dbUsersService.getAllUsers();
    if (!existingUsers.some((exUser) => exUser.id === user.id))
      return { ok: false, status: 404, savedUser: 'User not Found' };

    const passwordHash = await bcrypt.hash(user.password, 10);
    user.password = passwordHash;

    const updatedUser = await dbUsersService.updateUser(user);

    return { ok: true, status: 200, savedUser: updatedUser };
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
