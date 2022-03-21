const { validationResult } = require('express-validator');

const Family = require('../models/family');

exports.getMembers = (req, res, next) => {
    Family.find()
        .then(members => {
            res.status(200).json({memssage: 'Fetched family members successfully.',
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
    console.log(req.body);
    const name = req.body.name;
    const member = new Family({
        name: name
    })
    member
        .save()
        .then((result) => {
            res.status(201).json({
                message: 'Family Member Created Successfully.',
                member: result
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