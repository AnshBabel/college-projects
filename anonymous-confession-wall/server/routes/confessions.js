const router = require("express").Router();
const Confession = require("../models/Confession");
const auth = require("../middleware/auth");

// CREATE
router.post("/", auth, async (req, res) => {
  const { text, secretCode } = req.body;

  if (secretCode.length < 4) {
    return res.status(400).json({ message: "Secret code too short" });
  }

  const confession = await Confession.create({
    text,
    secretCode,
    userId: req.user.id
  });

  res.json(confession);
});

// READ
router.get("/", async (req, res) => {
  const confessions = await Confession.find().sort({ createdAt: -1 });
  res.json(confessions);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { text, secretCode } = req.body;

  const confession = await Confession.findById(req.params.id);

  if (!confession || confession.secretCode !== secretCode) {
    return res.status(401).json({ message: "Wrong Code" });
  }

  confession.text = text;
  await confession.save();

  res.json(confession);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { secretCode } = req.body;

  const confession = await Confession.findById(req.params.id);

  if (!confession || confession.secretCode !== secretCode) {
    return res.status(401).json({ message: "Wrong Code" });
  }

  await confession.deleteOne();
  res.json({ message: "Deleted" });
});

// REACT
router.post("/:id/react", async (req, res) => {
  const { type } = req.body;

  if (!["like", "love", "laugh"].includes(type)) {
    return res.status(400).json({ message: "Invalid reaction" });
  }

  const confession = await Confession.findByIdAndUpdate(
    req.params.id,
    { $inc: { [`reactions.${type}`]: 1 } },
    { new: true }
  );

  res.json(confession);
});

module.exports = router;