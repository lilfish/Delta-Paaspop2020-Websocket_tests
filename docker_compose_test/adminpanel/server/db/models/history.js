const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
	game: {
		type: String,
		required: [true, "name is required"]
	},
	users: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	points: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Point'
	}],
	gameStarted: {
		type: Date,
		required: [true, "can't be blank"]
	},
	gameEnded: {
		type: Date,
		required: [true, "can't be blank"]
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('History', GameSchema);