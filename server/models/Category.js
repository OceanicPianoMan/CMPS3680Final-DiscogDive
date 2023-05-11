const mongoose = require('mongoose'); //requires Mongoose library via npm

const categorySchema = new mongoose.Schema({ //define a new Mongoose schema
					     //for Category model
  name: {
    type: String,
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  }, //inserts 
});

module.exports = mongoose.model('Category', categorySchema);
//Export Mongoose model based on the categorySchema.
//Category model created with mongoose.model method 
//takes two arguments: the name of model and the schema that the model is using 
//name of model is 'Category' and the schema is categorySchema
