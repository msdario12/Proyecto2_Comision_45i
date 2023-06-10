// Logica para crear alertas de sweet alert
function renderAlertSuccess(title, content) {
	Swal.fire({
		title: `${title}`,
		icon: 'success',
		text: content,
		showCloseButton: true,
		focusConfirm: false,
		confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok!',
		confirmButtonAriaLabel: 'Operación exitosa!',
	});
}
function renderAlertError(title, content) {
	Swal.fire({
		title: `${title}`,
		icon: 'error',
		text: content,
		showCloseButton: true,
		focusConfirm: false,
		confirmButtonText: '<i class="fa fa-thumbs-up"></i> Cerrar',
		confirmButtonAriaLabel: 'Error en la operación',
	});
}
