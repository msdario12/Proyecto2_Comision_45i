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
	if (!currentUser) {
		// Redireccionar al signUp de anfitriones
		renderAlertInfoSignUpHost('Necesita una cuenta de anfitrión para publicar');
		return;
	}

	const $formCreateCard = document.querySelector('#createCardForm');

	// Manejamos el evento de submit en el form
	$formCreateCard.addEventListener('submit', function (e) {
		e.preventDefault(); // Prevenimos el reload
		const el = e.target.elements;
		let srcImg = []; // Para almacenar las URL de las img
		// Vemos si existen archivos
		const fileList = Array.from(e.target.elements.filepond);
		console.log(e);

		// ! Falta añadir una imagen tipo placeholder por defecto
		if (fileList.length > 0) {
			// En caso de que sea solo 1 imagen
			if (fileList.length === 0) {
				const src = URL.createObjectURL(el.filepond.files[0]);
				srcImg.push(src);
			} else {
				// Sino, es que tenemos mas de 1
				fileList.forEach((input) => {
					console.log(input);
					const src = URL.createObjectURL(input.files[0]);
					srcImg.push(src);
				});
			}
		}
		// if (e.target.elements.filepond.files[0]) {
		// 	const src = URL.createObjectURL(e.target.elements.filepond.files[0]);
		// 	srcImg.push(src);
		// }
		// Crear array con los servicios que se marcaron como true
		let servicesList = [];
		// Revisamos cada input, y por los que son checkbox, vemos si tienen true
		[...el].forEach((el) => {
			if (el.type === 'checkbox' && el.checked) {
				servicesList.push(el.id);
			}
		});

		console.log(servicesList);

		const newCard = {
			id: createRandomID('L'),
			imageGallery: srcImg,
			accommodationTitle: el.titleInput.value,
			accommodationLocation: el.locationInput.value,
			guestCapacity: el.capacityInput.value,
			servicesIcons: servicesList,
			shortDescription: el.descriptionTextArea.value,
			accommodationPrice: priceInput.valueAsNumber,
			rating: randomNumber(10),
			numberOfReviews: randomNumber(1000),
		};

		// Añadimos la nueva card al localStorage
		const rentalCards = getFromLocalStorage('accommodationDB');
		addToLocalStorage('accommodationDB', [newCard, ...rentalCards]);
		// Alert de creacion completa y redireccinado

		// renderAlertWithRedirection(
		// 	'Publicación creada correctamente',
		// 	'Sera redirigido al listado de publicaciones en',
		// 	'success',
		// 	2500,
		// 	'/html/cards.html'
		// );

		// Reiniciar campos
		// filepond.removeFiles()
		// this.reset();
	});
}

// Render form para nuevas cards
createFormNewCard();
