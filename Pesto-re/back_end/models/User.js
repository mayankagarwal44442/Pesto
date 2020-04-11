const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// All Users

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  address: {
    type: String,
    required: true
  },
  phonenum: {
    type: Number,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);