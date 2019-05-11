const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
	creator: { type: mongoose.Schema.ObjectId, ref: 'Users', required: true },
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);