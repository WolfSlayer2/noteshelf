const mongoose = require('mongoose');
const { Schema } = mongoose;

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

module.exports = mongoose.model('notes',notesSchema);