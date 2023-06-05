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
	let tableBodyInner = ``;
	if (mode === 'host') {
		arrayToRender.hostUsers.forEach((obj, idx) => {
			// Nombre
			// Apellido
			// correo
			// Fecha de registro ?
			tableBodyInner += `
            <tr>
                <th scope="row">${idx}</th>
                <td>${obj.nameInput}</td>
                <td>${obj.lastNameInput}</td>
                <td>${obj.emailInput}</td>
            </tr>
            `;
		});
	}
	if (mode === 'guest') {
		arrayToRender.guestsUsers.forEach((obj, idx) => {
			// Nombre
			// Apellido
			// correo
			// Fecha de registro ?
			tableBodyInner += `
            <tr>
                <th scope="row">${idx}</th>
                <td>${obj.nameInput}</td>
                <td>${obj.lastNameInput}</td>
                <td>${obj.emailInput}</td>
            </tr>
            `;
			console.log(tableBodyInner);
		});
	}

	console.log(tableBodyInner);

	console.log(tableHeadInner);
}

createTable(usersBD, 'host', 'Nombre', 'Apellido', 'Email');
