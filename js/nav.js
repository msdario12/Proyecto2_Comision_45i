// !- Creamos y renderizamos el nav
// Creamos los elementos del head
const $linkIconsBootstrap = document.createElement('link');
$linkIconsBootstrap.setAttribute(
	'href',
	'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css'
);
$linkIconsBootstrap.setAttribute('rel', 'stylesheet');
const $linkCssNav = document.createElement('link');
$linkCssNav.setAttribute('rel', 'stylesheet');
$linkCssNav.setAttribute('href', '/css/nav.css');
// Añadimos los link al head
document.head.appendChild($linkIconsBootstrap);
document.head.appendChild($linkCssNav);
const $header = document.createElement('header');
$header.setAttribute('id', 'mainHeader');
// ? Aca esta todo el html del nav
$header.innerHTML = `
<div id="logo"><a class="navbar-brand" href="/html/index.html"><img id="logo"  src="/assets/logo.png" alt="" style="width: 50px;">descansAR</a></div>
			<button id="abrir" class="abrir-menu"><i class="bi bi-list"></i></button>
			<nav class="nav" id="nav">
				<button id="cerrar" class="cerrar-menu">
					<i class="bi bi-x-lg"></i>
				</button>
				<ul class="nav-list">
					<li class="d-flex align-items-center"><a href="/html/index.html">Home</a></li>
					<li class="d-flex align-items-center"><a href="/html/about.html">About</a></li>
					<li class="d-flex align-items-center"><a href="/html/contacto1.html">Contacto</a></li>
					<li class="d-flex align-items-center">
						<a href="/html/create-publication.html">Publicar</a>
					</li>
					<li users-table=true class="d-none align-items-center">
						<a href="/html/users-table.html">Tabla de Usuarios</a>
					</li>
					<li class="d-flex align-items-center" id="dropdownSignUp">
						<div class="dropdown">
							<button
								class="btn btn-primary dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								Registrarme
							</button>
							<ul class="dropdown-menu">
								<li>
									<a
										id="signup-guest"
										class="dropdown-item"
										redirection
										signup
										href="#"
										>Como huésped</a
									>
								</li>
								<li>
									<a
										id="signup-host"
										redirection
										signup
										class="dropdown-item"
										href="#"
										>Como anfitrión</a
									>
								</li>
							</ul>
						</div>
					</li>
					<li class="d-flex align-items-center" id="dropdownLogin">
						<div class="dropdown">
							<button
								class="btn btn-secondary dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								Login
							</button>
							<ul class="dropdown-menu">
								<li>
									<a
										id="login-guest"
										redirection
										login
										class="dropdown-item"
										href="#"
										>Como huésped</a
									>
								</li>
								<li>
									<a
										id="login-host"
										redirection
										login
										class="dropdown-item"
										href="#"
										>Como anfitrión</a
									>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</nav>
`;
document.querySelector('#headerBefore').before($header);

// --------------
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
			button = `<li><a personal-table id="#myPublications" class="dropdown-item" href="#">Mis publicaciones</a></li>
				<li><a personal-table id="#myRentals" class="dropdown-item" href="#">Mis alquileres</a></li>`;
		}
		if (user.type === 'admin') {
			classColor = 'text-bg-warning';
			// Le doy display flex al boton de tabla de usuarios
			document.querySelector('li[users-table]').classList.toggle('d-flex');
		}
		document.querySelector('#dropdownSignUp').innerHTML = '';
		// document.querySelector('#dropdownSignUp').style.display = 'none';
		document.querySelector('#dropdownLogin').innerHTML = '';
		document.querySelector('#dropdownLogin').innerHTML = `
        <div class="d-flex gap-3 align-items-center flex-column flex-md-row">
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

            <div class="dropdown" data-bs-theme="dark">
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
