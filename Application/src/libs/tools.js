const bcrypt = require("bcryptjs");

module.exports.toHash = (plaintext) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plaintext, salt);
};
module.exports.compareHash = (plaintext, hashtext) => {
  return bcrypt.compareSync(plaintext, hashtext);
};
