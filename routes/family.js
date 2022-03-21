const express = require('express');
const { body } = require('express-validator');

const familyController = require('../controllers/family');

const router = express.Router();

// GET /family/members
router.get('/members', familyController.getMembers);

// POST /family/member
router.post('/member', familyController.createMember);

//GET /family/member/:memberId
router.get('/member/:memberId', familyController.getMember);

module.exports = router;