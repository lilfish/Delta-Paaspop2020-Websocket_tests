require('dotenv').config()
const storage = require('node-persist');

storage.init({
	dir: './storage/',
	stringify: JSON.stringify,
	parse: JSON.parse,
	encoding: 'utf8',
	logging: process.env.DEBUG, // can also be custom logging function
	ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object
	expiredInterval: 10 * 60 * 1000, // every 10 minutes the process will clean-up the expired cache
	// in some cases, you (or some other service) might add non-valid storage files to your
	// storage dir, i.e. Google Drive, make this true if you'd like to ignore these files and not throw an error
	forgiveParseErrors: false
});

const admin_token = process.env.ADMIN_TOKEN;

module.exports = {
	set_value: function (key, value) {
		storage.setItem(key, value)
			.then(() => {
				console.log('Stored successfully');
				return storage.getItem(key);
			})
			.then(value =>
				console.log(`Stored value is ${value}.`)
			)
			.catch(err => console.error(err));
	},
	get_value: function (key) {
		return storage.getItem(key);
	},
	del_value: function(key) {
		storage.removeItem(key).then(() =>{
			return true;
		}).catch(err => console.error(err))
	}
}