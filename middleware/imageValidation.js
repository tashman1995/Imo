const { avatarStorage } = require("../client/src/api/cloudinary");
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

module.exports = async (req, res, next) => {
  await upload.single("avatar");
  next();
};
