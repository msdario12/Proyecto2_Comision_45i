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
addToLocalStorage('accommodationDB', [...rentalHardCodedCards]);

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
// Agrego los datos al localStorage
addToLocalStorage('usersBD', {
	adminUsers: adminUsersHardcoded,
	guestsUsers: guestUsersHardcoded,
	hostUsers: hostUsersHardcoded,
});
