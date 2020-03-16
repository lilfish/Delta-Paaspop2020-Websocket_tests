const mongoose = require('mongoose');
const pointsModel = mongoose.Schema({
	game: {
		type: String,
		required: '{PATH} is required!'
	},
	points: {
		type: Number,
		required: '{PATH} is required!'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: true
});
module.exports = mongoose.model('Points', pointsModel);