const { Database } = require("../index");

const UserSchema = Database.Schema({
  _id: Number,
  name: String,
  age: Number,
  isDev: Boolean,
});

module.exports = { UserSchema };
