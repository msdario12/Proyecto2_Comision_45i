// Obtenemos los link que redireccionan al signUp
document
	.querySelectorAll('a[signup]')
	.forEach((el) =>
		el.addEventListener('click', handleSignUpRedirectionFromMain)
	);
// Funcion que maneja el click en los <a> de redireccion
function handleSignUpRedirectionFromMain(e) {
	e.preventDefault();
	const idElement = e.target.id;

	let pathURL = `/html/signup.html`;
	let query = `?mode=${idElement}`;
	// Redireccino a pagna de registro con query
	window.location.href = pathURL + query;
}
