const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
});

module.exports = mongoose.model("users", userSchema);
