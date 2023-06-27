const express = require('express');
const usersController = require('../controllers/usersController');
const router = express();

//get All notes
router.get('/', usersController.getAllUsers);

//get one note
router.get('/:id', usersController.getOneUser);

//add new note
router.post('/', usersController.saveUser);

//update note
router.put('/:id', usersController.updateUser);

//delete a note
router.delete('/:id', usersController.deleteUser);

module.exports = router;
