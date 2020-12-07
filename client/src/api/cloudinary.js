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

  params: {
    upload_preset: "imoSocialMedia",
    responsive_breakpoints: {
      create_derived: true,
      bytes_step: 20000,
      min_width: 100,
      max_width: 600,
      max_images: 3,
    },
    transformation: [{ width: 600, height: 600, crop: "fill" }],
  },
});

module.exports = { cloudinary, avatarStorage };
