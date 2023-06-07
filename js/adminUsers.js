// Creo usuarios tipo admin y los añado del localStorage
let globalUsersBD = getFromLocalStorage('usersBD');
if (!globalUsersBD) {
	console.log('Creando localsStorage users');
	globalUsersBD = addToLocalStorage('usersBD', {
		hostUsers: [],
		guestsUsers: [],
		adminUsers: [],
	});
}
if (!globalUsersBD.adminUsers) {
	addToLocalStorage('usersBD', { ...globalUsersBD, adminUsers: [] });
}
// Creamos un usuario
const admin1 = {
	emailInput: 'admin@admin.com',
	isRegistrationApproved: true,
	lastNameInput: 'Mansilla',
	nameInput: 'Dario',
	passwordInput: 'adminadmin',
	type: 'admin',
};
// Añadimos el admin a la bd solo si este no existe ya
let findUser = globalUsersBD.adminUsers.find(
	(user) => user.emailInput === admin1.emailInput
);
if (!findUser) {
	addToLocalStorage('usersBD', {
		hostUsers: [],
		guestsUsers: [],
		adminUsers: [...globalUsersBD.adminUsers, admin1],
	});
}
