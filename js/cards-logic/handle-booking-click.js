// Manejomos la logica de hacer click y reservar la publicacion
// !Test sweet alert
async function sweetAlertRender(checkin, checkout, quantity, card) {
	const { value: formValues } = await Swal.fire({
		title: `Confirma tu reserva en ${card.accommodationTitle}`,
		confirmButtonText: 'Cotizar reserva',
		html: `<form action="" id="searchCardsFormAlert">
            <!-- Buscar por cantidad de personas -->
            <div class="form-floating mb-4">
                <input
                    alert
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
                alert
                type="date"
                value="${checkin}"
                id="dateCheckinInputAlert"
                placeholder="Llegada"
                name="dateCheckInInput" />
            <!-- Input entrada - datepicker -->
            <input
                alert
                type="date"
                value="${checkout}"
                id="dateCheckoutInputAlert"
                placeholder="Salida"
                name="dateCheckOutInput" />
        </form>
        `,
		focusConfirm: false,
		preConfirm: () => {
			// Luego de confirmar las fechas obtenemos la cantidad de dias
			const dateIn = document.querySelector('#dateCheckinInputAlert').value;
			const dateOut = document.querySelector('#dateCheckoutInputAlert').value;
			// Genero el intervalo de fechas
			const interval = generateDateInterval(dateIn, dateOut);
			const days = interval.length - 1;
			// Obntengo numero de huespedes
			const quantity = document.querySelector(
				'#searchCapacityInputAlert'
			).valueAsNumber;
			const price = card.accommodationPrice;

			return `El monto total es de $${days * quantity * price}`;
		},
	});
	if (formValues) {
		const { value: confirm } = await Swal.fire(formValues);
		if (confirm) {
			//? En caso de confirmar la reserva se añade el id al GUEST localStorage
			// Obtenemos el usuario que esta solicitando reservar
			const emailUserGuest = getFromLocalStorage('currentUser').emailLogin;
			const usersList = getFromLocalStorage('usersBD');
			const guestsUsersList = usersList.guestsUsers;
			// Buscamos por email
			console.log(emailUserGuest);
			const findUserGuestIndex = guestsUsersList.findIndex(
				(user) => user.emailInput === emailUserGuest
			);
			// Creamos el objeto de la reserva
			const newBookingInGuest = {
				dateOfReservation: new Date().toString,
				publicationId: card.id,
				hostEmail: card.hostEmail,
			};
			// Añadimos el id de la publicacion a ese usuario
			guestsUsersList[findUserGuestIndex].userBookings.unshift(
				newBookingInGuest
			);
			// Guardamos la reserva en el usuario en el localStorage
			addToLocalStorage('usersBD', { ...usersList, guestsUsersList });
			// ? Añadimos la reserva a la publicación
			if (!card.guestsList) card.guestsList = [];
			// Obtenemos el ID de la publicacion
			const publicationId = card.id;
			// Buscamos el index de la publicacion
			const listOfCards = getFromLocalStorage('accommodationDB');
			const pubIdx = listOfCards.findIndex((card) => card.id === publicationId);
			// Creamos la nueva reservación para poner en la card
			const newReservationInCard = {
				guestEmail: emailUserGuest,
				guestsQuantity: quantity,
				checkInDate: checkin,
				checkOutDate: checkout,
				guestsQuantity: quantity,
			};
			// Añadimos la reservacion
			listOfCards[pubIdx].guestsList.push(newReservationInCard);
			// Guardamos en localStorage de las publicaciones
			addToLocalStorage('accommodationDB', listOfCards);
			// ? Guardamos la reservacion en el perfil del host
			// Obtenemos el usuario que es
			const emailUserHost = getFromLocalStorage('currentUser').emailLogin;
			const hostsUsersList = getFromLocalStorage('usersBD').guestsUsers;
			// Buscamos por email
			const findUserHostIndex = hostsUsersList.findIndex(
				(user) => user.emailInput === emailUserHost
			);
			// Creamos el objeto de la reserva
			const newBookingInHost = {
				dateOfReservation: new Date().toString,
				publicationId: card.id,
				guestEmail: emailUserGuest,
			};
			// Añadimos el id de la publicacion a ese usuario
			console.log(hostsUsersList[findUserHostIndex]);
			// Si no tiene la lista de reservaciones la creamos
			if (!hostsUsersList[findUserHostIndex].ownerBookings) {
				hostsUsersList[findUserHostIndex].ownerBookings = [];
			}
			hostsUsersList[findUserHostIndex].ownerBookings.unshift(newBookingInHost);
			// Guardamos la reserva en el usuario en el localStorage
			addToLocalStorage('usersBD', { ...usersList, hostsUsersList });

			Swal.fire({
				icon: 'success',
				title: 'Confirmación reservada!',
			});
		}
	}
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
