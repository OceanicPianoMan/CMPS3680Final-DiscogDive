const mongoose = require('mongoose'); //requires Mongoose library via npm

const playlistSchema = new mongoose.Schema({ //define a new Mongoose schema
					     //for Category model
	name: {
		type: String,
		required: 'This field is required.'
	},
	description: {
		type: String,
		required: 'This field is required.'
	},
	creator: {
		type: String,
		required: 'This field is required.'
	},
	songs: {
		type: Array,
		required: 'This field is required.'
	},
	tag: {
		type: String,
		required: 'This field is required.'
	},
	category: {
		type: [String],
		enum: ['Hits','HitsNMiss','Misses','Other'],
		required: 'This field is required.'
	},
	image: {
		type: String,
		required: 'This field is required.'
	}, //inserts
});

playlistSchema.index({ name: 'text', description: 'text'});
//creates a text index on the 'name' and 'description'
//fields of the 'playlistSchema'.
//text index special type of index, allows for text search queries

module.exports = mongoose.model('Playlist', playlistSchema);
//Export Mongoose model based on the playlistSchema
//Playlist model created with mongoose.model method
//takes two arguments: the name of model and the schema that the model is using
//name of model is 'Playlist' and the schema is playlistSchema
