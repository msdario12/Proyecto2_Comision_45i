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
    <h2 class="mb-4 text-center">${params.title}</h2>
    <div style="justify-self: center">
		<div class="d-flex flex-column align-content-center gap-2">
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
				<div class="form-floating mb-3">
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
		
				<div class="text-center">
					<input type="submit" mode=${mode} class="btn btn-primary py-2 px-4" value="Registrarme" />
				</div>
			</div>
	</div>
    `;
	const $form = document.createElement('form');
	$form.setAttribute('id', 'newUserRegister');
	$form.classList.add(
		'd-flex',
		'flex-column',
		'h-100',
		'justify-content-center'
	);
	$form.innerHTML = htmlString;

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
// // Handler del click para registrar usuario
// function handleClickSignUp(e) {
// 	// Defino si el boton fue de guest o host para el signup
// 	const mode = e.target.id === 'hostSignUp' ? 'host' : 'guest';

// 	renderSignUpForm(mode);
// }
// // Controladores de los botones de registro
// document.querySelector('#guestSignUp').onclick = handleClickSignUp;
// document.querySelector('#hostSignUp').onclick = handleClickSignUp;

// ! Carga el signUp en base a la URL al cargar
document.addEventListener('DOMContentLoaded', handleSignUpLoadDOMContent);
// ! Handler para la carga del DOM
function handleSignUpLoadDOMContent(e) {
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
		// Creamos la propiedad que tiene el array de publicaciones realizadas
		newUser.userListings = [];
		// Lista que va a almacenar la lista de reservas a este usuario
		newUser.ownerBookings = [];
		// Agregamos el usuario a la lista
		globalUsersBD.hostUsers.push(newUser);

		renderAlertWithRedirection(
			'Registro correcto!',
			'Por favor espera a que un administrador apruebe tu cuenta, seras redirigido en',
			'info',
			2000,
			'/html/index.html'
		);
	}
	if (mode === 'guest') {
		// No necesita aprobacion de un admin
		newUser.isRegistrationApproved = true;
		// Array que contiene la lista de reservas del usuario
		newUser.userBookings = [];
		globalUsersBD.guestsUsers.push(newUser);

		renderAlertWithRedirection(
			'Registro correcto!',
			'Bienvenido!, ahora puedes reservar en nuestro sitio!. Seras redirigido en',
			'success',
			2000,
			'/html/index.html'
		);
	}
	console.log(globalUsersBD, mode);
	// Añado el la nueva lista al localStorage
	addToLocalStorage('usersBD', globalUsersBD);
	// !Enviar alerta de registro correcto

	console.log('Registro correcto');
}

// Controlador eventos al submit del formSignUp
// $formSignUp.addEventListener('submit', handleNewUserRegister);
