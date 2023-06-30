const loginService = require('../services/loginService');
const loginController = {};

loginController.signIn = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user) res.status(400).json({ ok: false, error: 'Missing user info' });
    const { status, result } = await loginService.validateLogin(user);
    res.status(status).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = loginController;
