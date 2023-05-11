const express = require('express'); //importing express module
const router = express.Router(); //creating new router instance using express
const discogController = require('../controllers/discogController'); //importing discogController module 

//router .get/.post from express
router.get('/', discogController.homepage); //GET route for root URL, calls 'homepage' method
router.get('/categories', discogController.exploreCategories); //GET route for categories URL, calls 'exploreCategories' method
router.get('/playlists/:id', discogController.explorePlaylist); //GET route for playlists/:id URL, calls 'explorePlaylist' method
router.get('/categories/:id', discogController.exploreCategoriesByID); //GET route for categories/:id URL, calls 'exploreCategoriesByID' method
router.get('/explore-latest', discogController.exploreLatest); //GET route for explore-latest, calls 'exploreLatest' method
router.post('/search', discogController.searchFunc); //POST route for search, calls 'searchFunc' method
router.get('/profile', discogController.profile); //GET route for profile, calls 'profile' method
router.get('/submit', discogController.submit); //GET route for submit, calls 'submit' method
router.post('/submit', discogController.submitOnPost); //POST route for submite, calls 'submiteOnPost' method




module.exports = router; //export router instance
