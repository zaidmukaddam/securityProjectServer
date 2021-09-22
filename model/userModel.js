const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
var User = (module.exports = mongoose.model("userKeys", userModel));
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};
