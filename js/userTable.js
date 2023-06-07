// Creo en localStorage, la vista activa
let userTableViewMode = getFromLocalStorage('userTableViewMode');
// Si no existe, lo agrego
if (!userTableViewMode) {
	userTableViewMode = addToLocalStorage('userTableViewMode', {
		category: 'all',
	});
}

// Obtengo listado de usuarios
let usersBD = getFromLocalStorage('usersBD') || [];

// Logica para manejar la tabla de usuarios que ve el administrador
function createTable(arrayToRender, mode, ...args) {
	const $table = document.createElement('table');
	$table.classList.add('table');
	const $tableHead = document.createElement('thead');
	const $tableBody = document.createElement('tbody');

	const tableHeadInner = `
    <tr>
        <th scope="col">#</th>
        ${args.reduce((acc, cu) => {
					return acc + "<th scope='col'>" + cu + '</th>\n';
				}, '')}
    </tr>
    `;
	console.log(arrayToRender, mode);
	// Pasar como string "ban" o "approve"
	const createButton = (obj, action) => {
		let className = '';
		let msg = '';
		if (action === 'ban') {
			msg = 'Deshabilitar Usuario';
			className = 'btn btn-danger';
		}
		if (action === 'approve') {
			msg = 'Habilitar Usuario';
			className = 'btn btn-success';
		}
		return `
		<button btn-target=${obj.emailInput} 
				btn-mode=${action} 
				btn-user-type=${obj.type} 
				class="${className}">
		${msg}
		</button>`;
	};

	function createRow(obj, idx) {
		return `
		<tr>
			<th scope="row">${idx}</th>
			<td>${obj.nameInput}</td>
			<td>${obj.lastNameInput}</td>
			<td>${obj.emailInput}</td>
			<td>${obj.type}</td>
			<td>${obj.isRegistrationApproved}</td>
			<td>${
				obj.isRegistrationApproved
					? createButton(obj, 'ban')
					: createButton(obj, 'approve')
			}</td>
		</tr>
		`;
	}
	let tableBodyInnerHost = ``;
	let tableBodyInnerGuest = ``;
	let number = 0;

	if (mode === 'host' || mode === 'all') {
		arrayToRender.hostUsers.forEach((obj, idx) => {
			number++;
			tableBodyInnerHost += createRow(obj, number);
		});
	}
	if (mode === 'guest' || mode === 'all') {
		arrayToRender.guestsUsers.forEach((obj, idx) => {
			number++;
			tableBodyInnerGuest += createRow(obj, number);
		});
	}
	$tableHead.innerHTML = tableHeadInner;
	$tableBody.innerHTML = tableBodyInnerHost + tableBodyInnerGuest;
	$table.appendChild($tableHead);
	$table.appendChild($tableBody);
	return $table;
}
// ! Setear el container de la tabla
const $containerForUserTable = document.querySelector('#usersTableContainer');
// Guardo todos los botones
let banButtons;
// Renderizar la tabla en funcion del modo
function renderUserTable(htmlParent, mode) {
	htmlParent.innerHTML = '';
	const $tableUsers = createTable(
		usersBD,
		mode,
		'Nombre',
		'Apellido',
		'Email',
		'Tipo de Usuario',
		'Estado de usuario',
		'Accion'
	);
	htmlParent.appendChild($tableUsers);
	banButtons = document.querySelectorAll('button[btn-target]');
	banButtons.forEach((btn) => (btn.onclick = handleTableButtonClick));
}
// ! Logica para modificar lo que se muestra en la tabla de usuarios ----------
// Controllers de los buttons para mostrar tabla
document.querySelector('#showGuestsUsers').onclick = () => {
	addToLocalStorage('userTableViewMode', {
		category: 'guest',
	});
	renderUserTable($containerForUserTable, 'guest');
};
document.querySelector('#showHostUsers').onclick = () => {
	addToLocalStorage('userTableViewMode', {
		category: 'host',
	});
	renderUserTable($containerForUserTable, 'host');
};
document.querySelector('#showAllUsers').onclick = () => {
	addToLocalStorage('userTableViewMode', {
		category: 'all',
	});
	renderUserTable($containerForUserTable, 'all');
};
// ! Logica para aprobar o banear usuarios al click de los botones respectivos--------------------
// Controlador para los botones de ban
function handleTableButtonClick(e) {
	// Obtener la accion a realizar con el boton
	const actionToRealize = e.target.attributes['btn-mode'].value;
	// Obtener el email del usuario del boton
	const userEmail = e.target.attributes['btn-target'].value;
	// Obtener el tipo de usuario
	const userType = e.target.attributes['btn-user-type'].value;
	// Leer los datos del usuario en la base de datos
	let globalUsersBD = getFromLocalStorage('usersBD');
	// Encontrar el usuario de la bd
	let findUser;
	let path;
	if (userType === 'host') {
		path = globalUsersBD.hostUsers;
		findUser = globalUsersBD.hostUsers.find(
			(user) => user.emailInput === userEmail
		);
	}
	if (userType === 'guest') {
		path = globalUsersBD.guestsUsers;
		findUser = globalUsersBD.guestsUsers.find(
			(user) => user.emailInput === userEmail
		);
	}
	// Si el boton es de ban, poner false
	if (actionToRealize === 'ban') {
		findUser.isRegistrationApproved = false;
		e.target.attributes['btn-mode'].value = 'approve';
	}
	if (actionToRealize === 'approve') {
		findUser.isRegistrationApproved = true;
		e.target.attributes['btn-mode'].value = 'ban';
	}
	// Añado de vuelta al localStorage
	if (userType === 'host') {
		// ! AÑADIR SWEET ALERT
		addToLocalStorage('usersBD', {
			hostUsers: [...globalUsersBD.hostUsers, findUser],
			...globalUsersBD,
		});
	}
	if (userType === 'guest') {
		// ! AÑADIR SWEET ALERT
		addToLocalStorage('usersBD', {
			guestsUsers: [...globalUsersBD.guestsUsers, findUser],
			...globalUsersBD,
		});
	}
	usersBD = getFromLocalStorage('usersBD');
	const viewMode = getFromLocalStorage('userTableViewMode');
	renderUserTable($containerForUserTable, viewMode.category);

	console.log(viewMode);
}
