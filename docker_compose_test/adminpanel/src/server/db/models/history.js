const mongoose = require('mongoose');

const HistorySchema = mongoose.Schema({
	
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
		default: null
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('History', HistorySchema);