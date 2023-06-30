const dbUsersService = require('../database/dbUsersService');
const bcrypt = require('bcrypt');
const loginService = {};

loginService.validateLogin = async (user) => {
  const exisitingUser = await dbUsersService.getOneUser(user.username);

  const correctPass = !exisitingUser
    ? false
    : await bcrypt.compare(user.password, exisitingUser.passwordHash);

  if (!correctPass)
    return { status: 401, result: 'Incorrect Username or Password' };

  return { status: 200, result: exisitingUser };
};

module.exports = loginService;
