// Funciones para generar un ID
// Generate random number
function randomNumber(max) {
	return Math.floor(Math.random() * max);
}
// Generar una vocal aleatoria
function randomVowel() {
	const vowels = ['a', 'e', 'i', 'o', 'u'];
	return vowels[randomNumber(vowels.length)];
}

// Generar un ID random para cada publicacion
function createRandomID(prefix) {
	const num1 = String(randomNumber(9999)).padEnd(4, '0');
	const num2 = String(randomNumber(9999)).padEnd(4, '0');
	const vowel = randomVowel().toUpperCase();
	return String(prefix).toUpperCase() + num1 + vowel + num2;
}

// Leemos los parametros de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// !-----------------------------------Filedrop
// Register the plugin
FilePond.registerPlugin(FilePondPluginImagePreview);
FilePond.registerPlugin(FilePondPluginFileValidateType);
// Get a reference to the file input element
const inputElement = document.querySelector('input[type="file"]');

// Create a FilePond instance
const filepond = FilePond.create(inputElement, {
	labelIdle:
		'Arrastra las imágenes aquí o  <span class="filepond--label-action"> Selecciónalas desde tu computadora</span>',
	storeAsFile: true,
	allowMultiple: true,
	acceptedFileTypes: ['image/png', 'image/jpeg'],
	maxFiles: 5,
});

// !-----------------------------------Filedrop END

function createFormNewCard() {
	// Chequeamos si el usuario esta registrado
	const currentUser = getFromLocalStorage('currentUser');
	if (!currentUser || currentUser.type !== 'host') {
		// Redireccionar al signUp de anfitriones
		renderAlertInfoSignUpHost('Necesita una cuenta de anfitrión para publicar');
		return;
	}

	const $formCreateCard = document.querySelector('#createCardForm');
	// Hacemos que el input de precio tenga siempre 2 decimales
	document.querySelector('input#priceInput').addEventListener('change', (e) => {
		e.target.value = parseFloat(e.target.value).toFixed(2);
	});
	// Manejamos el evento de submit en el form
	$formCreateCard.addEventListener('submit', async function (e) {
		e.preventDefault(); // Prevenimos el reload
		const el = e.target.elements;
		let srcImg = []; // Para almacenar las URL de las img
		// Vemos si existen archivos
		const fileList = Array.from(e.target.elements.filepond);
		// Función que devuelve una promesa cuando se termina de leer el archivo
		const readFile = (file) => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();

				reader.onload = function (event) {
					const base64Image = event.target.result;
					resolve(base64Image);
				};

				reader.onerror = function (event) {
					reject(event.target.error);
				};

				reader.readAsDataURL(file);
			});
		};
		if (fileList) {
			// Array donde vamos a poner todas las promesas
			let promises = [];
			// ! Falta añadir una imagen tipo placeholder por defecto
			// Caso de que sea una sola imagen
			if (fileList.length === 0) {
				console.log('Tenemos 1 imagen');
				promises.push(readFile(el.filepond.files[0]));
			}
			// Caso con multiples imagenes
			if (fileList.length > 0) {
				console.log('Tenemos mas de 1 imagen');
				// Tenemos mas de 1 imagen
				fileList.forEach((input) => {
					// Ponemos en el array una promesa por cada archivo que se esta leyendo
					promises.push(readFile(input.files[0]));
				});
			}

			try {
				// Esperamos la resolución de todas las promesas
				srcImg = await Promise.all(promises);
			} catch (error) {
				// Caso en que no se cargaron imagenes
				console.log('No se cagaron imagenes');
				// Cargar imagen por defecto tipo placeholder
				srcImg.push('https://placehold.co/400x400?text=Publicacion+sin+imagen');
			}
		}

		console.log(srcImg);
		// Crear array con los servicios que se marcaron como true
		let servicesList = [];
		// Revisamos cada input, y por los que son checkbox, vemos si tienen true
		[...el].forEach((el) => {
			if (el.type === 'checkbox' && el.checked) {
				servicesList.push(el.id);
			}
		});

		console.log(servicesList);
		// Creo el id de la publicacion
		const actualDate = new Date().toString();
		const idCard = createRandomID('L');
		// Añado el email del host y creo el array de las reservaciones
		const priceFormat = parseFloat(priceInput.value);
		const newCard = {
			id: idCard,
			imageGallery: srcImg,
			hostEmail: currentUser.emailLogin,
			guestsList: [],
			accommodationTitle: el.titleInput.value,
			accommodationLocation: el.locationInput.value,
			guestCapacity: el.capacityInput.value,
			servicesIcons: servicesList,
			shortDescription: el.descriptionTextArea.value,
			accommodationPrice: priceFormat,
			rating: randomNumber(10),
			numberOfReviews: randomNumber(1000),
		};

		const rentalCards = getFromLocalStorage('accommodationDB');

		// Añadimos la publicación a la lista de publicaciones del usuario
		// Obtenemos la lista de usuarios
		const globalUsersBD = getFromLocalStorage('usersBD');
		const userIndex = globalUsersBD.hostUsers.findIndex(
			(user) => user.emailInput === currentUser.emailLogin
		);
		if (!globalUsersBD.hostUsers[userIndex].userListings) {
			globalUsersBD.hostUsers[userIndex].userListings = [];
		}
		globalUsersBD.hostUsers[userIndex].userListings.push({
			publicationId: idCard,
			dateOfCreation: actualDate,
			accommodationTitle: el.titleInput.value,
			accommodationLocation: el.locationInput.value,
			guestCapacity: el.capacityInput.value,
			servicesIcons: servicesList,
			shortDescription: el.descriptionTextArea.value,
			accommodationPrice: priceInput.valueAsNumber,
		});
		console.log(globalUsersBD);

		// !Si estamos en modo edicion, eliminamos la card del localStorage
		if (urlParams.has('edit')) {
			// Eliminamos del listado de publicaciones
			const publicationId = urlParams.get('id');
			// const rentalCards = getFromLocalStorage('accommodationDB');
			const findCardIndex = rentalCards.findIndex(
				(card) => card.id === publicationId
			);
			rentalCards.splice(findCardIndex, 1);
			addToLocalStorage('accommodationDB', rentalCards);
			// Eliminamos del listado del usuario host
			// Buscamos la publicacion en el array de publicaciones del usuario
			const cardResIndex = globalUsersBD.hostUsers[
				userIndex
			].userListings.findIndex((card) => card.publicationId === publicationId);
			// Eliminamos ese registro
			globalUsersBD.hostUsers[userIndex].userListings.splice(cardResIndex, 1);
		}

		// ! Escritura en el localStorage
		addToLocalStorage('accommodationDB', [newCard, ...rentalCards]);
		addToLocalStorage('usersBD', globalUsersBD);

		// Mensaje de confirmacion en caso de completar edicion
		if (urlParams.has('edit')) {
			renderAlertWithRedirection(
				'Publicación editada correctamente',
				'Continua editando tus publicaciones, seras redirigido en',
				'success',
				2000,
				'/html/personal-table.html?type=#myPublications'
			);
			return;
		}
		// Alert de creación completa y redireccinado
		renderAlertWithRedirection(
			'Publicación creada correctamente',
			'Sera redirigido al listado de publicaciones en',
			'success',
			2000,
			'/html/cards.html'
		);

		// Reiniciar campos
		// filepond.removeFiles()
		// this.reset();
	});
}

// Render form para nuevas cards
createFormNewCard();

//! Funcion para poder usar el mismo formulario para editar una publicacion

if (urlParams.has('edit')) {
	console.log('Si tiene rey');
	// entonces el form va a funcionar para editar la card en vez de crear una nueva
	const publicationId = urlParams.get('id');
	const cardsList = getFromLocalStorage('accommodationDB');
	const findCard = cardsList.find((card) => card.id === publicationId);
	const {
		accommodationPrice: price,
		accommodationLocation: location,
		accommodationTitle: title,
		guestCapacity: capacity,
		imageGallery: gallery,
		shortDescription: description,
	} = findCard;
	// Establecemos los valores de los inputs
	const $form = document.querySelector('#createCardForm');
	console.log($form.elements);
	const el = $form.elements;
	// Cambiamos el texto del boton de submit

	// Seteamos los valores
	el.priceInput.value = price;
	el.locationInput.value = location;
	el.titleInput.value = title;
	el.capacityInput.value = capacity;
	el.descriptionTextArea.value = description;
	// Galeria de imagenes
	// Cambiamos el mensaje del boton de submit
	el.submitButton.value = 'Modificar publicación';
	// Cambiamos el titulo de la pagina
	document.querySelector('#pageTitleNewCard').textContent =
		'Editar una publicación';
	filepond.setOptions({
		labelIdle:
			'<span class="filepond--label-action">Añade</span>, arrastra o elimina las imagenes de tu publicación',
	});
	// Por cada imagen de la galeria, la cargamos en el visualizador
	gallery.forEach((img) => filepond.addFile(img));
}
