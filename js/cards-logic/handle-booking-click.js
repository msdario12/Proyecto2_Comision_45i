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
