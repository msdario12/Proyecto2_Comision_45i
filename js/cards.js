// Listado de objetos de prueba
const rentalCards = [
	{
		imageGallery: [
			'https://source.unsplash.com/random/?beach',
			'https://source.unsplash.com/random/?ocean',
		],
		accommodationTitle: 'Cozy Beachfront Villa',
		accommodationLocation: 'Mar del Plata',
		servicesIcons: ['iconOfWater', 'iconOfPool'],
		shortDescription:
			'Experience a relaxing vacation in this cozy beachfront villa in Mar del Plata. Enjoy stunning ocean views and access to a private pool.',
		accommodationPrice: '$150/night',
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?mountain',
			'https://source.unsplash.com/random/?cabin',
		],
		accommodationTitle: 'Charming Mountain Cabin',
		accommodationLocation: 'Bariloche',
		servicesIcons: ['iconOfWater', 'iconOfFireplace'],
		shortDescription:
			'Escape to the picturesque mountains of Bariloche and stay in this charming cabin. Enjoy hiking trails, breathtaking views, and a cozy fireplace.',
		accommodationPrice: '$120/night',
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?city',
			'https://source.unsplash.com/random/?apartment',
		],
		accommodationTitle: 'Luxurious City Apartment',
		accommodationLocation: 'Buenos Aires',
		servicesIcons: ['iconOfGym', 'iconOfConcierge'],
		shortDescription:
			'Indulge in luxury at this stylish city apartment in the heart of Buenos Aires. Experience world-class amenities, vibrant nightlife, and top-notch restaurants.',
		accommodationPrice: '$200/night',
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?countryside',
			'https://source.unsplash.com/random/?cottage',
		],
		accommodationTitle: 'Rustic Countryside Cottage',
		accommodationLocation: 'Córdoba',
		servicesIcons: ['iconOfGarden', 'iconOfBBQ'],
		shortDescription:
			'Get away from the city buzz and unwind in this charming countryside cottage in Córdoba. Enjoy beautiful nature, a private garden, and BBQ facilities.',
		accommodationPrice: '$80/night',
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?forest',
			'https://source.unsplash.com/random/?retreat',
		],
		accommodationTitle: 'Secluded Forest Retreat',
		accommodationLocation: 'Mendoza',
		servicesIcons: ['iconOfHiking', 'iconOfWine'],
		shortDescription:
			'Immerse yourself in nature at this secluded forest retreat in Mendoza. Discover hiking trails, vineyards, and breathtaking mountain views.',
		accommodationPrice: '$90/night',
	},
	// ... Agrega aquí los otros objetos restantes
];
// TODO Ajustar la alturas de todas la imagenes de los carrussel para que sea la misma
// ! Modelo de datos para cards de alojamiento
const exampleCard = {
	imageGallery: ['urlImg1', 'urlImg2'],
	accommodationTitle: 'Title of Accommodation',
	shortDescription: 'Short description, possibly in HTML',
	accommodationLocation: 'Location of Accommodation',
	accommodationPrice: `$51,245`,
	maxPeople: 4,
	sizeM2: '20m2',
};

// Obtengo elementos del DOM
const $section = document.querySelector('#cards');

// Funcion para renderizar una card
function renderCard(idx, obj) {
	// Extraigo las keys del objeto de datos
	const {
		imageGallery,
		accommodationTitle,
		accommodationLocation,
		shortDescription,
		accommodationPrice,
	} = obj;
	// Creo un div en memoria
	const $div = document.createElement('div');
	// Agrego las clases a este elemento padre
	$div.classList.add('card', 'mb-3', 'card-custom');
	// Modifico el interior del html
	$div.innerHTML = `<div class="row g-0">
        <div class="col-md-4" style="height: 125px">
            ${createCarrusselString(imageGallery, idx, accommodationTitle)}
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${accommodationTitle}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary muted"></h6>
                <p class="card-text">
                <p class="card-text">${shortDescription}</p>
                <h4 class="card-text">${accommodationPrice}</h4>
                    <i height="16" data-feather="map-pin"></i>
                    <span class="small muted">${accommodationLocation}</span>
                    <i height="16" data-feather="user"></i>
                    <span class="small muted">2 Personas</span>
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

// renderCard();
// renderCard();
// renderCard();

rentalCards.forEach((card, idx) => renderCard(idx, card));

// $section.appendChild(createCarrussel());
// ! Mantener al final del script para renderizar los iconos
feather.replace(); // Para inicializar los iconos
