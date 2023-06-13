function mainPersonalTable() {
	// Creo en localStorage, la vista activa
	let personalTableViewMode = getFromLocalStorage('personalTableViewMode');
	// Si no existe, lo agrego
	if (!personalTableViewMode) {
		personalTableViewMode = addToLocalStorage('personalTableViewMode', {
			category: 'hostPublications',
		});
	}
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
        <button change-view-btn id="hostPublications" class="btn btn-secondary">Mis publicaciones</button>
        <button change-view-btn id="hostBookings" class="btn btn-info">Mis alquileres</button>
        `;

		const findUser = globalUsers.hostUsers.find(
			(user) => user.emailInput === currentUser.emailLogin
		);

		const bookingList = findUser.ownerBookings;

		console.log(personalTableViewMode.category);

		if (personalTableViewMode.category === 'hostPublications') {
			const userListings = findUser.userListings;

			renderGuestTable(
				$container,
				'host-publications',
				userListings,
				'Última modificación',
				'Título',
				'Ubicación',
				'Cantidad de huéspedes',
				'Descripción',
				'Precio por noche',
				'Acciones'
			);
		}
		if (personalTableViewMode.category === 'hostBookings') {
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
		}
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

		let button = (obj, mode) => `
        <button	publication-id=${obj.publicationId} ${mode}=true class="btn btn-outline-primary">
            Ir
        </button>`;

		function createRow(obj, idx, mode) {
			let email = '';
			let location = '';
			if (mode === 'host-publications') {
				const date = new Date(obj.dateOfCreation).toLocaleString();
				const actionButtons = `
                <div>
                    ${button(obj, mode).replace('Ir', 'Editar')}
                    <button	publication-id=${
											obj.publicationId
										} delete-publication=true class="btn btn-outline-danger">
                        Borrar
                    </button>
                </div>
                `;
				return `
                <tr>
                    <th scope="row">${idx}</th>
                    <td>${date}</td>
                    <td>${obj.accommodationTitle}</td>
                    <td>${obj.accommodationLocation}</td>
                    <td>${obj.guestCapacity}</td>
                    <td>${obj.shortDescription}</td>
                    <td>$${obj.accommodationPrice}</td>
                    <td>${actionButtons}</td>
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
                    <td>$${obj.totalCost}</td>
                    <td>${obj.guestsQuantity}</td>
                    <td>${email}</td>
                    <td>${button(obj, mode)}</td>
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
		let msg = '';
		if (mode === 'host') {
			msg = 'tus alquileres';
		}
		if (mode === 'host-publications') {
			msg = 'tus publicaciones';
		}
		htmlParent.innerHTML = '';
		let $tableUsers = createGuestTable(array, mode, ...args);
		if (array.length === 0) {
			$tableUsers.innerHTML = `<h4>No hay datos de ${msg} por acá</h4>`;
		}
		htmlParent.appendChild($tableUsers);
	}
	// ! Logica para modificar lo que se muestra en la tabla de usuarios ----------
	// Controllers de los buttons para mostrar tabla
	document
		.querySelectorAll('button[guest]')
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
		.querySelectorAll('button[change-view-btn]')
		.forEach((btn) => btn.addEventListener('click', handleClickHostTableMode));
	// Handler para cambiar el modo de la tabla del host
	function handleClickHostTableMode(e) {
		const mode = e.target.id;
		console.log(e);
		addToLocalStorage('personalTableViewMode', {
			category: mode,
		});
		mainPersonalTable();
	}
	// Controlador para redireccionar a editar la publicacion
	document
		.querySelectorAll('button[host-publications]')
		.forEach((btn) => btn.addEventListener('click', handleClickEditCard));
	// Handler para controlar el redireccionamiento para la edicion
	function handleClickEditCard(e) {
		const publicationId = e.target.attributes['publication-id'].value;
		console.log(publicationId);
		const path = '/html/create-publication.html';
		const query = `?edit=true&id=${publicationId}`;
		window.location.href = path + query;
	}
	// Controlador para eliminar publicaciones
	document
		.querySelectorAll('button[delete-publication]')
		.forEach((btn) => btn.addEventListener('click', handleClickDeleteCard));
	// Handler para eliminar cards
	function handleClickDeleteCard(e) {
		// Confirmacion con sweetAlert
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger',
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons
			.fire({
				title: 'Estás seguro?',
				text: 'Eliminar una publicación es permanente, no puede deshacerse!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Eliminar',
				cancelButtonText: 'Cancelar',
				reverseButtons: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					// Caso de confirmar la eliminacion
					// Eliminacion de la card del listado de publicaciones
					const publicationId = e.target.attributes['publication-id'].value;
					const rentalCards = getFromLocalStorage('accommodationDB');
					const findCardIndex = rentalCards.findIndex(
						(card) => card.id === publicationId
					);
					rentalCards.splice(findCardIndex, 1);
					addToLocalStorage('accommodationDB', rentalCards);
					// Eliminacion del listado de publicaciones del usuario
					const globalUsersBD = getFromLocalStorage('usersBD');
					const userIndex = globalUsersBD.hostUsers.findIndex(
						(user) => user.emailInput === currentUser.emailLogin
					);
					const cardResIndex = globalUsersBD.hostUsers[
						userIndex
					].userListings.findIndex(
						(card) => card.publicationId === publicationId
					);
					// Eliminamos ese registro
					globalUsersBD.hostUsers[userIndex].userListings.splice(
						cardResIndex,
						1
					);
					// Escribimos en el localStorage
					addToLocalStorage('usersBD', globalUsersBD);
					// Mensaje de confirmación
					swalWithBootstrapButtons
						.fire(
							'Publicación eliminada',
							'Ya no podrás acceder a ella',
							'success'
						)
						.then(() => location.reload());
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					swalWithBootstrapButtons.fire(
						'Cancelado',
						'Tu publicación todavía existe :)',
						'error'
					);
				}
			});
	}
}
mainPersonalTable();
