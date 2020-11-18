const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  // Portfolio Website
  website: {
    type: String,
  },
  // Where they are based
  location: {
    type: String,
    required: true,
  },
  // Amateur or Pro
  status: {
    type: String,
    required: true,
  },

  // What they shoot
  subjects: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  equipment: {
    type: [String],
  },

  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
      },
      paid: {
        type: Boolean,
        required: true,
      },
    },
  ],
  receivedEducation: {
    type: Boolean,
  },
  education: [
    {
      title: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    facebook: {
      type: String,
    },
    behance: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
