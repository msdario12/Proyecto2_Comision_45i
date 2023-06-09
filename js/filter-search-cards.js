// Logica encargada de filtrar las cards y realizar busquedas
// Obtener las publicaciones del localStorage
let cardsToFilter = getFromLocalStorage('accommodationDB');
// Obtener el form de busqueda
const $searchForm = document.querySelector('#searchCardsForm');
// Controlador a ejecutarse con el submit
function handleKeyUpInputSearch(e) {
	e.preventDefault();
	// Leo los inputs mediante el formData
	const data = new FormData(e.target);
	const dataObj = Object.fromEntries(data);
	// Valor de busqueda de titulo
	console.log(dataObj);
	const searchParam = dataObj.searchTitleInput.toLowerCase();
	// Cantidad de huéspedes
	const quantityParam = dataObj.searchCapacityInput;
	// Leer del localStorage solo las publicaciones que incluyan la búsqueda
	// Guardar ese array que cumple en una variable
	const filteredCars = cardsToFilter.filter((card) => {
		// Condicion que verifica el titulo
		const hasTitle = card.accommodationTitle
			.toLowerCase()
			.includes(searchParam);
		// Vemos si la capacidad es mayor a lo que busca
		const hasQuantity = card.guestCapacity >= quantityParam;

		// Todas las condiciones deben ser true
		return hasTitle && hasQuantity;
	});
	// Limpiar las cards anteriores que se esten mostrando
	// Renderizar las nuevas publicaciones en base a la busqueda.
	console.log(filteredCars);
	renderCardList(filteredCars);
}
// Manejador de eventos al submit del form de search
$searchForm.addEventListener('submit', handleKeyUpInputSearch);
