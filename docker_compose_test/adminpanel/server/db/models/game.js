const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
	game: {
		type: String,
		required: [true, "name is required"]
	},
	history: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Histories'
	}],
	points: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Point'
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('Game', GameSchema);