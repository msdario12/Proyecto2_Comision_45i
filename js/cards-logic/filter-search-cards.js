// Logica encargada de filtrar las cards y realizar busquedas
// !- Leemos los params de busqueda desde la URL
function readURLSearchParams() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	console.log(urlParams.get('dest'));
	// Agrego los params al localStorage
	addToLocalStorage('searchParams', {
		searchUbicationInput: urlParams.get('dest'),
		quantityParam: urlParams.get('guests'),
		checkInDateSearch: urlParams.get('in'),
		checkOutDateSearch: urlParams.get('out'),
	});

	// Creo un objeto para pasarlo a la funcion que filtra
	const obj = {
		dateCheckInInput: urlParams.get('in'),
		dateCheckOutInput: urlParams.get('out'),
		searchTitleInput: '',
		searchUbicationInput: urlParams.get('dest'),
		searchCapacityInput: urlParams.get('guests'),
	};
	return obj;
}
// Leemos los valores de la URL y los guardamos
const objParamsURL = readURLSearchParams();
// Obtener las publicaciones del localStorage
let cardsToFilter = getFromLocalStorage('accommodationDB');
// Renderizamos en funcion de esos params
renderFilteredCardsByParams(objParamsURL);
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
// Funcion que se encarga de recibir la lista de cards y filtrar
function renderFilteredCardsByParams(obj) {
	// Object deconstruction
	let {
		dateCheckInInput: checkInDateSearch,
		dateCheckOutInput: checkOutDateSearch,
		searchTitleInput: searchParam,
		searchUbicationInput: ubicationParam,
		searchCapacityInput: quantityParam,
	} = obj;

	// Convierto a lowerCase
	searchParam = searchParam.toLowerCase();
	ubicationParam = ubicationParam ? ubicationParam.toLowerCase() : '';

	// Lista de fechas interiores
	const dateIntervalSearch = generateDateInterval(
		checkInDateSearch,
		checkOutDateSearch
	);
	// Leer del localStorage solo las publicaciones que incluyan la búsqueda
	// Guardar ese array que cumple en una variable

	// Funcion que realiza el filtrado de las cards en base a los params
	function getFilteredCards(cardList) {
		const filtered = cardList.filter((card) => {
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
			} else {
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
			}

			// Todas las condiciones deben ser true para mostrar esa card como disponible
			return hasTitle && hasQuantity && hasUbication && !hasDateAvailable;
		});
		return filtered;
	}

	const filteredCars = getFilteredCards(cardsToFilter);
	// actualizamos los valores  en el localStorage la cantidad de huespedes y fechas
	addToLocalStorage('searchParams', {
		searchUbicationInput,
		quantityParam,
		checkInDateSearch,
		checkOutDateSearch,
	});
	// Limpiar las cards anteriores que se esten mostrando
	// Renderizar las nuevas publicaciones en base a la busqueda.
	renderCardList(filteredCars);
}

// Controlador a ejecutarse con el submit
function handleKeyUpInputSearch(e) {
	e.preventDefault();
	// Leo los inputs mediante el formData
	const data = new FormData(e.target);
	const dataObj = Object.fromEntries(data);
	console.log(dataObj);
	// Filtra y renderiza las cards que cumplan las condiciones
	renderFilteredCardsByParams(dataObj);
}
// Manejador de eventos al submit del form de search
$searchForm.addEventListener('submit', handleKeyUpInputSearch);
// Selecciono los input tipo date de la pagina para controlarlos
document
	.querySelectorAll('input[type=date]')
	.forEach((input) => input.addEventListener('change', handleDateInputs));
