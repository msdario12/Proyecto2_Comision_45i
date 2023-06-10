// ! Logica del signUp

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

// !Logica para renderizar los signup- ----------------------------------------------
function createSignUp(mode) {
	const paramsGeneral = {
		host: {
			title: 'Regístrate como anfitrión',
		},
		guest: {
			title: 'Regístrate como huésped',
		},
	};
	const params = paramsGeneral[mode];
	const htmlString = `
    <h2>${params.title}</h2>
    <div class="col-6 d-flex flex-column align-content-center gap-2">
						<!-- email -->
						<div class="form-floating mb-3">
							<input
								value="email@gmail.com"
								required
								type="email"
								class="form-control"
								maxlength="64"
								minlength="4"
								name="emailInput"
								id="emailInput"
								placeholder="Ingrese su email" />
							<label for="emailInput">Nombre de usuario</label>
						</div>
						<!-- nombre -->
						<div class="form-floating mb-3">
							<input
								value="nombre test"
								required
								type="text"
								class="form-control"
								maxlength="64"
								minlength="4"
								id="nameInput"
								name="nameInput"
								placeholder="Nombre de usuario" />
							<label for="nameInput">Ingrese su nombre completo</label>
						</div>
						<!-- apellido -->
						<div class="form-floating mb-3">
							<input
								value="nombre test"
								required
								type="text"
								class="form-control"
								maxlength="64"
								minlength="4"
								id="lastNameInput"
								name="lastNameInput"
								placeholder="Nombre de usuario" />
							<label for="lastNameInput">Ingrese su apellido</label>
						</div>
						<!-- contraseña -->
						<div class="form-floating mb-3">
							<input
								value="contrasena"
								required
								type="password"
								class="form-control"
								maxlength="256"
								minlength="8"
								id="passwordInput"
								name="passwordInput"
								placeholder="Ingrese su contraseña" />
							<label for="passwordInput">Ingrese su contraseña</label>
						</div>
						<!-- numero celular (optativo) -->
						<div class="form-floating">
							<input
								value="3813869543"
								type="number"
								class="form-control"
								pattern="[0-9]{10}"
								id="phoneInput"
								name="phoneInput"
								placeholder="Numero de celular" />
							<label for="phoneInput">Numero de celular</label>
						</div>

						<input type="submit" mode=${mode} class="btn btn-primary" value="Registrarme" />
					</div>
    `;
	const $form = document.createElement('form');
	$form.innerHTML = htmlString;
	$form.setAttribute('id', 'newUserRegister');
	$form.classList.add('row');
	return $form;
}
// Funcion encargada de limpiar y renderizar el form del registro
function renderSignUpForm(mode) {
	// Limpio el elemento padre donde renderizar
	document.querySelector('#signupContainer').innerHTML = '';
	// Genero el form
	const $formSignUp = createSignUp(mode);
	// Controlador del fom
	$formSignUp.addEventListener('submit', handleNewUserRegister);
	// Inserto el elemento
	document.querySelector('#signupContainer').appendChild($formSignUp);
	// Logica para manejar signUp
}
// Handler del click para registrar usuario
function handleClickSignUp(e) {
	// Defino si el boton fue de guest o host para el signup
	const mode = e.target.id === 'hostSignUp' ? 'host' : 'guest';

	renderSignUpForm(mode);
}
// Controladores de los botones de registro
document.querySelector('#guestSignUp').onclick = handleClickSignUp;
document.querySelector('#hostSignUp').onclick = handleClickSignUp;

// Carga el signUp en base a la URL al cargar
document.addEventListener('DOMContentLoaded', handleLoadDOMContent);
// Handler para la carga del DOM
function handleLoadDOMContent(e) {
	// Leemos los parametros de la URL
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	const signupMode = urlParams.get('mode');

	if (signupMode === 'signup-guest') {
		renderSignUpForm('guest');
	}
	if (signupMode === 'signup-host') {
		renderSignUpForm('host');
	}

	console.log(signupMode);
}
// !----------------Logica de signUP
// Obtengo en formulario del HTML

// const $formSignUp = document.querySelector('#newUserRegister');

// Manejador de registro de usuarios

function handleNewUserRegister(e) {
	e.preventDefault();
	// Obtengo el atributo que me dice si es signup de host o guess
	const mode = e.submitter.attributes.mode.value;
	// creo el formData para obtener los valores
	const formData = new FormData(e.target);
	const newUser = Object.fromEntries(formData);
	// Añado el tipo de usuario
	newUser.type = mode;
	//? Añado el usuario a la base de datos
	// Vemos si ya existe la bd de users
	let globalUsersBD = getFromLocalStorage('usersBD');
	if (!globalUsersBD) {
		console.log('Creando localsStorage users');
		globalUsersBD = addToLocalStorage('usersBD', {
			hostUsers: [],
			guestsUsers: [],
		});
	}
	// Vemos donde tenemos que añadir este usuario
	let findUser;
	if (mode === 'host') {
		findUser = globalUsersBD.hostUsers.find(
			(user) => user.emailInput === newUser.emailInput
		);
	}
	if (mode === 'guest') {
		findUser = globalUsersBD.guestsUsers.find(
			(user) => user.emailInput === newUser.emailInput
		);
	}
	// Vemos si el usuario ya existe con ese email
	if (findUser) {
		// El email ya existe, no continuar con el registro
		// ! Enviar alerta de error
		renderAlertError(
			'Error en el registro',
			'El correo ingresado ya está registrado.'
		);
		console.log('El email ya existe');
		return;
	}
	// Añado el obj al array de usuarios
	if (mode === 'host') {
		// En caso de ser host, requiere autorizacion de un admin
		newUser.isRegistrationApproved = false;
		globalUsersBD.hostUsers.push(newUser);
	}
	if (mode === 'guest') {
		// No necesita aprobacion de un admin
		newUser.isRegistrationApproved = true;
		globalUsersBD.guestsUsers.push(newUser);
	}
	console.log(globalUsersBD, mode);
	// Añado el la nueva lista al localStorage
	addToLocalStorage('usersBD', globalUsersBD);
	// !Enviar alerta de registro correcto
	renderAlertSuccess('Registro correcto', '');
	console.log('Registro correcto');
}

// Controlador eventos al submit del formSignUp
// $formSignUp.addEventListener('submit', handleNewUserRegister);

// ! Logica del login ----------------------------------------------------------------------------------
function createLogin(mode) {
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
                    <h2>${params.title}</h2>
					<div class="form-floating mb-3">
						<input
							value="email@gmail.com"
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
							value="contrasena"
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
					<input type="submit" mode=${mode} class="btn btn-primary" value="Login" />
    `;
	const $form = document.createElement('form');
	$form.innerHTML = html;
	$form.setAttribute('id', 'userLogin');
	// $form.classList.add('row');
	return $form;
}
// Handler del click para el login
function handleClickLogin(e) {
	// Defino si el boton fue de guest o host para el signup
	const mode = e.target.id === 'hostLogin' ? 'host' : 'guest';
	// Limpio el elemento padre donde renderizar
	document.querySelector('#loginContainer').innerHTML = '';
	// Genero el form
	const $formLogin = createLogin(mode);
	// Controlador del fom
	$formLogin.addEventListener('submit', handleLogin);
	// Inserto el elemento
	document.querySelector('#loginContainer').appendChild($formLogin);
	// Logica para manejar signUp
}
// Controladores de los botones de registro
document.querySelector('#guestLogin').onclick = handleClickLogin;
document.querySelector('#hostLogin').onclick = handleClickLogin;
// Obtengo el form del login

// const $formLogin = document.querySelector('#userLogin');

// Manejador del submit del login
function handleLogin(e) {
	e.preventDefault();
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
		console.log('Error en el login');
		return;
	}
	// vemos si la contraseña coincide con ese email
	if (findUser.passwordInput !== loginUser.passwordLogin) {
		// La contraseña no coincide
		// ! Enviar alerta de error
		console.log('Error en el login');
		// TODO REDIRECCIONAR
		return;
	}
	if (!findUser.isRegistrationApproved) {
		// El usuario no fue aprobado
		console.log('Usuario pendiente de aprobacion');
		// ! alerta de espera de aprobacion
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
	// Añado el tipo de usuario al currentUser
	if (findUser.type === 'admin') {
		loginUser.type = findUser.type;
	} else {
		loginUser.type = mode;
	}
	// Añado al localStorage
	addToLocalStorage('currentUser', loginUser);
	// ! Enviar login correcto
	console.log('Usuario autenticado correctamente');
	// Renderizo la tabla de usuarios si es admin
	if (findUser.type === 'admin') {
		mainTable();
	}
	// TODO REDIRECCIONAR
}

// Controlador del  form de login
// $formLogin.addEventListener('submit', handleLogin);

// ! Logica del logout ----------------------------------------------------------------------------------

// Obtengo el boton para el logout
const $logoutButton = document.querySelector('#logoutButton');
// Handler del click del boton
function handleClickLogout(e) {
	addToLocalStorage('currentUser', {});
	console.log('Logout del usuario');
	// Limpio la tabla de usuarios
	document.querySelector('#usersTableContainer').innerHTML = '';
	document.querySelector('#tableButtons').innerHTML = '';
	// TODO REDIRECCIONAR
}
// Controller
$logoutButton.addEventListener('click', handleClickLogout);
