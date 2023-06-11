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
function renderInfoAlert(title, content) {
	Swal.fire({
		title: `${title}`,
		icon: 'info',
		text: content,
		showCloseButton: true,
		focusConfirm: false,
		confirmButtonText: '<i class="fa fa-thumbs-up"></i> Cerrar',
		confirmButtonAriaLabel: 'Información',
	});
}
function renderAlertSuccessHome(title) {
	let timerInterval;
	Swal.fire({
		title: title,
		icon: 'success',
		showCloseButton: true,
		html: 'Será redireccionado al home en <b></b> ms.',
		timer: 1500,
		timerProgressBar: true,
		didOpen: () => {
			Swal.showLoading();
			const b = Swal.getHtmlContainer().querySelector('b');
			timerInterval = setInterval(() => {
				b.textContent = Swal.getTimerLeft();
			}, 100);
		},
		willClose: () => {
			clearInterval(timerInterval);
			// redirecciono al home
			window.location.href = '/html/index.html';
		},
	}).then((result) => {
		/* Read more about handling dismissals below */
		if (result.dismiss === Swal.DismissReason.timer) {
			console.log('I was closed by the timer');
		}
	});
}
function renderAlertErrorHome(title) {
	let timerInterval;
	Swal.fire({
		title: title,
		icon: 'error',
		showCloseButton: true,
		html: 'Será redireccionado al home en <b></b> ms.',
		timer: 2000,
		timerProgressBar: true,
		didOpen: () => {
			Swal.showLoading();
			const b = Swal.getHtmlContainer().querySelector('b');
			timerInterval = setInterval(() => {
				b.textContent = Swal.getTimerLeft();
			}, 100);
		},
		willClose: () => {
			clearInterval(timerInterval);
			// redirecciono al home
			window.location.href = '/html/index.html';
		},
	}).then((result) => {
		/* Read more about handling dismissals below */
		if (result.dismiss === Swal.DismissReason.timer) {
			console.log('I was closed by the timer');
		}
	});
}
