const crypto = require('crypto');

const generateSalt = (length) => {
  return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
}

const getHash = (password, salt) => {
  let hasher = crypto.createHmac('sha512', salt);
  hasher.update(password);
  let hashed = hasher.digest('hex');
  return {
    salt: salt,
    hash: hashed
  };
}

const saltNhash = (password) => {
  let salt = generateSalt(16);
  return getHash(password, salt);
}

module.exports = saltNhash;