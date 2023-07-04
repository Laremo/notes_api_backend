const jwt = require('jsonwebtoken');

const CheckLoggedUser = (req, res, next) => {
  const auth = req.get('authorization');
  if (!auth) return res.status(401).json({ msg: 'not logged in' });

  return next();
};

module.exports = CheckLoggedUser;
