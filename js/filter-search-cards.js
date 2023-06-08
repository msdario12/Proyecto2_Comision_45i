// Logica encargada de filtrar las cards y realizar busquedas
// Obtener las publicaciones del localStorage
let cardsToFilter = getFromLocalStorage('accommodationDB');
// Obtener el input de busqueda por titulo
const $inputSearch = document.querySelector('#searchInput');
// Controlador a ejecutarse con el keyUp
function handleKeyUpInputSearch(e) {
	// Leer el valor del input cuando se apriete enter o el boton de buscar
	if (e.key === 'Enter') {
		const searchParam = String(e.target.value).toLowerCase();
		// Leer del localStorage solo las publicaciones que incluyan la búsqueda
		// Guardar ese array que cumple en una variable
		const filteredCars = cardsToFilter.filter((card) => {
			return card.accommodationTitle.toLowerCase().includes(searchParam);
		});
		// Limpiar las cards anteriores que se esten mostrando
		// Renderizar las nuevas publicaciones en base a la busqueda.

		renderCardList(filteredCars);
	}
}
$inputSearch.addEventListener('keyup', handleKeyUpInputSearch);
