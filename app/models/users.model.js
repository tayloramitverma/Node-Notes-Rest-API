const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    full_name: String,
    email: String,
    phone: Number
}, {
    timestamps: true,
    toJSON: { virtuals: true },
  	toObject: { virtuals: true }
});

UsersSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'creator'
})

//UsersSchema.pre('findOne', autoPopulateComments)
//UsersSchema.pre('find', autoPopulateComments)

module.exports = mongoose.model('Users', UsersSchema);

function autoPopulateComments (next) {
  this.populate('notes', ['title', 'content'])
  next()
}