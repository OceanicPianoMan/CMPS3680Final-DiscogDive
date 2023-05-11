const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'This field is required.'
	},
	email: {
		type: String,
		required: 'This field is required.'
	},
	category: {
		type: [String],
		enum: ['Heavy Listener','Casual Listener'],
		required: 'This field is required.'
	},
	image: {
		type: String,
		required: 'This field is required.'
	},
});

userSchema.index({ name: 'text', description: 'text'});

module.exports = mongoose.model('User', userSchema);
