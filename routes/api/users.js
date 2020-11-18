const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
// Get user Schema
const User = require("../../models/Users");

// @route POST api/users
// @desc Register User
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email")
      .trim()
      .normalizeEmail()
      .isEmail(),
    check("password", "Please enter a password with 6 or more characters")
      .trim()
      .isLength({ min: 6 }),
      // .custom((password, {req}) => {
      //   if(password != req.body.password2) {
      //     throw new Error('Passwords Must Match')
      //   }
      // }),
      check("password2").custom( async(password2, {req}) => {
        
        if( password2 != req.body.password) {
          throw new Error('Passwords Must Match')
        }
      })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // BAD REQUEST
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //findOne - Returns one document that satisfies the specified query criteria on the collection or view. If multiple documents satisfy the query, this method returns the first document
      let user = await User.findOne({ email });

      if (user) {
        // Imitating error format provided by express validator
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists", param: "email" }] });
      }

      // Gets avatar for user if they have gravatar, defaults to mm option
      const avatar = "/imgs/avatar.svg";

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          //mongoose provides id
          id: user.id,
        },
      };

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
