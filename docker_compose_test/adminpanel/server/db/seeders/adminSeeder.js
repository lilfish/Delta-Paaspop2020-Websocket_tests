import Admins from '../models/admin'

async function seedAdmins() {
	var admins = [{
			username: 'admin',
			password: 'admin'
		},
		{
			username: 'admin2',
			password: 'admin'
		},
	];
	for (let index = 0; index < admins.length; index++) {

		const admin = admins[index];
		Admins.findOne({
			username: admin.username
		}).then(async function (user) {
			if (!user) {
				console.log("no admin account found, making:", admin.username);
				var newAdmin = new Admins(admin);
				await newAdmin.save();
			}
		});
	}
}

try {
	seedAdmins();
} catch (e) {
	console.error(e);
}