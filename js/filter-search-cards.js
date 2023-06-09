// Logica encargada de filtrar las cards y realizar busquedas
// Obtener las publicaciones del localStorage
let cardsToFilter = getFromLocalStorage('accommodationDB');
// Obtener el form de busqueda
const $searchForm = document.querySelector('#searchCardsForm');
// Funcion para formatear la fecha en string
function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}
// Restringimos la fecha del checkIn a que no se antes que hoy
const todayDate = new Date();
document
	.querySelector('#dateCheckinInput')
	.setAttribute('min', formatDate(todayDate));
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
            <!-- Input submit -->
            <input type="submit" class="btn btn-primary" value="Buscar" />
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

// Funcion que maneja el dateInput de checkout inputs, restringiendo las fechas
function handleDateInputs(e) {
	if (e.target.id === 'dateCheckinInput') {
		console.log(e.target.value);
		let initialDate = e.target.value;
		e.target.form.elements.dateCheckoutInput.setAttribute('min', initialDate);
	}
}
// Funcion que toma 2 fechas y genera un array con las fechas internas
function generateDateInterval(date1, date2) {
	// Obtener las fechas de check-in y check-out del objeto
	const fechaCheckin = new Date(String(date1));
	const fechaCheckout = new Date(String(date2));
	// Crear un array para almacenar las fechas del intervalo
	const intervaloFechas = [];

	// Incluir la fecha de check-in en el intervalo
	intervaloFechas.push(fechaCheckin);

	// Generar las fechas intermedias entre check-in y check-out
	const fechaActual = new Date(fechaCheckin);
	while (fechaActual < fechaCheckout) {
		fechaActual.setDate(fechaActual.getDate() + 1);
		intervaloFechas.push(new Date(fechaActual).toString());
	}
	return intervaloFechas;
}
// Funcion para consultar si una fecha esta comprendida en un intervalo
// date format '2023-05-17'
function checkIfDateIsBetween(interval, date) {
	const dateString = new Date(date).toString();
	return interval.includes(dateString);
}
// Funcion que recorre 2 intervalos viendo si alguna fecha coincide
function checkMatchBetweenIntervals(interval1, interval2) {
	for (let i = 0; i < interval1.length; i++) {
		for (let j = 0; j < interval2.length; j++) {
			// Si algun elemento es igual se detiene el loop
			if (interval1[i] === interval2[j]) {
				return true;
			}
		}
	}
}
// Controlador a ejecutarse con el submit
function handleKeyUpInputSearch(e) {
	e.preventDefault();
	// Leo los inputs mediante el formData
	const data = new FormData(e.target);
	const dataObj = Object.fromEntries(data);
	console.log(dataObj);
	// Object deconstruction
	let {
		dateCheckInInput: checkInDateSearch,
		dateCheckOutInput: checkOutDateSearch,
		searchTitleInput: searchParam,
		searchUbicationInput: ubicationParam,
		searchCapacityInput: quantityParam,
	} = dataObj;

	// Convierto a lowerCase
	searchParam = searchParam.toLowerCase();
	ubicationParam = ubicationParam.toLowerCase();

	// Lista de fechas interiores
	const dateIntervalSearch = generateDateInterval(
		checkInDateSearch,
		checkOutDateSearch
	);
	// Leer del localStorage solo las publicaciones que incluyan la búsqueda
	// Guardar ese array que cumple en una variable
	const filteredCars = cardsToFilter.filter((card) => {
		// Condicion que verifica el titulo
		const hasTitle = card.accommodationTitle
			.toLowerCase()
			.includes(searchParam);
		// Condicion de la ubicacion
		const hasUbication = card.accommodationLocation
			.toLowerCase()
			.includes(ubicationParam);
		// Vemos si la capacidad es mayor a lo que busca
		const hasQuantity = card.guestCapacity >= quantityParam;

		let hasDateAvailable;
		// Vemos si la card tiene lista de reservas

		if (!card.guestsList) {
			// Si no hay reservas, se puede buscar y alquilar
			// Se niega al final
			hasDateAvailable = !true;
		}

		card.guestsList.forEach((reservation) => {
			// Creo el intervalo de las fechas de reservas de la card
			const intervalDateCard = generateDateInterval(
				reservation.checkInDate,
				reservation.checkOutDate
			);
			// Si ninguna de las fechas de los intervalos coincide devuelve false
			hasDateAvailable = checkMatchBetweenIntervals(
				dateIntervalSearch,
				intervalDateCard
			);
		});

		// Todas las condiciones deben ser true para mostrar esa card como disponible
		return hasTitle && hasQuantity && hasUbication && !hasDateAvailable;
	});
	// Limpiar las cards anteriores que se esten mostrando
	// Renderizar las nuevas publicaciones en base a la busqueda.
	console.log(filteredCars);
	renderCardList(filteredCars);
}
// Manejador de eventos al submit del form de search
$searchForm.addEventListener('submit', handleKeyUpInputSearch);
document
	.querySelectorAll('input[type=date]')
	.forEach((input) => input.addEventListener('change', handleDateInputs));
