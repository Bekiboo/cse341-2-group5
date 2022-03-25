//User Model
//user should have name, email, password

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    familyMembers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Family'
        }
    ]
    // familyMembers: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     tasks: [
    //         {
    //             type: Schema.Types.ObjectId,
    //             ref: 'Todo'
    //         }
    //     ]
    // }]
});

module.exports = mongoose.model('User', userSchema);