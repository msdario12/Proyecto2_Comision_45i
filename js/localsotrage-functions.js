// Funcion para obtener elementos del localStorage
function getFromLocalStorage(name) {
	const objElement = JSON.parse(localStorage.getItem(name));
	return objElement;
}
// Funcion para agregar elemento al localStorage
function addToLocalStorage(name, el) {
	const jsonElement = JSON.stringify(el);
	const saveElement = localStorage.setItem(name, jsonElement);
	return getFromLocalStorage(name);
}
// Funcion para eliminar elementos del localStorage
function deleteFromLocalStorage(name) {
	localStorage.removeItem(name);
}
// 4217784
