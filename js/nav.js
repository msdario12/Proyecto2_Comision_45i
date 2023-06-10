const nav = document.querySelector('#nav');
const abrir = document.querySelector('#abrir');
const cerrar = document.querySelector('#cerrar');

abrir.addEventListener('click', () => {
	nav.classList.add('visible');
});

cerrar.addEventListener('click', () => {
	nav.classList.remove('visible');
});

// !Handle nav logic
// Obtengo los elementos de login y signup antes de borrarlos
const $signup = document.querySelector('#dropdownSignUp');
const $login = document.querySelector('#dropdownLogin');

function renderNavElements() {
	// Esconder los botones de login y signup si es que ya esta logueado
	function navIfUserIsLogged(user) {
		let classColor = '';
		if (user.type === 'guest') {
			classColor = 'text-bg-info';
		}
		if (user.type === 'host') {
			classColor = 'text-bg-success';
		}
		if (user.type === 'admin') {
			classColor = 'text-bg-warning';
		}
		document.querySelector('#dropdownSignUp').innerHTML = '';
		document.querySelector('#dropdownLogin').innerHTML = '';
		document.querySelector('#dropdownLogin').innerHTML = `
        <div class="d-flex gap-3 align-items-center">
            <div class="d-flex flex-column">
                <p class="my-auto">
                    Hola <b>${user.firstName}</b>!
                </p>
                <div>
                    <span class="badge rounded-pill ${classColor}">
                        ${user.type}
                    </span>
                </div>
            </div>
            <button id="logoutButton" class="btn btn-danger">Logout</button>
        </div>
    `;
	}
	function navIfUserIsNotLogged() {
		document.querySelector('#dropdownSignUp').appendChild($signup);
		document.querySelector('#dropdownLogin').appendChild($login);
	}
	const currentUser = getFromLocalStorage('currentUser');
	if (!currentUser) {
		// El usuario no esta logueado
		navIfUserIsNotLogged();
	} else {
		navIfUserIsLogged(currentUser);
	}

	// Obtengo el boton para el logout
	const $logoutButton = document.querySelector('#logoutButton');
	// Handler del click del boton
	function handleClickLogout(e) {
		deleteFromLocalStorage('currentUser');
		// addToLocalStorage('currentUser', {});
		console.log('Logout del usuario');

		// TODO REDIRECCIONAR
		renderAlertSuccessHome('Saliste de tu cuenta');
		renderNavElements();
	}
	// Controller
	$logoutButton.addEventListener('click', handleClickLogout);
}

renderNavElements();
