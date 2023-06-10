// Obtenemos los link que redireccionan al login y signUp
document
	.querySelectorAll('a[redirection]')
	.forEach((el) =>
		el.addEventListener('click', handleSignUpRedirectionFromMain)
	);
// Funcion que maneja el click en los <a> de redireccion
function handleSignUpRedirectionFromMain(e) {
	e.preventDefault();
	console.log(e);
	const idElement = e.target.id;
	const mode = e.target.attributes.login;

	let pathURLSignUp = `/html/signup.html`;
	let pathURLLogin = `/html/login.html`;
	let query = `?mode=${idElement}`;
	if (e.target.attributes.login) {
		console.log('Es login');
		window.location.href = pathURLLogin + query;
	}
	if (e.target.attributes.signup) {
		console.log('Es signup');
		window.location.href = pathURLSignUp + query;
	}
	// Redireccino a pagna de registro con query
}
