// Manejomos la logica de hacer click y reservar la publicacion
// !Test sweet alert
function handleChangeInputsAlert(e) {
	console.log(e);
	// Obtenemos searchParams del localStorage
	const searchParams = getFromLocalStorage('searchParams');
	if (e.target.id === 'searchCapacityInputAlert') {
		addToLocalStorage('searchParams', {
			...searchParams,
			quantityParam: e.target.value,
		});
	}
	if (e.target.id === 'dateCheckinInputAlert') {
		addToLocalStorage('searchParams', {
			...searchParams,
			checkInDateSearch: e.target.value,
		});
	}
	if (e.target.id === 'dateCheckoutInputAlert') {
		addToLocalStorage('searchParams', {
			...searchParams,
			checkOutDateSearch: e.target.value,
		});
	}
}
async function sweetAlertRender(checkin, checkout, quantity, card) {
	Swal.fire({
		title: `Confirma tu reserva en ${card.accommodationTitle}`,
		confirmButtonText: 'Cotizar reserva',
		html: `<form action="" id="searchCardsFormAlert">
            <!-- Buscar por cantidad de personas -->
            <div class="form-floating mb-4">
                <input
					alert-input
                    alert
					required
					onchange="handleChangeInputsAlert(event)"
                    value="${quantity}"
                    required
                    type="number"
                    max="64"
                    class="form-control"
                    name="searchCapacityInput"
                    id="searchCapacityInputAlert"
                    placeholder="Cantidad de huéspedes" />
                <label for="searchCapacityInput">Cantidad de huéspedes</label>
            </div>
            <!-- Input entrada - datepicker -->
            <input
				alert-input
                alert
				require
				onchange="handleChangeInputsAlert(event)"
                type="date"
                value="${checkin}"
                id="dateCheckinInputAlert"
                placeholder="Llegada"
                name="dateCheckInInput" />
            <!-- Input entrada - datepicker -->
            <input
				alert-input
                alert
				require
				onchange="handleChangeInputsAlert(event)"
                type="date"
                value="${checkout}"
                id="dateCheckoutInputAlert"
                placeholder="Salida"
                name="dateCheckOutInput" />
        </form>
        `,
		focusConfirm: false,
		preConfirm: () => {
			const swalIn = Swal.getPopup().querySelector(
				'#dateCheckinInputAlert'
			).value;
			const swalOut = Swal.getPopup().querySelector(
				'#dateCheckoutInputAlert'
			).value;
			const swalQty = Swal.getPopup().querySelector(
				'#searchCapacityInputAlert'
			).valueAsNumber;

			if (!swalIn || !swalOut || !swalQty) {
				Swal.showValidationMessage(
					`Por favor rellene todos los campos para continuar`
				);
			}

			// Setear los valores de los inputs de date de manera que actualicen el localStorage o las variables de checkin
			function handleChangeInputsAlert(e) {
				console.log(e);
			}
			// Seteo los event listeners
			document
				.querySelectorAll('input[alert-input]')
				.forEach((input) =>
					input.addEventListener('change', handleChangeInputsAlert)
				);
			// Luego de confirmar las fechas obtenemos la cantidad de dias
			const dateIn = document.querySelector('#dateCheckinInputAlert').value;
			const dateOut = document.querySelector('#dateCheckoutInputAlert').value;
			// Genero el intervalo de fechas
			const interval = generateDateInterval(dateIn, dateOut);
			const days = interval.length - 1;
			// Obtenga numero de huéspedes
			const quantity = document.querySelector(
				'#searchCapacityInputAlert'
			).valueAsNumber;
			const price = card.accommodationPrice;
			return { days, quantity, price, dateIn, dateOut };
			// return `El monto total es de $${days * quantity * price}`;
		},
	})
		.then(async (result) => {
			const { days, quantity, price, dateIn, dateOut } = result.value;
			const { value: formValues } = await Swal.fire({
				icon: 'success',
				title: `El monto total es de $${days * quantity * price}`,
				confirmButtonText: 'Confirmar reserva',
				showCloseButton: true,
			});
			if (formValues) {
				//? En caso de confirmar la reserva se añade el id al GUEST localStorage
				// Obtenemos el usuario que esta solicitando reservar
				const emailUserGuest = getFromLocalStorage('currentUser').emailLogin;
				const usersList = getFromLocalStorage('usersBD');
				const guestsUsers = usersList.guestsUsers;
				// Fecha actual
				const actualDay = new Date().toDateString();
				// Buscamos por email
				console.log(emailUserGuest);
				const findUserGuestIndex = guestsUsers.findIndex(
					(user) => user.emailInput === emailUserGuest
				);
				// Creamos el objeto de la reserva para el huesped
				const newBookingInGuest = {
					dateOfReservation: actualDay,
					publicationId: card.id,
					hostEmail: card.hostEmail,
					guestsQuantity: quantity,
					checkInDate: dateIn,
					checkOutDate: dateOut,
				};
				// Añadimos el id de la publicacion a ese usuario
				guestsUsers[findUserGuestIndex].userBookings.unshift(newBookingInGuest);
				// Guardamos la reserva en el usuario en el localStorage
				addToLocalStorage('usersBD', { ...usersList, guestsUsers });
				// ? Añadimos la reserva a la publicación
				if (!card.guestsList) card.guestsList = [];
				// Obtenemos el ID de la publicacion
				const publicationId = card.id;
				// Buscamos el index de la publicacion
				const listOfCards = getFromLocalStorage('accommodationDB');
				const pubIdx = listOfCards.findIndex(
					(card) => card.id === publicationId
				);
				// Creamos la nueva reservación para poner en la card
				const newReservationInCard = {
					guestEmail: emailUserGuest,
					guestsQuantity: quantity,
					checkInDate: dateIn,
					checkOutDate: dateOut,
				};
				// Añadimos la reservacion
				listOfCards[pubIdx].guestsList.push(newReservationInCard);
				// Guardamos en localStorage de las publicaciones
				addToLocalStorage('accommodationDB', listOfCards);
				// ? Guardamos la reservacion en el perfil del host
				// Obtenemos el usuario que es
				const emailUserHost = getFromLocalStorage('currentUser').emailLogin;
				const hostsUsersList = usersList.hostUsers;
				console.log(hostsUsersList);
				// Buscamos por email
				const findUserHostIndex = hostsUsersList.findIndex(
					(user) => user.emailInput === card.hostEmail
				);
				// Creamos el objeto de la reserva para el anfitrion
				const newBookingInHost = {
					dateOfReservation: actualDay,
					publicationId: card.id,
					guestEmail: emailUserGuest,
					guestsQuantity: quantity,
					checkInDate: dateIn,
					checkOutDate: dateOut,
				};
				// Añadimos el id de la publicacion a ese usuario
				console.log(findUserHostIndex);
				console.log(hostsUsersList[findUserHostIndex]);
				// Si no tiene la lista de reservaciones la creamos
				if (!hostsUsersList[findUserHostIndex].ownerBookings) {
					hostsUsersList[findUserHostIndex].ownerBookings = [];
				}
				hostsUsersList[findUserHostIndex].ownerBookings.unshift(
					newBookingInHost
				);
				// Guardamos la reserva en el usuario en el localStorage
				addToLocalStorage('usersBD', { ...usersList, hostsUsersList });
			}
		})
		.then((res) => {
			Swal.fire({
				icon: 'success',
				title: 'Confirmación reservada!',
			});
		});
	// TODO poner https://sweetalert2.github.io/recipe-gallery/login-form.html de ahi copiar como hace un chain con then() para anidar y pasar los datos entre los alerts y asi pasar las fechas y cantidad de huespedes
	// TODO cambiar la forma en que se seleccionan los elementos de los alerts usando los que provee el metodo.
	// if (formValues) {
	// 	const { value: confirm } = await Swal.fire(formValues);
	// 	if (confirm) {

	// 	}
	// }
}

// !Test sweet alert

// Manejador del click en "reservar ahora"
function handleBookingNowClick(e) {
	// Chequeamos si el usuario esta autenticado como guest
	const currentUser = getFromLocalStorage('currentUser');
	if (!currentUser || currentUser.type !== 'guest') {
		// El user no esta logueado o no es guest, redirigir
		renderAlertWithRedirection(
			'Necesitas estar logueado como huésped para continuar',
			'Seras redirigido al login en',
			'info',
			1500,
			'/html/login.html?mode=login-guest&continueToCards=true'
		);
		return;
	}
	// Obtenemos el id de la publicacion
	const publicationId = e.target.attributes['publication-id'].value;
	// Obtenemos informacion de la card del localStorage
	const dataCards = getFromLocalStorage('accommodationDB');
	const findCard = dataCards.find((card) => card.id === publicationId);
	console.log(findCard);
	// Leemos del localStorage la cantidad de huespedes y fechas
	const searchParams = getFromLocalStorage('searchParams');
	// Obtenemos los valores de búsqueda
	const {
		checkInDateSearch: checkin,
		checkOutDateSearch: checkout,
		quantityParam: quantity,
	} = searchParams;
	// Renderizamos el alert
	sweetAlertRender(checkin, checkout, quantity, findCard);
}

// Funcion para captar todos los botones de reservar ahora
function getButtonsBookingNow() {
	// Controlador de todos los botones de reservarAhora
	document.querySelectorAll('button[publication-id]').forEach((button) => {
		button.addEventListener('click', handleBookingNowClick);
	});
}

getButtonsBookingNow();
