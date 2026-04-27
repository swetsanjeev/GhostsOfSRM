const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll number is required'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    aboutProject: {
      type: String,
      trim: true,
      default: '',
    },
    hobbies: {
      type: String,
      trim: true,
      default: '',
    },
    certificate: {
      type: String,
      trim: true,
      default: '',
    },
    internship: {
      type: String,
      trim: true,
      default: '',
    },
    aboutYourAim: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
