const { validationResult } = require('express-validator');

const Family = require('../models/family');
const Todo = require('../models/todo');
const User = require('../models/user');

exports.getMembers = (req, res, next) => {
    const query = {};
    query.parent = req.userId;
    // console.log(JSON.stringify(query.parent));
Family.find(query)
    .then(members => {
        // console.log(JSON.stringify(members));
        res.status(200).json({message: 'Fetched family members successfully.',
        members: members});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.createMember = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.')
        error.statusCode = 422;
        throw error;
    }
    const name = req.body.name;
    const member = new Family({
        name: name,
        parent: req.userId,
    });
    member
        .save()
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            user.familyMembers.push(member);
            return user.save();
        })
        .then((result) => {
            res.status(201).json({
                message: 'Family Member Created Successfully.',
                member: result,
                memberId: member._id
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getMember = (req, res, next) => {
    const memberId = req.params.memberId;
    Family.findById(memberId)
        .then(member => {
            if (!member) {
                const error = new Error('Could not find that family member.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: 'Member fetched', member:member});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteMember = (req, res, next) => {
    const memberId = req.params.memberId
    Family.findById(memberId)
        .then((member) => {
            if (!member) {
                const error = new Error('Could not find family member.')
                error.statusCode = 404
                throw error
            }
            return Family.findByIdAndRemove(memberId)
        })
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            user.familyMembers.pull(memberId);
            return user.save();
        })
        .then(result => {
            console.log(result)
            res.status(200).json({message : 'Deleted family member.'})
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500
            }
            next(err)
          })
}