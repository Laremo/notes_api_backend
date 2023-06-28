const UsersService = require('../services/usersService');
const usersController = {};

usersController.getAllUsers = async (_, res) => {
  try {
    const users = await UsersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

usersController.getOneUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

usersController.saveUser = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user)
      return res
        .status(400)
        .json({ ok: false, savedUser: 'User info is missing' });

    const { ok, status, savedUser } = await UsersService.saveUser(user);
    res.status(status).json({ ok, savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, savedUser: error.message });
  }
};

usersController.updateUser = async (req, res) => {
  try {
    const { user } = req.body;
    if (user.id !== req.params.id)
      res.status(400).json({ ok: false, savedUser: 'Discordant user info' });
    const { ok, status, savedUser } = await UsersService.updateUser(user);
    res.status(status).json({ ok: ok, savedUser: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

usersController.deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = usersController;
