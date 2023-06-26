const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId, //Tipo ObjectId
      ref: 'Note', //ref a la coleccion note
    },
  ],
});

UserSchema.set('toJSON', {
  transform: (document, returnedObjeect) => {
    returnedObjeect.id = returnedObjeect._id;
    delete returnedObjeect._id;
    delete returnedObjeect._v;

    delete returnedObjeect.passwordHash;
  },
});

const User = model('User', UserSchema);

module.exports = User;
