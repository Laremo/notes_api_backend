const UsersService = require('../services/usersService');
const usersController = {};

usersController.getAllUsers = async (req, res) => {
  try {
    const users = await UsersService.getAllNotes();
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
    const { ok, status, savedUser } = await UsersService.saveUser(user);
    res.status(status).json({ ok, savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

usersController.updateUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
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
