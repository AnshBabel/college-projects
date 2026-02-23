const express = require('express');
const router = express.Router();
const Confession = require('../models/Confession');

// Create confession
router.post('/', async (req, res) => {
  const { text, secretCode, userId } = req.body;
  if (!text || !secretCode || !userId) return res.status(400).json({ error: 'Missing fields' });
  if (secretCode.length < 4) return res.status(400).json({ error: 'Secret code too short' });

  try {
    const confession = new Confession({ text, secretCode, userId });
    await confession.save();
    res.status(201).json(confession);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: -1 });
    res.json(confessions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update with secret code
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, secretCode } = req.body;
  if (!text || !secretCode) return res.status(400).json({ error: 'Missing fields' });

  try {
    const confession = await Confession.findById(id);
    if (!confession) return res.status(404).json({ error: 'Not found' });
    if (confession.secretCode !== secretCode) return res.status(401).json({ error: 'Wrong code' });
    confession.text = text;
    await confession.save();
    res.json(confession);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete with secret code
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { secretCode } = req.body;
  if (!secretCode) return res.status(400).json({ error: 'Missing code' });

  try {
    const confession = await Confession.findById(id);
    if (!confession) return res.status(404).json({ error: 'Not found' });
    if (confession.secretCode !== secretCode) return res.status(401).json({ error: 'Wrong code' });
    await confession.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// React
router.post('/:id/react', async (req, res) => {
  const { id } = req.params;
  const { type } = req.body; // like, love, laugh

  if (!['like', 'love', 'laugh'].includes(type)) {
    return res.status(400).json({ error: 'Invalid reaction' });
  }

  try {
    const confession = await Confession.findById(id);
    if (!confession) return res.status(404).json({ error: 'Not found' });
    confession.reactions[type]++;
    await confession.save();
    res.json(confession);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
