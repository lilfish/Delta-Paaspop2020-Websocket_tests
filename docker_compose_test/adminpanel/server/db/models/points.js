const mongoose = require('mongoose');

const PointsSchema = mongoose.Schema({
	game: {
		type: String,
		required: [true, "can't be blank"],
	},
	points: {
		type: Number,
		required: [true, "can't be blank"],
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users'
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Points', PointsSchema);