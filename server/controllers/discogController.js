require('../models/database'); //connects to database.js
const Category = require('../models/Category'); // . . . to Category,js
const Playlist = require('../models/Playlist'); // . . . to Playlist.js
const User = require('../models/User'); // . . . to User.js



//GET Homepage
exports.homepage = async(req, res) => {	//renders index page
	try {

		const limitNumber = 5; //specify number of documents to be returned from DB query
		//queries 
		const categories = await Category.find({}).limit(limitNumber);
		const latest = await Playlist.find({}).sort({_id: -1}).limit(limitNumber);
		const hits = await Playlist.find({ 'category': 'Hits'  }).limit(limitNumber);
		const hitsnmiss = await Playlist.find({ 'category': 'HitsNMiss'  }).limit(limitNumber);
		const misses = await Playlist.find({ 'category': 'Misses'  }).limit(limitNumber);
		const other = await Playlist.find({ 'category': 'Other'  }).limit(limitNumber);

		const combo = { latest, hits, hitsnmiss, misses, other}; //combies them

		res.render('index', { title: 'DiscogDive - Home', categories, combo}); //render call (passing categories and combo)

	} catch (error) {
		res.status(500).send({message:error.message || "Error Occured" }); //error catching
	}

}

exports.exploreLatest = async(req, res) => { //renders explore-latest page
	try {

		const limitNumber = 20; //specify number of documents to be returned from DB query
		//queries
		const latest = await Playlist.find({}).sort({_id: -1}).limit(limitNumber); //repeat

		res.render('explore-latest', { title: 'DiscogDive - Latest', latest }); //reder call

	} catch (error) {
		res.status(500).send({message:error.message || "Error Occured" }); //error catching
	}

}

exports.exploreCategories = async(req, res) => { //renders categories page
	try {

		const limitNumber = 20; //specify number of documents to be returned from DB query
		const categories = await Category.find({}).limit(limitNumber); //returns all (no specifc query)

		res.render('categories', { title: 'DiscogDive - Categories', categories }); //render call

	} catch (error) {
		res.status(500).send({message:error.message || "Error Occured" }); //error catching
	}

}

exports.exploreCategoriesByID = async(req, res) => { //renders categories page
	try {
		let categoryId = req.params.id; //gets variable from _id:'specialMongoDBtoken'
		const limitNumber = 20; //specify number of documents to be returned from DB query
		const categoryById = await Playlist.find({ 'category': categoryId }).limit(limitNumber); //finds, in Playlist model, for specific section 'category'
		
		res.render('categories', { title: 'DiscogDive - Categories', categoryById }); //render call
	
	} catch (error) {
		res.satus(500).send({message: error.message || "Error Occured" }); //error catching
	}
} 


exports.explorePlaylist = async(req, res) => { //renders playlists page
	try {
		let playlistID = req.params.id; //gets variable from _id:'specialMongoDBtoken'

		const playlist = await Playlist.findById(playlistID); //query to find by Id with variable passed in

		res.render('playlists', { title: 'DiscogDive - Playlists' , playlist}); //render call

	} catch (error) {
		res.status(500).send({message:error.message || "Error Occured" }); //error catching
	}

}

exports.searchFunc = async(req, res) => { //renders search page

	try {
		let searchTerm = req.body.searchTerm; //gets variable from special 'searchTerm' variable

		let playlist = await Playlist.find( { $text: { $search: searchTerm, $diacriticSensitive: true } } );
		//searches for all playlists that contain the special 'searchTerm' variable. via MongoDB
		//$text is used for 'searchTerm' and $diacriticSensitive:true to ensure that the search is case-insensitive and accent-sensitive

		res.render('search', { title: 'DiscogDive - Search', playlist }); //render call

	} catch (error) {
		res.status(500).send({message:error.message || "Error Occured" }); //error catching

	}
}

exports.profile = async(req, res) => { //renders profile page
	try {

		const limitNumber = 20; //specify number of documents to be returned from DB query
		const user = await User.find({}).limit(limitNumber); //query
		
		res.render('profile', { title: 'DiscogDive - Profile', user }); //render call

	} catch (error) {
		res.status(500).send({message: error.message || "Error Occured" }); //error catching
	}
}


exports.submit = async(req, res) => { //renders submit page

	const infoErrorsObj = req.flash('infoErrors'); //FLASH alert warning (Red) NOT WORKING ;-;
	const infoSubmitObj = req.flash('infoSubmit'); //FLASH alert warning (Green) WORKING :D

	res.render('submit', { title: 'DiscogDive - New Playlist', infoErrorsObj, infoSubmitObj }); //render call
}


exports.submitOnPost = async(req, res) => { //renders submit page

	try {
		//declaring variables
		let imageUploadFile;
		let uploadPath;
		let newImageName;

		if (!req.files || Object.keys(req.files).length === 0) {
			console.log('No files were uploaded.'); //error catching
		} else {
			imageUploadFile= req.files.image; //variable equal to file uploaded
			newImageName = Date.now() + imageUploadFile.name; //concatenated with timestamp, then stored

			uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName; //sets absolute path for uploaded images

			imageUploadFile.mv(uploadPath, function(err) {
				if(err) return res.status(500).send(err); //moves the uploaded image file to the designated upload path
			})
		}

		const newPlaylist = new Playlist({ //new instance of Playlist model
			name: req.body.name,
			description: req.body.description,
			creator: req.body.creator,
			songs: req.body.songs,
			tag: req.body.tag,
			category: req.body.category,
			image: newImageName //all taken from inputted boxes
		});

		await newPlaylist.save(); //saves to the database

		req.flash('infoSubmit', 'Playlist has been created!'); //FLASHes created success! 
		res.redirect('/www/test/submit'); //simple redirect to submit page, no need for render

	} catch (error) {
		req.flash('infoErros', error) //FLASHes created fail! NOT WORKING ;-;
		res.redirect('/www/test/submit'); //repeat
	}
}

/* insert code to test (manual)
async function insert(){
	try{
		await User.insertMany([
		{
			"name": "DiscogDiveUser2",
			"email": "emailme@gmail.com",
			"category": "Heavy Listener",
			"image": "pfp2.png"
		}
		]);
	} catch(error) {
		console.log('err',+ error)
	}
}

insert();
*/

