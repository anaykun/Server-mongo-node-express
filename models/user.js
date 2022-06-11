const mongoose = require("mongoose");

const useSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  id: {
    type: String,
  },
});

module.exports = mongoose.model("User", useSchema);
