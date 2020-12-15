const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const { avatarStorage } = require("../../client/src/api/cloudinary");
const multer = require("multer");
const upload = multer({
  storage: avatarStorage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      req.file_error = "Invalid File Type";
      return cb(null, false);
    }
    cb(null, true);
  },
});
const Profile = require("../../models/Profile");
const User = require("../../models/Users");
const Post = require("../../models/Post");
const Users = require("../../models/Users");
const { nextTick } = require("process");

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
    upload.single("avatar"),
    [
      check("status").custom((status) => {
        if (status === "") {
          throw new Error("Please select a valid status");
        } else return true;
      }),
      check("location", "Location is required").not().isEmpty(),
      check("subjects", "Subjects are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (req.hasOwnProperty("file_error")) {
      errors.errors.push({
        value: "",
        msg: req.file_error,
        param: "avatar",
        location: "body",
      });
    }
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
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      behance,
    } = req.body;

    const uploadedAvatar = req.file ? req.file : "";

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    website ? (profileFields.website = website) : (profileFields.website = "");
    location
      ? (profileFields.location = location)
      : (profileFields.location = "");
    status != 0 ? (profileFields.status = status) : (profileFields.status = "");
    subjects.length !== 0
      ? (profileFields.subjects = subjects
          .split(",")
          .map((subject) => subject.trim()))
      : (profileFields.subjects = []);

    equipment.length !== 0
      ? (profileFields.equipment = equipment
          .split(",")
          .map((equip) => equip.trim()))
      : (profileFields.equipment = []);

    bio ? (profileFields.bio = bio) : (profileFields.bio = "");

    // Build social object, have to initialise first to stop social.something is undefined error
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;
    if (behance) profileFields.social.behance = behance;

    try {
      if (uploadedAvatar !== "") {
        await Users.findOneAndUpdate(
          { _id: req.user.id },
          {
            avatar: uploadedAvatar.path,
            avatar_cloudinary_id: uploadedAvatar.filename,
          }
        );
      }

      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.json(profile);
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
    // Remove user posts

    await Post.deleteMany({ user: req.user.id });

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

// @route PUT api/profile/experience
// @desc Add profile experience
// @access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("from", "From Date is required").not().isEmpty(),

      check("current", "Experience Status Required").not().isEmpty(),
      check("to").custom((to, { req }) => {
        if (!req.body.current) {
          if (req.body.from && req.body.from >= to) {
            throw new Error("End date must be after start date");
          } else if (to === "") {
            throw new Error("End date required");
          } else if (new Date(to).getTime() >= new Date().getTime()) {
            throw new Error("End date cannot be in the future");
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
      check("description", "Description is required")
        .not()
        .isEmpty()
        .custom((description) => {
          if (description.length < 20) {
            throw new Error("Description must be over 20 characters long");
          } else return true;
        }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, from, to, current, paid } = req.body;

    const newExp = {
      title,
      description,
      from,
      to,
      paid,
      current,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/profile/experience/:edu_id
// @desc edit education from profile
// @access Private

router.put(
  "/experience/:exp_id",
  auth,
  [
    check("title", "Title is required").not().isEmpty(),
    check("from", "From Date is required").not().isEmpty(),
    check("to").custom((to, { req }) => {
      if (!req.body.current) {
        if (req.body.from && req.body.from >= to) {
          throw new Error("End date must be after start date");
        } else if (to === "") {
          throw new Error("End date required");
        } else if (new Date(to).getTime() >= new Date().getTime()) {
          throw new Error("End date cannot be in the future");
        } else {
          return true;
        }
      } else {
        return true;
      }
    }),
    check("description", "Description is required")
      .not()
      .isEmpty()
      .custom((description) => {
        if (description.length < 20) {
          throw new Error("Description must be over 20 characters long");
        } else return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, paid, from, to, current, description } = req.body;
    const experienceFields = {};
    experienceFields.title = title;
    experienceFields.paid = paid;
    experienceFields.from = from;
    experienceFields.to = to;
    if (current) {
      experienceFields.current = current;
    } else experienceFields.current = false;

    if (experienceFields.current) {
      experienceFields.to = "";
    }

    experienceFields.description = description;

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // Get remove index, map through eperience getting the id's of each experiene, then selecting the index of the id that matches the id from the request

      const editIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);

      profile.experience[editIndex] = experienceFields;

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc Delete experience from profile
// @access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index, map through experiences getting the id's of each experiene, then selecting the index of the id that matches the id from the request
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);

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
      check("to").custom((to, { req }) => {
        if (!req.body.current) {
          if (req.body.from && req.body.from >= to) {
            throw new Error("End date must be after start date");
          } else if (to === "") {
            throw new Error("End date required");
          } else if (new Date(to).getTime() >= new Date().getTime()) {
            throw new Error("End date cannot be in the future");
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
      // check("current", "Education status required").not().isEmpty(),
      check("description", "Description is required")
        .not()
        .isEmpty()
        .custom((description) => {
          if (description.length < 20) {
            throw new Error("Description must be over 20 characters long");
          } else return true;
        }),
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
      // CREATE
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/profile/education/:edu_id
// @desc edit education from profile
// @access Private

router.put(
  "/education/:edu_id",
  auth,
  [
    check("title", "Title is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
    check("from", "From Date is required").not().isEmpty(),
    check("to").custom((to, { req }) => {
      if (!req.body.current) {
        if (req.body.from && req.body.from >= to) {
          throw new Error("End date must be after start date");
        } else if (to === "") {
          throw new Error("End date required");
        } else if (new Date(to).getTime() >= new Date().getTime()) {
          throw new Error("End date cannot be in the future");
        } else {
          return true;
        }
      } else {
        return true;
      }
    }),
    check("description", "Description is required")
      .not()
      .isEmpty()
      .custom((description) => {
        if (description.length < 20) {
          throw new Error("Description must be over 20 characters long");
        } else return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, location, from, to, current, description } = req.body;
    const educationFields = {};
    educationFields.title = title;
    educationFields.location = location;
    educationFields.from = from;
    educationFields.to = to;
    if (current) {
      educationFields.current = current;
    } else educationFields.current = false;

    educationFields.description = description;

    if (educationFields.current) {
      educationFields.to = "";
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // Get remove index, map through education getting the id's of each education, then selecting the index of the id that matches the id from the request
      const editIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);

      profile.education[editIndex] = educationFields;

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
