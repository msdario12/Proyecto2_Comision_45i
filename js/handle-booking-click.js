// Manejomos la logica de hacer click y reservar la publicacion
// !Test sweet alert
async function sweetAlertRender() {
	const { value: formValues } = await Swal.fire({
		title: 'Multiple inputs',
		html: `<form action="" id="searchCardsForm">
            <!-- Buscar por cantidad de personas -->
            <div class="form-floating mb-4">
                <input
                    value="3"
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
                id="dateCheckinInputAlert"
                placeholder="Llegada"
                name="dateCheckInInput" />
            <!-- Input entrada - datepicker -->
            <input
                type="date"
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
	const publicationId = e.target.attributes['publication-id'].value;
	console.log(publicationId);
	sweetAlertRender();
}

// Controlador de todos los botones de reservarAhora
document.querySelectorAll('button[publication-id]').forEach((button) => {
	button.addEventListener('click', handleBookingNowClick);
});
