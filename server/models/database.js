const mongoose = require('mongoose'); //requires Mongoose library via npm
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); //connects to MongoDB
//Connect to a MongoDB database using the MONGODB_URI environment variable and set some options. 
//The useNewUrlParser option ensures that Mongoose uses the new connection string parser instead of the deprecated one. 
//The useUnifiedTopology option enables the new server discovery and monitoring engine.

const db = mongoose.connection; //variable db for connection instance

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected') //connected!
});

// Models
require('./Category'); //Contains Category Schema
require('./Playlist'); //Contains Playlist Schema
require('./User'); // Cpmtaoms User Schema
