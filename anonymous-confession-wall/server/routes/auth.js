const express = require("express");
const passport = require("passport");
const router = express.Router();

/* ---------------- GOOGLE LOGIN ---------------- */

router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000"
  })
);

/* ---------------- GET USER ---------------- */

router.get("/user", (req, res) => {
  res.send(req.user || null);
});

/* ---------------- LOGOUT ---------------- */

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) return res.status(500).json({ error: err });

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out" });
    });
  });
});

module.exports = router;