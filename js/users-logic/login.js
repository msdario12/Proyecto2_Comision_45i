// Crear el form del login
function createLogin(mode, urlToRedirect) {
	const paramsGeneral = {
		host: {
			title: 'Autenticarse como anfitrión',
		},
		guest: {
			title: 'Autenticarse como huésped',
		},
	};
	const params = paramsGeneral[mode];
	const html = `
    <!-- email -->
                    <h2 class="mb-4 align-self-center">${params.title}</h2>
					<div style="justify-self: center">
						<div class="form-floating mb-3">
							<input
								
								required
								type="email"
								class="form-control"
								maxlength="64"
								minlength="4"
								name="emailLogin"
								id="emailLogin"
								placeholder="Ingrese su email" />
							<label for="emailLogin">Email</label>
						</div>
						<!-- contraseña -->
						<div class="form-floating mb-3">
							<input
								
								required
								type="password"
								class="form-control"
								maxlength="256"
								minlength="8"
								id="passwordLogin"
								name="passwordLogin"
								placeholder="Ingrese su contraseña" />
							<label for="passwordLogin">Ingrese su contraseña</label>
						</div>
						<div class="text-center">
							<input type="submit" mode=${mode} class="btn btn-primary py-2 px-4" value="Login" />
						</div>
					</div>
    `;
	const $form = document.createElement('form');
	$form.setAttribute('id', 'userLogin');
	$form.classList.add(
		'd-flex',
		'flex-column',
		'h-100',
		'justify-content-center'
	);
	$form.innerHTML = html;
	return $form;
}
// Funcion para renderizar el form del login
function renderLoginForm(mode, urlToRedirect = false) {
	console.log(urlToRedirect);
	// Limpio el elemento padre donde renderizar
	document.querySelector('#loginContainer').innerHTML = '';
	// Genero el form
	const $formLogin = createLogin(mode);
	// Controlador del fom
	$formLogin.addEventListener('submit', (e) => handleLogin(e, urlToRedirect));
	// Inserto el elemento
	document.querySelector('#loginContainer').appendChild($formLogin);
}
// Handler del click para el login
// function handleClickLogin(e) {
// 	// Defino si el boton fue de guest o host para el signup
// 	const mode = e.target.id === 'hostLogin' ? 'host' : 'guest';
// 	renderLoginForm(mode);
// }
// // Controladores de los botones de registro
// document.querySelector('#guestLogin').onclick = handleClickLogin;
// document.querySelector('#hostLogin').onclick = handleClickLogin;

// Manejador del submit del login
function handleLogin(e, urlToRedirect) {
	e.preventDefault();
	console.log(urlToRedirect);
	// Obtengo el atributo que me dice si es signup de host o guess
	const mode = e.submitter.attributes.mode.value;
	// creo el formData para obtener los valores
	const formData = new FormData(e.target);
	const loginUser = Object.fromEntries(formData);
	// Chequeamos si el email existe
	let globalUsersBD = getFromLocalStorage('usersBD');
	// Vemos donde tenemos que añadir este usuario
	let findUser;
	// Chequeamos si el email es de un admin
	function checkAdminUser() {
		let user = globalUsersBD.adminUsers.find(
			(user) => user.emailInput === loginUser.emailLogin
		);
		return user;
	}

	if (mode === 'host') {
		findUser = globalUsersBD.hostUsers.find(
			(user) => user.emailInput === loginUser.emailLogin
		);
	}
	if (mode === 'guest') {
		findUser = globalUsersBD.guestsUsers.find(
			(user) => user.emailInput === loginUser.emailLogin
		);
	}
	// Vemos si es un admin
	if (!findUser) {
		findUser = checkAdminUser();
	}
	// Ahora si no lo encontramos en ninguna de las bd, entonces retornamos
	if (!findUser) {
		// El email no existe
		// ! Enviar alerta de error
		renderAlertError('Error en el login', 'Revise los datos ingresados');
		console.log('Error en el login');
		return;
	}
	// vemos si la contraseña coincide con ese email
	if (findUser.passwordInput !== loginUser.passwordLogin) {
		// La contraseña no coincide
		// ! Enviar alerta de error
		renderAlertError('Error en el login', 'Revise los datos ingresados');
		console.log('Error en el login');
		// TODO REDIRECCIONAR
		return;
	}
	if (!findUser.isRegistrationApproved) {
		// El usuario no fue aprobado
		console.log('Usuario pendiente de aprobacion');
		// ! alerta de espera de aprobacion
		renderInfoAlert(
			'Usuario pendiente de aprobacion',
			'Por favor, espere que un administrador valide sus datos para poder acceder'
		);
		// TODO redireccionar
		return;
	}
	// Usuario autenticado
	// ? vemos si existe currentUser en ls
	let currentUser = getFromLocalStorage('currentUser');
	if (!currentUser) {
		currentUser = addToLocalStorage('currentUser', []);
	}
	// Establecemos a este usuario como currentUser sin el password
	// Remuevo password
	delete loginUser.passwordLogin;
	// Añado el primer nombre
	loginUser.firstName = findUser.nameInput;
	// Añado el tipo de usuario al currentUser
	if (findUser.type === 'admin') {
		loginUser.type = findUser.type;
	} else {
		loginUser.type = mode;
	}
	// Añado al localStorage
	addToLocalStorage('currentUser', loginUser);
	// ! Enviar login correcto
	if (urlToRedirect) {
		renderAlertWithRedirection(
			'Autenticación correcta',
			'Seras redirigido en',
			'success',
			1500,
			urlToRedirect
		);
		return;
	}
	renderAlertSuccessHome('Autenticación correcta');
	// renderAlertSuccess('Autenticación correcta', '');
	console.log('Usuario autenticado correctamente');
	// TODO REDIRECCIONAR
}

// !Renderizar al cargar la pagina
// Carga el login en base a la URL al cargar
document.addEventListener('DOMContentLoaded', handleLoginLoadDOMContent);
// Handler para la carga del DOM
function handleLoginLoadDOMContent(e) {
	// Leemos los parametros de la URL
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	const signupMode = urlParams.get('mode');

	if (signupMode === 'login-guest') {
		if (urlParams.has('continueToCards')) {
			renderLoginForm('guest', '/html/cards.html');
			return;
		}
		renderLoginForm('guest');
	}
	if (signupMode === 'login-host') {
		renderLoginForm('host');
	}

	console.log(signupMode);
}
