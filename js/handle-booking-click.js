// Manejomos la logica de hacer click y reservar la publicacion
// !Test sweet alert
async function sweetAlertRender(checkin, checkout, quantity, card) {
	const { value: formValues } = await Swal.fire({
		title: `Confirma tu reserva en ${card.accommodationTitle}`,
		html: `<form action="" id="searchCardsForm">
            <!-- Buscar por cantidad de personas -->
            <div class="form-floating mb-4">
                <input
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
                type="date"
                value="${checkin}"
                id="dateCheckinInputAlert"
                placeholder="Llegada"
                name="dateCheckInInput" />
            <!-- Input entrada - datepicker -->
            <input
                type="date"
                value="${checkout}"
                id="dateCheckoutInputAlert"
                placeholder="Salida"
                name="dateCheckOutInput" />
        </form>`,
		focusConfirm: false,
		preConfirm: () => {
			const dateIn = document.querySelector('#dateCheckinInputAlert');
			console.dir(dateIn);
			return [
				document.querySelector('#searchCapacityInputAlert').value,
				document.querySelector('#dateCheckinInputAlert').value,
				document.querySelector('#dateCheckoutInputAlert').value,
			];
		},
	});
	if (formValues) {
		Swal.fire(JSON.stringify(formValues));
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
