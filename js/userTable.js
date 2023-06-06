// Obtengo listado de usuarios
const usersBD = getFromLocalStorage('usersBD') || [];

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
		'Usuario aprobado'
	);
	htmlParent.appendChild($tableUsers);
	banButtons = document.querySelectorAll('button[btn-target]');
	banButtons.forEach((btn) => (btn.onclick = handleTableButtonClick));
}
// ! Logica para modificar lo que se muestra en la tabla de usuarios ----------
// Controllers de los buttons para mostrar tabla
document.querySelector('#showGuestsUsers').onclick = () => {
	renderUserTable($containerForUserTable, 'guest');
};
document.querySelector('#showHostUsers').onclick = () => {
	renderUserTable($containerForUserTable, 'host');
};
document.querySelector('#showAllUsers').onclick = () => {
	renderUserTable($containerForUserTable, 'all');
};
// ! Logica para aprobar o banear usuarios al click de los botones respectivos--------------------
// Controlador para los botones de ban
function handleTableButtonClick(e) {
	// Obtener la accion a realizar con el boton
	const actionToRealize = e.target.attributes['btn-mode'].value;
	// Obtener el email del usuario del boton
	const userEmail = e.target.attributes['btn-target'].value;
	// Leer los datos del usuario en la base de datos
	let globalUsersBD = getFromLocalStorage('usersBD');

	console.log(userEmail, actionToRealize);
}
