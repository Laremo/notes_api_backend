const dbUsersService = require('../src/database/dbUsersService');
const jwt = require('jsonwebtoken');

const CheckLoggedUser = async (req, res, next) => {
  //we only allow the requests to create a new user
  if (req.baseUrl === '/api/users' && req.method === 'POST') {
    return next();
  }
  const auth = req.get('authorization');
  let token = null;
  if (!auth) return res.status(401).json({ error: 'not logged in' });

  if (auth && auth.toLowerCase().startsWith('bearer')) {
    token = auth.slice(auth.indexOf(' ') + 1);
  }
  let decodedToken = null;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch {
    token = null;
  }

  if (!token || !decodedToken.id)
    return res
      .status(401)
      .json({ token: null, error: 'Missing or invalid token' });

  const exisitingUser = await dbUsersService.getUserByID(decodedToken.id);
  if (!exisitingUser)
    return res
      .status(401)
      .json({ token: null, error: 'Missing or invalid token' });

  return next();
};

module.exports = CheckLoggedUser;
