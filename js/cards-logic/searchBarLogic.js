// Funcion que maneja el dateInput de checkout inputs, restringiendo las fechas
function handleDateInputs(e) {
	console.log(e);
	let firstValue = '';
	if (e.target.id === 'dateCheckinInput') {
		firstValue = e.target.value;
		document.querySelector('#dateCheckOutInput').min = firstValue;
		document.querySelector('#dateCheckOutInput').value = firstValue;
	}
}

function insertMainSearchBar() {
	console.log('cambia');
	const searchBarHTML = `

				<form class="form-group fw-bolder" id="searchCardsForm">
					<div class="row">
						<div class="col-lg-3 col-md-6">
							<div>
								<label for="searchUbicationInput">Destino</label>
								<input
									class="form-control"
									alt="Destino"
									type="text"
									maxlength="120"
									list="datalistOptions"
									id="searchUbicationInput"
									name="searchUbicationInput"
									placeholder="Ingresa tu destino" />
								<datalist id="datalistOptions">
									<option value="Buenos Aires"></option>
									<option value="Catamarca"></option>
									<option value="Chaco"></option>
									<option value="Chubut"></option>
									<option value="Córdoba"></option>
									<option value="Corrientes"></option>
									<option value="Entre Ríos"></option>
									<option value="Formosa"></option>
									<option value="Jujuy"></option>
									<option value="La Pampa"></option>
									<option value="La Rioja"></option>
									<option value="Mendoza"></option>
									<option value="Misiones"></option>
									<option value="Neuquén"></option>
									<option value="Río Negro"></option>
									<option value="Salta"></option>
									<option value="San Juan"></option>
									<option value="San Luis"></option>
									<option value="Santa Cruz"></option>
									<option value="Santa Fe"></option>
									<option value="Santiago del Estero"></option>
									<option value="Tierra del Fuego"></option>
									<option value="Tucumán"></option>
								</datalist>
							</div>
						</div>
						<div class="col-lg-3 col-md-6">
							<label for="dateCheckinInput">Entrada</label>
							<input
                                search="cards"
								type="date"
								class="form-control"
								id="dateCheckinInput"
								name="dateCheckinInput" />
						</div>
						<div class="col-lg-3 col-md-6">
							<label for="dateCheckOutInput">Salida</label>
							<input
                                search="cards"
								type="date"
								class="form-control"
								id="dateCheckOutInput"
								name="dateCheckOutInput" />
						</div>
						<div class="col-lg-3 col-md-6 mb-3">
							<label for="searchCapacityInput">Huéspedes</label>
							<select class="form-control" id="searchCapacityInput" name="searchCapacityInput">
								<option value="1">1 huésped</option>
								<option value="2">2 huéspedes</option>
								<option value="3">3 huéspedes</option>
								<option value="5">5 huéspedes</option>
								<option value="5">5 huéspedes</option>
								<option value="6">6 huéspedes</option>
								<option value="7">7 huéspedes</option>
								<option value="8">8 huéspedes</option>
								<option value="9">9 huéspedes</option>
								<option value="10">10 huéspedes</option>
								<!-- Agrega más opciones según sea necesario -->
							</select>
						</div>
					</div>
					<div class="row justify-content-center">
						<div
							class="d-grid gap-2 col-md-6 mx-auto"
							id="buscar-reservas">
							<input
								type="submit"
								class="btn btn-outline-primary fs-5 fw-bolder"
								value="Buscar reservas" />
						</div>
					</div>
				</form>
    `;
	const $div = document.createElement('div');
	$div.classList.add('card-body');
	$div.innerHTML = searchBarHTML;
	console.log('bar');
	document.querySelector('#searchBarFromHome').appendChild($div);
}

insertMainSearchBar();
// Selecciono los input tipo date de la pagina para controlarlos
const today = new Date();
let todayFormat = formatDate(today);
document.querySelector('#dateCheckinInput').min = todayFormat;
document.querySelectorAll('input[search]').forEach((input) => {
	input.addEventListener('change', handleDateInputs);
});
