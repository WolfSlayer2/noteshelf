const mongoose = require('mongoose');

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tag: {
        type: String,
        default: 'General'
    }
});

module.exports = mongoose.model('Notes',notesSchema);