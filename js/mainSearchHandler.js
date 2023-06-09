// Establezco los valores mínimos de los inputs de date
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
	console.log(e);
	if (e.target.id === 'dateCheckinInput') {
		console.log(e.target.value);
		let initialDate = e.target.value;
		e.target.form.elements.dateCheckoutInput.setAttribute('min', initialDate);
	}
}
// Selecciono los input tipo date de la pagina para controlarlos
document
	.querySelectorAll('input[type=date]')
	.forEach((input) => input.addEventListener('change', handleDateInputs));

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
