// Logica para manejar el redireccionamiento del boton de search
// Obtengo el formulario del DOM
document
	.querySelector('#mainSearchForm')
	.addEventListener('submit', handleSearchMainSubmit);
// Handler del submit
function handleSearchMainSubmit(e) {
	e.preventDefault();
	console.log(e);

	// Obtengo datos del formulario
	const dataForm = new FormData(e.target);
	const data = Object.fromEntries(dataForm);
	// Ejemplo de la estructura de data:
	// {
	//     "destination": "",
	//     "check-in": "",
	//     "check-out": "",
	//     "guests": "1"
	// }

	// Redireccionar con parametros
	const baseURL = `/html/cards.html`;
	const query = `?dest=${data.destination}&in=${data['check-in']}&out=${data['check-out']}&guests=${data.guests}`;
	window.location.href = baseURL + query;
	console.log(data);
}
