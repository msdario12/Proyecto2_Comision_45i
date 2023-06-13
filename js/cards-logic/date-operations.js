// Funciones enfocadas a manejar las fechas
// Funcion para formatear la fecha en string
function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
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
