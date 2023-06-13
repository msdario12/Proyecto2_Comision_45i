// !-Lista de publicaciones
// Listado de objetos de prueba
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
// Publicaciones
rentalHardCodedCards = [
	{
		imageGallery: [
			'https://source.unsplash.com/random/?playa',
			'https://source.unsplash.com/random/?vacaciones',
			'https://source.unsplash.com/random/?arena',
			'https://source.unsplash.com/random/?sol',
		],
		hostEmail: 'user1@example.com',
		guestsList: [
			{
				guestEmail: 'user3@gmail.com',
				guestsQuantity: 3,
				checkInDate: '2023-07-01',
				checkOutDate: '2023-07-10',
			},
		],
		accommodationTitle: 'Apartamento Moderno cerca de la Playa',
		accommodationLocation: 'Mar del Plata',
		guestCapacity: 3,
		servicesIcons: ['iconoDePiscina', 'iconoDeGimnasio'],
		shortDescription:
			'Disfruta de una estancia relajante en este moderno apartamento cerca de la playa en Mar del Plata. Disfruta de piscina y gimnasio en las instalaciones.',
		accommodationPrice: 120,
		rating: 9.0,
		numberOfReviews: randomNumber(1000),
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?montaña',
			'https://source.unsplash.com/random/?naturaleza',
			'https://source.unsplash.com/random/?bosque',
			'https://source.unsplash.com/random/?senderismo',
		],
		hostEmail: 'user2@example.com',
		guestsList: [
			{
				guestEmail: 'user4@gmail.com',
				guestsQuantity: 6,
				checkInDate: '2023-08-15',
				checkOutDate: '2023-08-22',
			},
		],
		accommodationTitle: 'Cabaña Rústica en las Montañas',
		accommodationLocation: 'Bariloche',
		guestCapacity: 6,
		servicesIcons: ['iconoDeChimenea', 'iconoDeBarbacoa'],
		shortDescription:
			'Disfruta de la tranquilidad y la belleza natural en esta acogedora cabaña rústica en las montañas de Bariloche. Ideal para escapadas en familia o con amigos.',
		accommodationPrice: 180,
		rating: 8.8,
		numberOfReviews: randomNumber(1000),
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?ciudad',
			'https://source.unsplash.com/random/?urbano',
			'https://source.unsplash.com/random/?moderno',
			'https://source.unsplash.com/random/?edificio',
		],
		hostEmail: 'user6@example.com',
		guestsList: [
			{
				guestEmail: 'user5@gmail.com',
				guestsQuantity: 2,
				checkInDate: '2023-09-05',
				checkOutDate: '2023-09-10',
			},
		],
		accommodationTitle: 'Apartamento de Lujo en el Centro de la Ciudad',
		accommodationLocation: 'Buenos Aires',
		guestCapacity: 2,
		servicesIcons: ['iconoDePiscina', 'iconoDeConcierge'],
		shortDescription:
			'Disfruta de una estancia lujosa en este elegante apartamento en el corazón de la ciudad de Buenos Aires. Acceso a servicios exclusivos y comodidades de primera clase.',
		accommodationPrice: 250,
		rating: 9.5,
		numberOfReviews: randomNumber(1000),
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?playa',
			'https://source.unsplash.com/random/?relax',
			'https://source.unsplash.com/random/?paraiso',
			'https://source.unsplash.com/random/?arena',
		],
		hostEmail: 'user5@example.com',
		guestsList: [
			{
				guestEmail: 'user6@gmail.com',
				guestsQuantity: 4,
				checkInDate: '2023-10-10',
				checkOutDate: '2023-10-17',
			},
		],
		accommodationTitle: 'Villa de Playa Exclusiva',
		accommodationLocation: 'Mar de las Pampas',
		guestCapacity: 4,
		servicesIcons: ['iconoDePlayaPrivada', 'iconoDeSpa'],
		shortDescription:
			'Experimenta unas vacaciones paradisíacas en esta exclusiva villa de playa en Mar de las Pampas. Disfruta de una playa privada y servicios de spa de lujo.',
		accommodationPrice: 350,
		rating: 9.7,
		numberOfReviews: randomNumber(1000),
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?montaña',
			'https://source.unsplash.com/random/?cabaña',
			'https://source.unsplash.com/random/?nieve',
			'https://source.unsplash.com/random/?invierno',
		],
		hostEmail: 'user8@example.com',
		guestsList: [
			{
				guestEmail: 'user7@gmail.com',
				guestsQuantity: 2,
				checkInDate: '2023-11-20',
				checkOutDate: '2023-11-25',
			},
		],
		accommodationTitle: 'Cabaña Acogedora en los Alpes',
		accommodationLocation: 'Villa La Angostura',
		guestCapacity: 2,
		servicesIcons: ['iconoDeChimenea', 'iconoDeBarbacoa'],
		shortDescription:
			'Disfruta de unas vacaciones inolvidables en esta acogedora cabaña en los Alpes argentinos, en Villa La Angostura. Ideal para descansar y disfrutar de la naturaleza.',
		accommodationPrice: 200,
		rating: 9.3,
		numberOfReviews: randomNumber(1000),
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?beach',
			'https://source.unsplash.com/random/?ocean',
		],
		hostEmail: 'user7@example.com',
		guestsList: [
			{
				guestEmail: 'user4@gmail.com',
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
		hostEmail: 'user6@example.com',
		guestsList: [
			{
				guestEmail: 'user2@gmail.com',
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
		hostEmail: 'user1@example.com',
		guestsList: [
			{
				guestEmail: 'user3@gmail.com',
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
		hostEmail: 'user2@example.com',
		guestsList: [
			{
				guestEmail: 'user1@gmail.com',
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
		hostEmail: 'user3@example.com',
		guestsList: [
			{
				guestEmail: 'user2@gmail.com',
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
	{
		imageGallery: [
			'https://source.unsplash.com/random/?playa',
			'https://source.unsplash.com/random/?oceano',
			'https://source.unsplash.com/random/?atardecer',
			'https://source.unsplash.com/random/?vacaciones',
		],
		hostEmail: 'user5@example.com',
		guestsList: [
			{
				guestEmail: 'user1@gmail.com',
				guestsQuantity: 4,
				checkInDate: '2023-05-20',
				checkOutDate: '2023-05-25',
			},
		],
		accommodationTitle: 'Villa Acogedora Frente a la Playa',
		accommodationLocation: 'Mar del Plata',
		guestCapacity: 4,
		servicesIcons: ['iconoDeAgua', 'iconoDePiscina'],
		shortDescription:
			'Disfruta de unas vacaciones relajantes en esta acogedora villa frente a la playa en Mar del Plata. Disfruta de impresionantes vistas al mar y acceso a una piscina privada.',
		accommodationPrice: 150,
		rating: 9.2,
		numberOfReviews: randomNumber(1000),
	},
	{
		imageGallery: [
			'https://source.unsplash.com/random/?montaña',
			'https://source.unsplash.com/random/?cabaña',
			'https://source.unsplash.com/random/?senderismo',
			'https://source.unsplash.com/random/?aventura',
		],
		hostEmail: 'user5@example.com',
		guestsList: [
			{
				guestEmail: 'user2@gmail.com',
				guestsQuantity: 2,
				checkInDate: '2023-06-10',
				checkOutDate: '2023-06-15',
			},
		],
		accommodationTitle: 'Refugio de Montaña en Cabaña',
		accommodationLocation: 'Aspen',
		guestCapacity: 2,
		servicesIcons: ['iconoDeSenderismo', 'iconoDeChimenea'],
		shortDescription:
			'Escápate a este acogedor refugio de montaña en Aspen. Perfecto para entusiastas del senderismo y amantes de la naturaleza.',
		accommodationPrice: 200,
		rating: 8.5,
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
const actualDBcards = getFromLocalStorage('accommodationDB');
if (!actualDBcards) {
	// Agrego los datos al localStorage

	addToLocalStorage('accommodationDB', [...rentalHardCodedCards]);
}

// !-Lista de usuarios
const guestUsersHardcoded = [
	{
		emailInput: 'user1@example.com',
		nameInput: 'John',
		lastNameInput: 'Doe',
		passwordInput: 'password1',
		phoneInput: '+54123456789',
		type: 'guest',
		isRegistrationApproved: true,
		userBookings: [],
	},
	{
		emailInput: 'user2@example.com',
		nameInput: 'Jane',
		lastNameInput: 'Smith',
		passwordInput: 'password2',
		phoneInput: '+54123456790',
		type: 'guest',
		isRegistrationApproved: true,
		userBookings: [],
	},
	{
		emailInput: 'user3@example.com',
		nameInput: 'Robert',
		lastNameInput: 'Johnson',
		passwordInput: 'password3',
		phoneInput: '+54123456791',
		type: 'guest',
		isRegistrationApproved: true,
		userBookings: [],
	},
	{
		emailInput: 'user4@example.com',
		nameInput: 'Emily',
		lastNameInput: 'Williams',
		passwordInput: 'password4',
		phoneInput: '+54123456792',
		type: 'guest',
		isRegistrationApproved: true,
		userBookings: [],
	},
	{
		emailInput: 'user5@example.com',
		nameInput: 'David',
		lastNameInput: 'Brown',
		passwordInput: 'password5',
		phoneInput: '+54123456793',
		type: 'guest',
		isRegistrationApproved: true,
		userBookings: [],
	},
	{
		emailInput: 'user6@example.com',
		nameInput: 'Olivia',
		lastNameInput: 'Taylor',
		passwordInput: 'password6',
		phoneInput: '+54123456794',
		type: 'guest',
		isRegistrationApproved: true,
		userBookings: [],
	},
	{
		emailInput: 'user7@example.com',
		nameInput: 'William',
		lastNameInput: 'Anderson',
		passwordInput: 'password7',
		phoneInput: '+54123456795',
		type: 'guest',
		isRegistrationApproved: true,
		userBookings: [],
	},
	{
		emailInput: 'user8@example.com',
		nameInput: 'Sophia',
		lastNameInput: 'Davis',
		passwordInput: 'password8',
		phoneInput: '+54123456796',
		type: 'guest',
		isRegistrationApproved: true,
		userBookings: [],
	},
	{
		emailInput: 'user9@example.com',
		nameInput: 'James',
		lastNameInput: 'Wilson',
		passwordInput: 'password9',
		phoneInput: '+54123456797',
		type: 'guest',
		isRegistrationApproved: true,
		userBookings: [],
	},
	{
		emailInput: 'user10@example.com',
		nameInput: 'Isabella',
		lastNameInput: 'Clark',
		passwordInput: 'password10',
		phoneInput: '+54123456798',
		type: 'guest',
		isRegistrationApproved: true,
		userBookings: [],
	},
];
const hostUsersHardcoded = [
	{
		emailInput: 'user1@example.com',
		nameInput: 'John',
		lastNameInput: 'Doe',
		passwordInput: 'password1',
		phoneInput: '+54123456789',
		type: 'host',
		isRegistrationApproved: true,
		userListings: [],
		ownerBookings: [],
	},
	{
		emailInput: 'user2@example.com',
		nameInput: 'Jane',
		lastNameInput: 'Smith',
		passwordInput: 'password2',
		phoneInput: '+54123456790',
		type: 'host',
		isRegistrationApproved: false,
		userListings: [],
		ownerBookings: [],
	},
	{
		emailInput: 'user3@example.com',
		nameInput: 'Robert',
		lastNameInput: 'Johnson',
		passwordInput: 'password3',
		phoneInput: '+54123456791',
		type: 'host',
		isRegistrationApproved: true,
		userListings: [],
		ownerBookings: [],
	},
	{
		emailInput: 'user4@example.com',
		nameInput: 'Emily',
		lastNameInput: 'Williams',
		passwordInput: 'password4',
		phoneInput: '+54123456792',
		type: 'host',
		isRegistrationApproved: false,
		userListings: [],
		ownerBookings: [],
	},
	{
		emailInput: 'user5@example.com',
		nameInput: 'David',
		lastNameInput: 'Brown',
		passwordInput: 'password5',
		phoneInput: '+54123456793',
		type: 'host',
		isRegistrationApproved: true,
		userListings: [],
		ownerBookings: [],
	},
	{
		emailInput: 'user6@example.com',
		nameInput: 'Olivia',
		lastNameInput: 'Taylor',
		passwordInput: 'password6',
		phoneInput: '+54123456794',
		type: 'host',
		isRegistrationApproved: false,
		userListings: [],
		ownerBookings: [],
	},
	{
		emailInput: 'user7@example.com',
		nameInput: 'William',
		lastNameInput: 'Anderson',
		passwordInput: 'password7',
		phoneInput: '+54123456795',
		type: 'host',
		isRegistrationApproved: true,
		userListings: [],
		ownerBookings: [],
	},
	{
		emailInput: 'user8@example.com',
		nameInput: 'Sophia',
		lastNameInput: 'Davis',
		passwordInput: 'password8',
		phoneInput: '+54123456796',
		type: 'host',
		isRegistrationApproved: true,
		userListings: [],
		ownerBookings: [],
	},
	{
		emailInput: 'user9@example.com',
		nameInput: 'James',
		lastNameInput: 'Wilson',
		passwordInput: 'password9',
		phoneInput: '+54123456797',
		type: 'host',
		isRegistrationApproved: false,
		userListings: [],
		ownerBookings: [],
	},
	{
		emailInput: 'user10@example.com',
		nameInput: 'Isabella',
		lastNameInput: 'Clark',
		passwordInput: 'password10',
		phoneInput: '+54123456798',
		type: 'host',
		isRegistrationApproved: true,
		userListings: [],
		ownerBookings: [],
	},
];
const adminUsersHardcoded = [
	{
		emailInput: 'dario@admin.com',
		isRegistrationApproved: true,
		lastNameInput: 'Mansilla',
		nameInput: 'Dario',
		passwordInput: 'adminadmin',
		type: 'admin',
	},
	{
		emailInput: 'simon@admin.com',
		isRegistrationApproved: true,
		lastNameInput: 'Simon',
		nameInput: 'Simon',
		passwordInput: 'adminadmin',
		type: 'admin',
	},
	{
		emailInput: 'belen@admin.com',
		isRegistrationApproved: true,
		lastNameInput: 'Herrera',
		nameInput: 'Belen',
		passwordInput: 'adminadmin',
		type: 'admin',
	},
	{
		emailInput: 'nico@admin.com',
		isRegistrationApproved: true,
		lastNameInput: 'Quinteros',
		nameInput: 'Nicolas',
		passwordInput: 'adminadmin',
		type: 'admin',
	},
];

const actualUsersDB = getFromLocalStorage('usersBD');
if (!actualDBcards) {
	// Agrego los datos al localStorage
	addToLocalStorage('usersBD', {
		adminUsers: adminUsersHardcoded,
		guestsUsers: guestUsersHardcoded,
		hostUsers: hostUsersHardcoded,
	});
}
