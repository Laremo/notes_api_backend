const dbUsersService = require('../database/dbUsersService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginService = {};

loginService.validateLogin = async (user) => {
  const exisitingUser = await dbUsersService.getOneUser(user.username);

  const correctPass = !exisitingUser
    ? false
    : await bcrypt.compare(user.password, exisitingUser.passwordHash);

  if (!correctPass)
    return { status: 401, result: 'Incorrect Username or Password' };

  const { _id, username, name } = exisitingUser;

  const tokenData = { id: _id, username: username, name: name };

  const token = jwt.sign(tokenData, process.env.SECRET, { expiresIn: 180 });

  return { status: 200, result: { username, name, _id, token } };
};

module.exports = loginService;
