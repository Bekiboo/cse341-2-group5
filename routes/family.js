const express = require('express');
const { body } = require('express-validator');

const familyController = require('../controllers/family');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /family/members
router.get('/members', isAuth, familyController.getMembers);

// POST /family/member
router.post('/member', isAuth, familyController.createMember);

//GET /family/member/:memberId
router.get('/member/:memberId', isAuth, familyController.getMember);

// //DELETE /family/member/:memberId
router.delete('/member/:memberId', isAuth, familyController.deleteMember);

module.exports = router;