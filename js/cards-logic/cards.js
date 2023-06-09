// Listado de objetos de prueba
rentalHardCodedCards = [
	{
		imageGallery: [
			'https://source.unsplash.com/random/?beach',
			'https://source.unsplash.com/random/?ocean',
		],
		hostEmail: 'host1@gmail.com',
		guestsList: [
			{
				guestEmail: 'guest1@gmail.com',
				guestsQuantity: 4,
				checkInDate: '2023-05-20',
				checkOutDate: '2023-05-25',
			},
		],
		accommodationTitle: 'Cozy Beachfront Villa',
		accommodationLocation: 'Mar del Plata',
		guestCapacity: 4,
		servicesIcons: ['iconOfWater', 'iconOfPool'],
		shortDescription:
			'Experience a relaxing vacation in this cozy beachfront villa in Mar del Plata. Enjoy stunning ocean views and access to a private pool.',
		accommodationPrice: 150,
		rating: 9.2,
		numberOfReviews: randomNumber(1000),
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?mountain',
			'https://source.unsplash.com/random/?cabin',
		],
		hostEmail: 'host2@gmail.com',
		guestsList: [
			{
				guestEmail: 'guest2@gmail.com',
				guestsQuantity: 2,
				checkInDate: '2023-06-20',
				checkOutDate: '2023-06-25',
			},
		],
		accommodationTitle: 'Charming Mountain Cabin',
		accommodationLocation: 'Bariloche',
		guestCapacity: 6,
		servicesIcons: ['iconOfWater', 'iconOfFireplace'],
		shortDescription:
			'Escape to the picturesque mountains of Bariloche and stay in this charming cabin. Enjoy hiking trails, breathtaking views, and a cozy fireplace.',
		accommodationPrice: 120,
		rating: 3.2,
		numberOfReviews: randomNumber(1000),
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?city',
			'https://source.unsplash.com/random/?apartment',
		],
		hostEmail: 'host3@gmail.com',
		guestsList: [
			{
				guestEmail: 'guest3@gmail.com',
				guestsQuantity: 2,
				checkInDate: '2023-07-20',
				checkOutDate: '2023-07-25',
			},
		],
		accommodationTitle: 'Luxurious City Apartment',
		accommodationLocation: 'Buenos Aires',
		guestCapacity: 8,
		servicesIcons: ['iconOfGym', 'iconOfConcierge'],
		shortDescription:
			'Indulge in luxury at this stylish city apartment in the heart of Buenos Aires. Experience world-class amenities, vibrant nightlife, and top-notch restaurants.',
		accommodationPrice: 200,
		rating: 5.2,
		numberOfReviews: randomNumber(1000),
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?countryside',
			'https://source.unsplash.com/random/?cottage',
		],
		hostEmail: 'host1@gmail.com',
		guestsList: [
			{
				guestEmail: 'guest1@gmail.com',
				guestsQuantity: 4,
				checkInDate: '2023-08-20',
				checkOutDate: '2023-08-25',
			},
		],
		accommodationTitle: 'Rustic Countryside Cottage',
		accommodationLocation: 'Córdoba',
		guestCapacity: 4,
		servicesIcons: ['iconOfGarden', 'iconOfBBQ'],
		shortDescription:
			'Get away from the city buzz and unwind in this charming countryside cottage in Córdoba. Enjoy beautiful nature, a private garden, and BBQ facilities.',
		accommodationPrice: 80,
		rating: 2.2,
		numberOfReviews: randomNumber(1000),
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?forest',
			'https://source.unsplash.com/random/?retreat',
		],
		hostEmail: 'host2@gmail.com',
		guestsList: [
			{
				guestEmail: 'guest2@gmail.com',
				guestsQuantity: 4,
				checkInDate: '2023-08-20',
				checkOutDate: '2023-08-25',
			},
		],
		accommodationTitle: 'Secluded Forest Retreat',
		accommodationLocation: 'Mendoza',
		guestCapacity: 6,
		servicesIcons: ['iconOfHiking', 'iconOfWine'],
		shortDescription:
			'Immerse yourself in nature at this secluded forest retreat in Mendoza. Discover hiking trails, vineyards, and breathtaking mountain views.',
		accommodationPrice: 90,
		rating: 7.0,
		numberOfReviews: randomNumber(1000),
	},
	// ... Agrega aquí los otros objetos restantes
];
// ! Agregar a las cards hardcodeadas
// Chequear si todos los objetos tienen un ID, sino asignarles
rentalHardCodedCards.forEach((card) => {
	if (card.hasOwnProperty('id')) {
		return;
	}
	card.id = createRandomID('L');
});
// Agrego los datos al localStorage
let rentalCards = getFromLocalStorage('accommodationDB');
// Veo si existe en el localStorage
if (!rentalCards) {
	rentalCards = addToLocalStorage('accommodationDB', [...rentalHardCodedCards]);
}

// ! Modelo de datos para cards de alojamiento

// Obtengo elementos del DOM
const $section = document.querySelector('#cards');

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

console.log(rentalCards);

// Funcion para renderizar una card
function renderCard(idx, obj) {
	// console.log(obj);
	// Extraigo las keys del objeto de datos
	const {
		imageGallery,
		accommodationTitle,
		accommodationLocation,
		shortDescription,
		accommodationPrice,
		guestCapacity,
		rating,
		numberOfReviews,
		id,
	} = obj;

	// Creo un div en memoria
	const $div = document.createElement('div');
	// Agrego las clases a este elemento padre
	$div.classList.add('card', 'mb-3', 'card-custom');
	// Modifico el interior del html
	$div.innerHTML = `<div class="row g-0">
        <div class="col-md-4 carousel-parent" style="height: 125px">
            ${createCarrusselString(imageGallery, id, accommodationTitle)}
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title">${accommodationTitle}</h5>
                    ${createFavoriteStar(id)}
                </div>
                ${createRating(rating, numberOfReviews)}
                <h6 class="card-subtitle mb-2 text-body-secondary muted"></h6>
                <p class="card-text">
                <p class="card-text">${shortDescription}</p>
                <span class="lead">Desde</span><h4 class="card-text"> $${accommodationPrice}/noche</h4>
				<div class="row">
					<div class="col-6 d-flex align-items-center justify-content-start">
						<i height="16" data-feather="map-pin"></i>
						<span class="small muted">${accommodationLocation}</span>
						<i height="16" data-feather="user"></i>
						<span class="small muted">${guestCapacity} Personas</span>
					</div>
					<div class="col-6 d-flex align-items-center justify-content-end">
						<button publication-id=${id} class="btn btn-outline-success">Reservar ahora</button>
					</div>
				</div>
                </p>
            </div>
        </div>
    </div>`;
	// Añado el elemento al DOM
	$section.appendChild($div);
}

// Funcion para crear un carrusel
function createCarrusselString(imgList, idxCarousel, accommodationTitle) {
	// Init variable
	let carruselItems = '';
	let carouselIndicators = '';
	// Por cada imagen de la lista genero el html
	imgList.forEach((src, idx) => {
		let html, indicator;

		// Creamos el html que mostrara cada imagen y los indicadores
		if (idx === 0) {
			// idx===0 es el primer elemento, le doy la clase "active"
			html = `<div class="carousel-item carousel-custom active" style="max-height: 200px">
            <img src=${src} class="d-block w-100 img-fluid object-fit-cover object-center" alt="Imagen de ${accommodationTitle}">
          </div>`;
			indicator = `<button type="button" data-bs-target="#carousel-num-${idxCarousel}" data-bs-slide-to="${idx}" class="active" aria-current="true" aria-label="Slide ${idx}"></button>`;
		} else {
			// el resto no tiene "active"
			html = `<div class="carousel-item carousel-custom" style="height: 200px">
            <img src=${src} class="d-block w-100 img-fluid object-fit-cover object-center" alt="Imagen de ${accommodationTitle}">
          </div>`;
			indicator = `<button type="button" data-bs-target="#carousel-num-${idxCarousel}" data-bs-slide-to="${idx}" aria-label="Slide ${idx}"></button>`;
		}
		// concateno todos los strings en uno solo
		carouselIndicators += indicator;
		carruselItems += html;
	});
	// defino el string total de todo el carousel
	const string = `
    <div id="carousel-num-${idxCarousel}" class="carousel slide w-100">
        <div class="carousel-indicators">
            ${carouselIndicators}
        </div>
        <div class="carousel-inner">
            ${carruselItems}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-num-${idxCarousel}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-num-${idxCarousel}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>`;
	return string;
}

function createRating(rating, numberOfReviews) {
	let adjetivo;
	if (rating >= 7) adjetivo = 'Bueno';
	if (rating >= 8) adjetivo = 'Muy Bueno';
	if (rating >= 9) adjetivo = 'Excelente';
	return `<h6><span class="badge bg-secondary">${rating}</span> ${
		adjetivo ? adjetivo : ''
	} (${numberOfReviews} Reviews)</h6>`;
}

function createFavoriteStar(idx) {
	// Creamos un icono dentro de span porque sino no me andaba el onclick
	return `<span id-src="star-${idx}" ><i height="24" data-feather="star"></i></span>`;
}

function generateFormForCreateCards() {
	const html = ``;
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
	fileValidateTypeDetectType: (source, type) =>
		new Promise((resolve, reject) => {
			// Do custom type detection here and return with promise

			resolve(type);
		}),
});

// !-----------------------------------Filedrop END

// ?---------------------------form Input

const $formCreateCard = document.querySelector('#createCardForm');

// Manejamos el evento de submit en el form
$formCreateCard.addEventListener('submit', function (e) {
	e.preventDefault(); // Prevenimos el reload
	const el = e.target.elements;
	let srcImg = []; // Para almacenar las URL de las img
	// Vemos si existen archivos
	const fileList = Array.from(el.filepond);

	// ! Falta añadir una imagen tipo placeholder por defecto

	if (fileList.length > 0) {
		// En caso de que sea solo 1 imagen
		if (fileList.length === 0) {
			const src = URL.createObjectURL(el.filepond.files[0]);
			srcImg.push(src);
		} else {
			// Sino, es que tenemos mas de 1
			fileList.forEach((file) => {
				console.log(file);
				const src = URL.createObjectURL(file.files[0]);
				srcImg.push(src);
			});
		}
	}
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

	rentalCards.unshift(newCard);
	// renderCard(newCard);
	renderCardList(rentalCards);
	// filepond.removeFiles()
	// this.reset();
});

// ?---------------------------form Input END
function renderCardList(array) {
	$section.innerHTML = '';
	array.forEach((card, idx) => renderCard(idx, card));
	feather.replace(); // Para inicializar los iconos
	getButtonsBookingNow(); // Añadimos función a botones de reservar
}
renderCardList(rentalCards);
// $section.appendChild(createCarrussel());

// Seleccionar todas las estrellas para darle la funcionalidad de agregar o eliminar estrellas
const starsList = document.querySelectorAll('span[id-src]');

function handleStarClick() {
	// Obtengo el icono que es hijo de <span>
	let $i = this.children[0];
	// Chequeo si el icono ya tiene relleno
	if (this.hasAttribute('fill')) {
		this.removeAttribute('fill'); // Remuevo el att
		$i.innerHTML = `<i height="24" data-feather="star"></i>`; // Reemplazo el icono con su relleno
		feather.replace(); // Re renderizo los iconos
		return;
	}
	// TODO Terminar de agregar logica para agregar la card
	// TODO al objeto currentUser en el localStorage
	// En caso de que no tenga relleno, le aplico
	$i.innerHTML = `<i height="24" fill="yellow" data-feather="star"></i>`;
	this.setAttribute('fill', 'yellow'); // Para poder detectar que tiene relleno

	feather.replace(); // Re renderizo los iconos
}

starsList.forEach((star) => {
	star.addEventListener('click', handleStarClick);
});

// ! Mantener al final del script para renderizar los iconos
feather.replace(); // Para inicializar los iconos
