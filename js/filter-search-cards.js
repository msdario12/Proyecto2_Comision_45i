// Logica encargada de filtrar las cards y realizar busquedas
// Obtener las publicaciones del localStorage
let cardsToFilter = getFromLocalStorage('accommodationDB');
// Obtener el form de busqueda
const $searchForm = document.querySelector('#searchCardsForm');
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
	// Fecha de entrada de la búsqueda
	const checkInDateSearch = dataObj.dateCheckInInput;
	// Fecha de salida de la búsqueda
	const checkOutDateSearch = dataObj.dateCheckOutInput;
	// Lista de fechas interiores
	const dateIntervalSearch = generateDateInterval(
		checkInDateSearch,
		checkOutDateSearch
	);
	// Parámetro de búsqueda de titulo
	const searchParam = dataObj.searchTitleInput.toLowerCase();
	// Parámetro de búsqueda de ubicacion
	const ubicationParam = dataObj.searchUbicationInput.toLowerCase();
	// Cantidad de huéspedes
	const quantityParam = dataObj.searchCapacityInput;
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
