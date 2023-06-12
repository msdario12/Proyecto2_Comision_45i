// Agrego los datos al localStorage
let rentalCards = getFromLocalStorage('accommodationDB');

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
        <div class="col-md-4 carousel-parent">
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
			html = `<div class="carousel-item carousel-custom active">
            <img src=${src} class="d-block w-100 img-fluid object-fit-cover object-center" alt="Imagen de ${accommodationTitle}">
          </div>`;
			indicator = `<button type="button" data-bs-target="#carousel-num-${idxCarousel}" data-bs-slide-to="${idx}" class="active" aria-current="true" aria-label="Slide ${idx}"></button>`;
		} else {
			// el resto no tiene "active"
			html = `<div class="carousel-item carousel-custom">
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
    <div id="carousel-num-${idxCarousel}" class="carousel slide w-100 h-100">
        <div class="carousel-indicators">
            ${carouselIndicators}
        </div>
        <div class="carousel-inner h-100">
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

// ?---------------------------form Input

// ?---------------------------form Input END
function renderCardList(array) {
	$section.innerHTML = '';
	array.forEach((card, idx) => renderCard(idx, card));
	feather.replace(); // Para inicializar los iconos
	getButtonsBookingNow(); // Añadimos función a botones de reservar
	const starsList = document.querySelectorAll('span[id-src]');
	starsList.forEach((star) => {
		star.addEventListener('click', handleStarClick);
	});
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
