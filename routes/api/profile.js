const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/Users");
const { remove } = require("../../models/Profile");

// @route GET api/profile/me
// @desc Get current users profile
// @access Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/profile/
// @desc Create or update a user profile
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("location", "Location is required").not().isEmpty(),
      check("subjects", "Subjects aree required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      website,
      location,
      status,
      subjects,
      bio,
      equipment,
      receivedEducation,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      behance,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (subjects) {
      profileFields.subjects = subjects
        .split(",")
        .map((subject) => subject.trim());
    }
    if (bio) profileFields.bio = bio;
    if (receivedEducation) profileFields.receivedEducation = receivedEducation;
    if (equipment) {
      profileFields.equipment = equipment
        .split(",")
        .map((singleEquip) => singleEquip.trim());
    }
    // Build social object, have to initialise first to stop social.something is undefined error
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;
    if (behance) profileFields.social.behance = behance;

    try {
      // UPDATE
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // CREATE
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/profile/
// @desc Get all profiles
// @access Public
router.get("/", async (req, res) => {
  try {
    //Populate gets info from the user DB and adds to the profiles, matching using their id
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    //Populate gets info from the user DB and adds to the profiles, matching using their id
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // Checking Error type, if err.kind is ObjectId it meand an ID was present but it wasnt in the form expected
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.status(500).send("Server Error");
  }
});

// @route DELETE api/profile/
// @desc Delete profile, user & posts
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    // To do - remove profile posts
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/profile/profexp
// @desc Add profile education
// @access Private
router.put(
  "/profexp",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("from", "From Date is required").not().isEmpty(),
      check("current", "Experience Status Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, from, to, paid } = req.body;

    const newExp = {
      title,
      description,
      from,
      to,
      paid,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.profExp.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/profile/profExp/:exp_id
// @desc Delete experience from profile
// @access Private
router.delete("/profExp/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index, map through experiences getting the id's of each experiene, then selecting the index of the id that matches the id from the request
    const removeIndex = profile.profExp
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.profExp.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/profile/education
// @desc Add profile education
// @access Private
router.put(
  "/education",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("location", "Location is required").not().isEmpty(),
      check("from", "From Date is required").not().isEmpty(),
      check("current", "Education status required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, location, from, to, current, description } = req.body;

    const newEdu = {
      title,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc Delete experience from profile
// @access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index, map through experiences getting the id's of each experiene, then selecting the index of the id that matches the id from the request
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
