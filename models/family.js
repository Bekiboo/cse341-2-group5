const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Todo'
            }
        ],
        parent: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }
)

module.exports = mongoose.model('Family', familySchema);