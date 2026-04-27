const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const upload = require('../middleware/upload');

// POST /api/members — Add a new member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      year,
      degree,
      email,
      role,
      aboutProject,
      hobbies,
      certificate,
      internship,
      aboutYourAim,
    } = req.body;

    // Validation
    if (!name || !rollNumber || !year || !degree || !email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields: name, rollNumber, year, degree, email, role',
      });
    }

    const memberData = {
      name,
      rollNumber,
      year,
      degree,
      email,
      role,
      aboutProject: aboutProject || '',
      hobbies: hobbies || '',
      certificate: certificate || '',
      internship: internship || '',
      aboutYourAim: aboutYourAim || '',
      image: req.file ? req.file.filename : '',
    };

    const member = new Member(memberData);
    await member.save();

    res.status(201).json({
      success: true,
      message: 'Member added successfully!',
      data: member,
    });
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while adding member',
    });
  }
});

// GET /api/members — Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching members',
    });
  }
});

// GET /api/members/:id — Get a single member
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found',
      });
    }
    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching member',
    });
  }
});

// DELETE /api/members/:id — Delete a member (bonus)
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.status(200).json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while deleting member' });
  }
});

module.exports = router;
