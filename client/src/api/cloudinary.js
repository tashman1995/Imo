require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  folder: "Imo-avatars",
  allowedFormats: ["jpeg", "png", "jpg"],
  params: {
    transformation: [{ width: 350, height: 350, crop: "fill" }],
  },
});

module.exports = { cloudinary, avatarStorage };
