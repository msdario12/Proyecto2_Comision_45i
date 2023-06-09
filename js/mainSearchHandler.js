// Logica para manejar el redireccionamiento del boton de search
// Obtengo el formulario del DOM
document
	.querySelector('#mainSearchForm')
	.addEventListener('submit', handleSearchMainSubmit);
// Handler del submit
function handleSearchMainSubmit(e) {
	e.preventDefault();
	console.log(e);
}
