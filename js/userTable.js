// Obtengo listado de usuarios
const usersBD = getFromLocalStorage('usersBD') || [];

// Logica para manejar la tabla de usuarios que ve el administrador
function createTable(arrayToRender, mode, ...args) {
	args.forEach((arg) => console.log(arg));
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
	const banButtonHTML = `<button class="btn btn-danger">Deshabilitar Usuario</button>`;
	const approveButtonHTML = `<button class="btn btn-success">Habilitar Usuario</button>`;
	function createRow(obj, idx) {
		return `
		<tr>
			<th scope="row">${idx}</th>
			<td>${obj.nameInput}</td>
			<td>${obj.lastNameInput}</td>
			<td>${obj.emailInput}</td>
			<td>${obj.type}</td>
			<td>${obj.isRegistrationApproved ? banButtonHTML : approveButtonHTML}</td>
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

const $containerForUserTable = document.querySelector('#usersTableContainer');
// ! Logica para modificar lo que se muestra en la tabla de usuarios ----------
document.querySelector('#showGuestsUsers').onclick = () => {
	$containerForUserTable.innerHTML = '';
	const $tableUsers = createTable(
		usersBD,
		'guest',
		'Nombre',
		'Apellido',
		'Email',
		'Tipo de Usuario',
		'Usuario aprobado'
	);
	$containerForUserTable.appendChild($tableUsers);
};
document.querySelector('#showHostUsers').onclick = () => {
	$containerForUserTable.innerHTML = '';
	const $tableUsers = createTable(
		usersBD,
		'host',
		'Nombre',
		'Apellido',
		'Email',
		'Tipo de Usuario',
		'Usuario aprobado'
	);
	$containerForUserTable.appendChild($tableUsers);
};
document.querySelector('#showAllUsers').onclick = () => {
	$containerForUserTable.innerHTML = '';
	const $tableUsers = createTable(
		usersBD,
		'all',
		'Nombre',
		'Apellido',
		'Email',
		'Tipo de Usuario',
		'Usuario aprobado'
	);
	$containerForUserTable.appendChild($tableUsers);
};
