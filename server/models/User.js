const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email_id: { type: String, required: true, unique: true },
  mobile_no: { type: String, required: true },
});
// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE_IN })
}

module.exports = mongoose.model('User', userSchema);
