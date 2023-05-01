const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  {
    collection: "Users",
  }
);
module.exports = mongoose.model("User", userSchema);
