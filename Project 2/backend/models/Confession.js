const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  like: { type: Number, default: 0 },
  love: { type: Number, default: 0 },
  laugh: { type: Number, default: 0 }
});

const confessionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  secretCode: { type: String, required: true },
  reactions: { type: reactionSchema, default: () => ({}) },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Confession', confessionSchema);
