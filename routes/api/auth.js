const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/Users");

// @route GET api/auth
// @desc Test route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // -password leaves off password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth
// @desc Authenticate user & get token
// @access public
router.post(
  "/",
  [
    check("email", "Please include a valid email")
      .trim()
      .normalizeEmail()
      .isEmail(),
    check("password", "Password is required").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // BAD REQUEST
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //findOne - Returns one document that satisfies the specified query criteria on the collection or view. If multiple documents satisfy the query, this method returns the first document - mongoose
      let user = await User.findOne({ email });

      if (!user) {
        // Imitating error format provided by express validator
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials", param: "password" }] });
      }

      // Ensure password matches, password is plain text password inserted by user, user.password is from DB and is decrypted by bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials", param: "password" }] });
      }

      const payload = {
        user: {
          //mongoose provides id
          id: user.id,
        },
      };

      // JSON web token allows us to recognise logged in
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          // CHANGE THIS IN PRODUCTION, TOO LONG ATM
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
