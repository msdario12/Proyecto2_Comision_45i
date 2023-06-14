// Para campo de busqueda de ubicaciónes, utilizo Typeahead:
$(document).ready(function () {
	var locations = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		// Aquí puedes agregar tus ubicaciones recomendadas
		local: ['Ciudad A', 'Ciudad B', 'Ciudad C', 'Ciudad D'],
	});

	$('#searchbox').typeahead(
		{
			hint: true,
			highlight: true,
			minLength: 1,
		},
		{
			name: 'locations',
			source: locations,
		}
	);
});
