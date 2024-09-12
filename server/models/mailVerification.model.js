const mongoose = require("mongoose");

const verificationEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  verificationToken: String,
  verificationExpiresAt: Date,
});

module.exports = mongoose.model(
  "verificationEmailModel",
  verificationEmailSchema
);
