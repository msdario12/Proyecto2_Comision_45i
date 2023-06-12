const nav = document.querySelector('#nav');
const abrir = document.querySelector('#abrir');
const cerrar = document.querySelector('#cerrar');

abrir.addEventListener('click', () => {
	nav.classList.add('visible');
});

cerrar.addEventListener('click', () => {
	nav.classList.remove('visible');
});

// !Handle nav logic ----------------------
// Obtengo los elementos de login y signup antes de borrarlos
const $signup = document.querySelector('#dropdownSignUp');
const $login = document.querySelector('#dropdownLogin');

function renderNavElements() {
	// Esconder los botones de login y signup si es que ya esta logueado
	function navIfUserIsLogged(user) {
		let classColor = '';
		let button = '';
		// Color en funcion del tipo de usuario logueado
		if (user.type === 'guest') {
			classColor = 'text-bg-info';
			button =
				'<li><a personal-table id="#myBookings" class="dropdown-item" href="#">Mis reservas</a></li>';
		}
		if (user.type === 'host') {
			classColor = 'text-bg-success';
			button =
				'<li><a personal-table id="#myPublications" class="dropdown-item" href="#">Mis publicaciones</a></li>';
		}
		if (user.type === 'admin') {
			classColor = 'text-bg-warning';
			// Le doy display flex al boton de tabla de usuarios
			document.querySelector('li[users-table]').classList.toggle('d-none');
		}
		document.querySelector('#dropdownSignUp').innerHTML = '';
		// document.querySelector('#dropdownSignUp').style.display = 'none';
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

            <div class="dropdown">
				<button class="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Mi cuenta
				</button>
				<ul class="dropdown-menu">
					${button}
					<li><a id="logoutButton" class="dropdown-item" href="#">Logout</a></li>
				</ul>
			</div>

        </div>

		
    `;
	}
	// Si no esta logueado volver a cargar los botones de login y signUp
	function navIfUserIsNotLogged() {
		document.querySelector('#dropdownSignUp').appendChild($signup);
		document.querySelector('#dropdownLogin').appendChild($login);
	}
	// Obtengo el currentUser del localStorage
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

	// Controllers
	// Logout
	$logoutButton.addEventListener('click', handleClickLogout);
}

renderNavElements();
