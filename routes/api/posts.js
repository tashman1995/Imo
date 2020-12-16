const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const { cloudinary } = require("../../client/src/api/cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const Post = require("../../models/Post");
const User = require("../../models/Users");

const users = require("../../client/src/utils/users");
const commentsText = require("../../client/src/utils/comments");

// @route POST api/posts
// @desc Create a post
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Caption is required").not().isEmpty(),
      check("location", "Location is required").not().isEmpty(),
      check("bestTime", "Please select a time").not().isEmpty(),
      check("image", "Please select an image file").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // -password means user is fetched without password property
      const user = await User.findById(req.user.id).select("-password");

      // Image
      const uploadedResponse = await cloudinary.uploader.upload(
        req.body.image,
        {
          upload_preset: "imoSocialMedia",
          responsive_breakpoints: {
            create_derived: true,
            bytes_step: 20000,
            min_width: 200,
            max_width: 1080,
            max_images: 4,
          },
          transformation: [
            { if: "ar_gt_1:1" },
            // Landscape
            { width: 1080, height: 770, crop: "fill" },
            // Portrait
            { if: "else", width: 1080, height: 1350, crop: "fill" },
            ,
          ],
        }
      );

      // Geocoding
      const geoData = await geocoder
        .forwardGeocode({
          query: req.body.location,
          limit: 1,
        })
        .send();

      const location = geoData.body.features[0].geometry;

      // TEMPORARY COMMENT SUPPLEMENTATION
      const asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      };

      const comments = [];
      const likes = [];

      const start = async () => {
        await asyncForEach(users, async (selectedUser) => {
          if (selectedUser !== req.user.id && Math.random() > 0.65) {
            const user = await User.findById(selectedUser).select("-password");
            const commentText =
              commentsText[Math.floor(Math.random() * commentsText.length)];
            const newComment = {
              text: commentText,
              name: user.name,
              avatar: user.avatar,
              user: user.id,
            };

            comments.unshift(newComment);
          }

          if (selectedUser !== req.user.id && Math.random() > 0.15) {
            likes.unshift({ user: selectedUser });
          }
        });
      };

      await start();

      const newPost = new Post({
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        title: req.body.title,
        description: req.body.description,
        image: uploadedResponse.responsive_breakpoints[0].breakpoints,
        height: req.body.height,
        bestTime: req.body.bestTime,
        focalLengthRange: req.body.focalLengthRange,
        locationName: req.body.location,
        location: location,
        comments: comments,
        likes: likes,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/posts
// @desc GET all posts
// @access Private
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/posts/:id
// @desc GET post by ID
// @access Private
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    // Checking Error type, if err.kind is ObjectId it meand an ID was present but it wasnt in the form expected
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/posts/search/:term
// @desc GET post by search term
// @access Public

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/search/:term", async (req, res) => {
  try {
    if (req.params.term) {
      const regex = new RegExp(escapeRegex(req.params.term), "gi");
      const posts = await Post.find({ title: regex }).sort({ date: -1 });
      res.json(posts);
    } else {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/posts/:id
// @desc Delete Post by ID
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }

    // Check User
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    await post.remove();

    res.json({ msg: "Post Removed" });
  } catch (err) {
    // Checking Error type, if err.kind is ObjectId it meand an ID was present but it wasnt in the form expected
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route put api/posts/like/:id
// @desc Like a post
// @access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post has already been liked - filter post likes so only likes made by the user are present. If the result is not zero the user has already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route put api/posts/unlike/:id
// @desc unlike a post
// @access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post has already been liked - filter post likes so only likes made by the user are present. If the result is not zero the user has already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }
    const removeIndex = post.likes
      .map((item) => item.id)
      .indexOf(req.params._id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/posts/comment/:id
// @desc Comment on a post
// @access Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Comment must contain some text").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // -password means user is fetched without password property
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment by ID
// @access Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Check comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user made comment
    if (comment.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index

    const removeIndex = post.comments
      .map((comment) => comment.id.toString())
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
