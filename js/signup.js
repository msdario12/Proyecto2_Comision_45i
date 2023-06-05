// ! Logica del signUp

// Funcion para agregar elemento al localStorage
function addToLocalStorage(name, el) {
	const jsonElement = JSON.stringify(el);
	const saveElement = localStorage.setItem(name, jsonElement);
	return saveElement;
}
// Funcion para obtener elementos del localStorage
function getFromLocalStorage(name) {
	const objElement = JSON.parse(localStorage.getItem(name));
	return objElement;
}
// Funcion para eliminar elementos del localStorage
function deleteFromLocalStorage(name) {
	localStorage.removeItem(name);
}

// Obtengo en formulario del HTML

const $formSignUp = document.querySelector('#newUserRegister');

// Manejador de registro de usuarios

function handleNewUserRegister(e) {
	e.preventDefault();
	const formData = new FormData(e.target);
	const newUser = Object.fromEntries(formData);
	//? Añado el usuario a la base de datos
	// Vemos si ya existe la bd de users
	let usersBD = getFromLocalStorage('usersBD');
	if (!usersBD) {
		usersBD = addToLocalStorage('usersBD', []);
	}
	// Vemos si el usuario ya existe con ese email
	const findUser = usersBD.find(
		(user) => user.emailInput === newUser.emailInput
	);
	if (findUser) {
		// El email ya existe, no continuar con el registro
		// ! Enviar alerta de error
		console.log('El email ya existe');
		return;
	}
	// Añado el obj al array de usuarios
	usersBD.push(newUser);
	// Añado el la nueva lista al localStorage
	addToLocalStorage('usersBD', usersBD);
	// !Enviar alerta de registro correcto
	console.log('Registro correcto');
}

// Controlador eventos al submit del formSignUp
$formSignUp.addEventListener('submit', handleNewUserRegister);

// ! Logica del login
// Obtengo el form del login

const $formLogin = document.querySelector('#userLogin');

// Manejador del submit del login
function handleLogin(e) {
	e.preventDefault();
	const formData = new FormData(e.target);
	const loginUser = Object.fromEntries(formData);
	// Chequeamos si el email existe
	let usersBD = getFromLocalStorage('usersBD');
	// Vemos si el usuario ya existe con ese email
	const findUser = usersBD.find(
		(user) => user.emailInput === loginUser.emailLogin
	);
	if (!findUser) {
		// El email no existe
		// ! Enviar alerta de error
		console.log('Error en el login');
		return;
	}
	console.log(loginUser, findUser);
	// vemos si la contraseña coincide con ese email
	if (findUser.passwordInput !== loginUser.passwordLogin) {
		// La contraseña no coincide
		// ! Enviar alerta de error
		console.log('Error en el login');
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
	addToLocalStorage('currentUser', loginUser);
	// ! Enviar login correcto
	console.log('Usuario autenticado correctamente');
}

// Controlador del  form de login
$formLogin.addEventListener('submit', handleLogin);
