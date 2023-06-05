// Logica del signUp

// Funcion para agregar elemento al localStorage
function addToLocalStorage(name, el) {
	const jsonElement = JSON.stringify(el);
	const saveElement = localStorage.setItem(name, jsonElement);
	return saveElement;
}
// Funcion para obtener elementos del localStorage
function getFromLocalStorage(name) {
	const objElement = JSON.parse(localStorage.getItem(name));
	return objElement;
}
// Funcion para eliminar elementos del localStorage
function deleteFromLocalStorage(name) {
	localStorage.removeItem(name);
}

// Obtengo en formulario del HTML

const $form = document.querySelector('form');

// Manejo eventos al submit del form
$form.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log(e);
	const formData = new FormData(e.target);
	const formObj = Object.fromEntries(formData);
	const user = formData.get('emailInput');
	console.log(formObj);
});
