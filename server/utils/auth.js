const bcrypt = require("bcrypt");

//hash the password given by user
exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    //generate salt
    bcrypt.genSalt(14, (err, salt) => {
      //if error
      err && reject(err);
      //hash password
      bcrypt.hash(password, salt, (err, hash) => {
        //if error
        err && reject(err);
        //hashed the password
        resolve(hash);
      });
    });
  });
};

//compare the password given by user and password from database
exports.comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
