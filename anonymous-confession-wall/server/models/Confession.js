const mongoose = require("mongoose");

const confessionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  secretCode: { type: String, required: true },
  userId: { type: String, required: true },
  reactions: {
    like: { type: Number, default: 0 },
    love: { type: Number, default: 0 },
    laugh: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model("Confession", confessionSchema);