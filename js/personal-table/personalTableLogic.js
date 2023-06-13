function mainPersonalTable() {
	// Obtener datos del usuario actual
	const currentUser = getFromLocalStorage('currentUser');

	if (!currentUser) {
		// ! Redireccionar porque no esta logueado
		renderAlertWithRedirection(
			'Lo siento, debes estar logueado para poder acceder a esta pagina,',
			'Seras redireccionado al home en',
			'error',
			1500,
			'/html/index.html'
		);
	}

	// Obtenemos la lista de usuarios global
	const globalUsers = getFromLocalStorage('usersBD');
	// Obtenemos el elemento donde renderizar la tabla
	const $container = document.querySelector('#tableContainer');

	// Obtengo que tipo de tabla vamos a mostrar
	if (currentUser.type === 'guest') {
		// El usuario es guest, mostrar sus reservas
		document.querySelector('#titlePage').textContent = `
        Bienvenido ${currentUser.firstName}! Estas son tus reservas.
        `;
		// Obtenemos la lista de reservas del usuario
		// Buscamos el usuario en la lista de usuarios
		const findUser = globalUsers.guestsUsers.find(
			(user) => user.emailInput === currentUser.emailLogin
		);
		const reservationList = findUser.userBookings;
		// Chequeamos si tiene reservas, sino mostrar un mensaje

		if (reservationList.length === 0) {
			$container.innerHTML = `
            <div class="d-flex flex-column gap-2">
                <h4>Parece que no tienes realizada ninguna reserva aún, no pierdas tiempo y explora las publicaciones de nuestros anfitriones!</h4>
                <div class="d-flex justify-content-center">
                    <a href="/html/cards.html" class="btn btn-primary">Encontrar mi proximo destino</a>
                </div>
            </div>
            `;
			return;
		}

		renderGuestTable(
			$container,
			'guest',
			reservationList,
			'Destino',
			'Fecha de salida',
			'Fecha de regreso',
			'Monto a pagar',
			'Cantidad de huéspedes',
			'Email del dueño',
			'Publicación'
		);
	}
	if (currentUser.type === 'host') {
		// El usuario es guest, mostrar sus publicaciones o reservas
		document.querySelector('#titlePage').textContent = `
        Bienvenido ${currentUser.firstName}! Estos son tus alquileres y publicaciones.
        `;
		document.querySelector('#tableButtons').innerHTML = `
        <button host-button id="hostPublications" class="btn btn-secondary">Mis publicaciones</button>
        <button host-button id="hostBookings" class="btn btn-info">Mis alquileres</button>
        `;

		const findUser = globalUsers.hostUsers.find(
			(user) => user.emailInput === currentUser.emailLogin
		);

		const bookingList = findUser.ownerBookings;

		// Inicialmente se renderiza la tabla de alquileres
		renderGuestTable(
			$container,
			'host',
			bookingList,
			'Fecha de la operación',
			'Fecha de salida',
			'Fecha de regreso',
			'Monto a pagar',
			'Cantidad de huéspedes',
			'Email del inquilino',
			'Publicación'
		);
	}

	// Logica para manejar la tabla personal de guest
	function createGuestTable(arrayToRender, mode, ...args) {
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

		let button = (obj) => `
        <button	publication-id=${obj.publicationId} class="btn btn-outline-primary">
            Ir
        </button>`;

		function createRow(obj, idx, mode) {
			let email = '';
			let location = '';
			if (mode === 'host-publications') {
				const date = new Date(obj.dateOfCreation).toLocaleString();
				return `
                <tr>
                    <th scope="row">${idx}</th>
                    <td>${date}</td>
                    <td>${obj.accommodationTitle}</td>
                    <td>${obj.accommodationLocation}</td>
                    <td>${obj.guestCapacity}</td>
                    <td>${obj.shortDescription}</td>
                    <td>${obj.accommodationPrice}</td>
                    <td>${button(obj)}</td>
                </tr>
                `;
			}
			if (mode === 'guest') {
				email = obj.hostEmail;
				location = obj.location;
			}
			if (mode === 'host') {
				email = obj.guestEmail;
				location = new Date(obj.dateOfReservation).toLocaleString();
			}
			return `
                <tr>
                    <th scope="row">${idx}</th>
                    <td>${location}</td>
                    <td>${obj.checkInDate}</td>
                    <td>${obj.checkOutDate}</td>
                    <td>${obj.totalCost}</td>
                    <td>${obj.guestsQuantity}</td>
                    <td>${email}</td>
                    <td>${button(obj)}</td>
                </tr>
                `;
		}
		let tableBodyInnerHost = ``;
		let tableBodyInnerGuest = ``;
		let number = 0;
		arrayToRender.forEach((obj, idx) => {
			number++;
			tableBodyInnerHost += createRow(obj, number, mode);
		});

		$tableHead.innerHTML = tableHeadInner;
		$tableBody.innerHTML = tableBodyInnerHost + tableBodyInnerGuest;
		$table.appendChild($tableHead);
		$table.appendChild($tableBody);
		return $table;
	}

	// Renderizar la tabla en funcion del modo
	function renderGuestTable(htmlParent, mode, array, ...args) {
		htmlParent.innerHTML = '';
		const $tableUsers = createGuestTable(array, mode, ...args);
		htmlParent.appendChild($tableUsers);
	}
	// ! Logica para modificar lo que se muestra en la tabla de usuarios ----------
	// Controllers de los buttons para mostrar tabla
	document
		.querySelectorAll('button[publication-id]')
		.forEach((btn) =>
			btn.addEventListener('click', handleClickLinkPublication)
		);
	// Handler que redirecciona a la publicacion
	function handleClickLinkPublication(e) {
		const publicationId = e.target.attributes['publication-id'].value;
		const path = '/html/cards.html';
		const query = `#${publicationId}`;
		window.location.href = path + query;
	}
	// Controlador para cambiar el modo de tabla del host
	document
		.querySelectorAll('button[host-button]')
		.forEach((btn) => btn.addEventListener('click', handleClickHostTableMode));
	// Handler para cambiar el modo de la tabla del host
	function handleClickHostTableMode(e) {
		console.log(e);
		const mode = e.target.id;

		const findUser = globalUsers.hostUsers.find(
			(user) => user.emailInput === currentUser.emailLogin
		);

		if (mode === 'hostBookings') {
			const bookingList = findUser.ownerBookings;

			renderGuestTable(
				$container,
				'host',
				bookingList,
				'Fecha de la operación',
				'Fecha de salida',
				'Fecha de regreso',
				'Monto a pagar',
				'Cantidad de huéspedes',
				'Email del inquilino',
				'Publicación'
			);
			return;
		}
		if (mode === 'hostPublications') {
			const userListings = findUser.userListings;

			renderGuestTable(
				$container,
				'host-publications',
				userListings,
				'Fecha de creación',
				'Título',
				'Ubicación',
				'Cantidad de huéspedes',
				'Descripción',
				'Precio por noche',
				'Editar la publicacion'
			);
			return;
		}
	}
}
mainPersonalTable();
