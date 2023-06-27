const UserInfovalidator = {};

UserInfovalidator.completeUserInfo = (user) => {
  return user.username && user.name && user.password && true;
};

module.exports = UserInfovalidator;
